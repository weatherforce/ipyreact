# Notebook Extension 

This document aims to provide a recipe on how to do a Notebook extension from the start. Its second purpose would be to give the reader details on what is exactly a notebook extension, and how he/she should manipulate them. 

## Basic install

In a dedicated folder, create a virtual environment and activate it. Then, install Jupyter Notebook.

```bash
mkdir <dedicated-folder>
cd <dedicated-folder>
python3 -m venv venv
source venv/bin/activate
pip install notebook
```

Once it is done, you can create the extension, like this:

```bash
mkdir <extension-name>
cd <extension-name> 
touch extension/main.js
```

Here you  are setup to create your very first notebook extension, congrats.

## What is a notebook extension and what is it used for?

You can consider a notebook extension as a javascript module that will be loaded in notebooks, and or in manager screen. The idea is to provide notebook users a way to customize a bit their notebooks by extending them with some custom features, on the front end. The JavaScript module format used is AMD (Asynchronous Module Definition) modules specification provided by RequireJS library. So, if you want to use ES6 or JSX or any new kind of JavaScript, it needs to be transpiled targeting the AMD module format. Keep that in mind if you want to use newer frameworks such as React, View or Angular.

>Note: The Jupyter development team also provides what they called server extensions, which is a very cool way to extend the notebook server backend, such as connecting to web hooks, or provide a small API to other tools that would have the capability of connecting to this API.

## Diving in 

You should have a look at [notebook extension documentation](https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html "jupyter notebook documentation").

It will provide very useful information so it is recommended to read that. Yet, I'll try to show you how you can quickly set up your notebook extension:

### main.js

Start by copying this into `extension/main.js`:

```javascript
define([
    'base/js/namespace'
], function(
    Jupyter
) {
    function load_ipython_extension() {
        console.log(
            'This is the current notebook application instance:',
            Jupyter.notebook
        );
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
```
Let's analyse it a bit. On the very first line, you have the `define` keyword that allows to define an AMD module. The documentation says that at the very least, your AMD module should expose a load_ipython_extension function to be loaded and interact with Jupyter. It is not completely true, since you can expose an empty function like this:

```javascript
...
return {
	load_ipython_extension : function (){};
}
...
``` 
Your module would be loaded, and your code executed even though it is not within this special function. But keep in mind that **it has to be an AMD module**.

This piece of code imports 'base/js/namespace' which gets bound to the
`Jupyter` object. It then allows you to interact with Jupyter directly, using
that exposed `Jupyter` object.  

You can use it to add or remove buttons, extend notebook behaviours such as
auto_completion, create a button acting as a link to another service and, most
importantly for us, create the front end side of widgets!  

That looks good, but how do we install it? Well, you just had to ask:

To install it in a normal way, just hit:  

```bash
jupyter nbextension install extension/ --sys-prefix
jupyter nbextension enable extension/main --sys-prefix
```

> Note: When developing an extension, you can use the --symlink flag to avoid having to type the commands above every time you update your code. 

Then start Jupyter Notebook:

```bash
jupyter notebook
```

Create a new notebook and you should see in your browser console the message coming
from your extension (`This is the current notebook application instance...`).

## Troubleshooting

Sometimes, when messing with jupyter nbextension, you can corrupt some configuration files, it will then throw you an error right in your face, saying something about a json error on a file.
When you executing `jupyter nbextension enable` it modifies a json configuration file and can make it invalid. But the trick is that you can have several configuration files, normally in `venv/etc/Jupyter/nbconfig/notebook.json`. Sometimes you will have more than one file, and they are not always easy to find. After some research, I found [this issue](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/issues/1211), which gives us a code snippet that validates all Jupyter configuration files.

When I had an issue, that code snippet returned:

    Failed JSON file is: /home/USER/.jupyter/nbconfig/notebook.json
    File /home/USER/weatherforce/Projects/nbextension_tryhard/venv/etc/jupyter/nbconfig/notebook.json is OK.

So the first one was broken, it had a comma that wasn't supposed to be there. Fixing it manually fixed the issue.

