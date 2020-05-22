# Comms Cookbook 

In this section, we will see how to open a bidirectionnal communication between python code and a notebook extension using Jupyter's Ipykernel.Comms package.
So the main steps will be to open a Comms from jupyter notebook, to connect with a nb_extension and have a bidirectionnal communication from notebook to front end.
This documentation should be seen as a complement to Jupyter's Notebook documentation on [Comms](https://jupyter-notebook.readthedocs.io/en/stable/comms.html). So make
sure to read this documentation, and most specifically the section talking about opening communication from the kernel,
which mean that front end should be ready to receive a connection demand.


## comm_module.py

Let's create a simple python module that we could load on a notebook, that would open a comm, listen to it and resend whatever it receives.

```python
from ipykernel.comm import Comm


my_comm = Comm(target_name="my_comm_target", data={'foo': 1})

@my_comm.on_msg
def _recv(msg):
    my_comm.send(msg)
``` 

Quite simple isn't it? So the only part that might be tricky to understand is the @my_comm.on_msg decorator. It aims to provide developers a way of 
defining a callback function, which will be called every time a my_comm receives messages. 

## comm_extension

Let's make a simple nb_extension as seen in [nbextension cookbook](nbextension_trial.md). 
Nothing fancy, a simple copy past from documentation, just added console.log everywhere to have feedbacks on what is going on under the hood. 

```javascript
define([
    'base/js/namespace'
], function(
    Jupyter
) {
	    function load_extension() {
        console.log(
            'This is the comm manager:',
            Jupyter.notebook
        );
		Jupyter.notebook.kernel.comm_manager.register_target("my_comm_target", 
			function (comm, msg){
				comm.on_msg(function(msg){console.log(msg)})
				comm.on_close(function(msg){console.log(msg)})
				comm.send({'foo': 0})
			})
		console.log("here is the comm manager after register_target",
			Jupyter.notebook.kernel.comm_manager)
    }

    return {
        load_ipython_extension: load_extension,
    };
});
```

## Test 

To test this, you have to create the comm_extension, and then install it, the same way as we did here [nbextension cookbook](nbextension_trial.md).

You then have to create a notebook, copy the python side into a cell, and run it.

>Notes: you will see that here the python module is used as it is, it is not a server_extension as I primarly though, which is a good thing,
because it will be much easier to package and use.

## What's happening? 

Well, you have to consider this piece of code as two code base working together. 
You have a front end part that loads when notebook starts, and wait for an incoming connection, on a comm_channel called 'my_comm_target'.
The incoming connection can come from either a server_extension, or in this case, directly from notebook code. This is where comm_module is called.
It creates my_comms, which is a Comm instance, that connect to "my_comm_target", and send data through it. At the same time, it define a callback function
that is triggered everytime my_comm receive messages.

This is how you can create a bridge between your python code, and a visual effect of it, which is written in javascript.

And this is what is happening under the hood for ipywidgets. It is nothing more than that. The really impressive improvement though on ipywidgets is the way
communication is handled, the fact that their is an MVC framework putted in place with BackBone.js on the front end. The way they handle the print and the
embeding is also very interesting. The limitation com from the fact that to embed other librairy such as React, that brings a lot to the table, implies to embed it
over backbone.js, and make us loose a lot of the React librairy capabilities.

To embed React, it is really important to investigate on how to reproduce this AMD syntax with ES6 and Webpack to be able to use React or whatever other framework to create widgets.
More on that matter in the next cookbook , keep reading ! 
 
  
