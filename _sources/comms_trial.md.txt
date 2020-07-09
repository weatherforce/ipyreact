# Comms Cookbook 

In this section, we will see how to open a bidirectionnal communication between Python code and a notebook extension using Jupyter's *Comms*.
The main steps will be to open a Comms from jupyter notebook, connect with an nb_extension and have a bidirectionnal communication from notebook to front end.
This documentation should be seen as a complement to Jupyter's Notebook documentation on [Comms](https://jupyter-notebook.readthedocs.io/en/stable/comms.html). So make
sure to read this documentation, and most specifically the section talking about opening communication from the kernel,
which means that the front end should be ready to receive a connection demand.

## JavaScript side

Let's make a simple nb_extension as seen in [nbextension cookbook](nbextension_trial.md). 
This extension will register a comm and define a callback function that will get executed when it receives messages. This function will log the message and send a message containing the string *banana*.

```javascript
define([
    'base/js/namespace'
], function(
    Jupyter
) {
    function load_extension() {
      Jupyter.notebook.events.on("kernel_ready.Kernel", function() {
        Jupyter.notebook.kernel.comm_manager.register_target(
          "my_comm_target",
          function (comm, msg) {
            comm.on_msg(function(msg){
              console.log("Received from Python:", msg.content.data)
              comm.send("banana")
            })
          }
        )
      })
    }

    return {
        load_ipython_extension: load_extension,
    };
});
```

To test this, you have to create the comm_extension, and then install it, the same way as we did here [nbextension cookbook](nbextension_trial.md).

## Python side

Here is Python code that will connect to the comm target created by the JavaScript code above.

```python
from ipykernel.comm import Comm

my_comm = Comm(target_name="my_comm_target")
items = ["apple", "orange"]

@my_comm.on_msg
def _recv(msg):
    # Receive message from JavaScript and append it to items
    data = msg["content"]["data"]
    items.append(data)
```

Quite simple isn't it? The only part that might be tricky to understand is the
`@my_comm.on_msg` decorator. It aims to provide developers a way of defining a
callback function, which will be called every time `my_comm` receives a
message.

## Test 

To test this, create a notebook, copy the python code into a cell, and run it. Now you should be able to send a message to JavaScript with a cell like this:

```python
my_comm.send("Please send me more fruit!")
```

You should see a message logged in the JavaScript console showing that your
message has been received by the frontend.  Now if you evaluate the `items`
variable in a new cell, you should see that it contains *banana*, which was
sent from JavaScript and then received and appended to the list by the `_recv`
function.

> Notes: you will see that here the python side is used as it is, it is not a
> server_extension as I initially thought, which is a good thing, because it
> will be much easier to package and use.

## What's happening? 

Well, you have to consider this piece of code as two code bases working
together.  You have a front end part that loads when notebook starts, and waits
for an incoming connection, on a comm_channel called `my_comm_target`.  The
incoming connection can come from either a server_extension, or in this case,
directly from a notebook cell. The code in this cell creates `my_comm`, a Comm
instance that connects to `my_comm_target` and sends data through it. At the
same time, it define a callback function that is triggered everytime `my_comm`
receives messages.

This is how you can create a bridge between your python code, and a visual
effect of it, which is written in javascript.

And this is what is happening under the hood for ipywidgets. It is nothing more
than that. The really impressive improvement though on ipywidgets is the way
communication is handled, the fact that their is an MVC framework in place with
Backbone.js on the front end. The way they handle the print and the embeding is
also very interesting. The limitation comes from the fact that to embed other
libraries such as React, that brings a lot to the table, we'd have to embed it
within Backbone.js and loose a lot of the React library capabilities.

To use React, it is really important to investigate on how to reproduce this
AMD syntax with ES6 and Webpack to be able to use React or whatever other
framework to create widgets.  More on that matter in the next cookbook , keep
reading ! 
