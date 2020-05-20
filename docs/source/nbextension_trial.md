# Notebook Extension 

This document aim to provide a recipe on how to do a Notebook extension from the start. It's second purpose would be to give the reader details on what is exactly a notebook extension, and how he/she should manipulate them. 

## Basic install

In a dedicated folder, create a virtual environment and activate it.Then, install jupyter notebook

```bash
mkdir <dedicated-folder>
cd <dedicated-folder>
python3 -m virtualenv venv
source venv/bin/activate
pip install notebook
```

Once it is done, you can create the extension, like this:

```bash
mkdir <extension-name>
cd <extension-name> 
touch main.js
```

Here you  are setup to create your very first notebook extension, congrats.

## What is a notebook extension and what is it used for?

You can consider a notebook extension as a javascript module that will be loaded in notebooks, and or in manager screen. The idea is to provide notebook users a way to customize a bit their notebooks by extending them with some custom features, on the front end. The javascript module format used is AMD (Asynchronous Module Definition) modules specification provided by RequireJs library. So, if you want to use ES6 or JSX or any new kind of Javascript, it needs to be transpiled targeting the AMD module format. Keep that in mind if you want to use newer framework, such as React, View or Angular.

>Note: Jupyter developer team also provide what they called server extensions, which is a very cool way to extend notebook server backend, such as connect to webhooks, or provide a small API to another tools that would have the capability of connecting to this API.

## Diving in 

You should have a look at [notebook extension documentation](https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html "jupyter notebook documentation").

It will provide very useful informations so it is recommended to read that. Yet, I'll try to show you how you can quickly set up your notebook extension:

### main.js

start by copy pasting this into `extension/main.js`:

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
Let's analyse it a bit. At very first line, you have the `define` keyword that allows to ~~create~~ define an AMD module. It is say in documentation that at the very least, your AMD module should expose a load_ipython_extension function to be loaded and interact with Jupyter. It is not completly true, since you can expose an empty function like this:

```javascript
...
return {
	load_ipython_extension : function (){};
}
...
``` 
Your module would be loaded, and your code executed even though it is not within this special function. But it keep in mind that **it has to be an AMD module**.
from second line to load_ipython_extension definition : this is where the magic happen ! what this piece of code is importing 'base/js/namespace' ('which by the way, contains Jupyter') dynamically which means directly from Jupyter environment. It then allows you to interact with Jupyter directly, using the Jupyter exposed object.  

With that kind of stuff, you can then add buttons, or delete somes, extend notebook behaviour, such as auto_completion, create a button as link to another service annnnd, most important for us, create front end part for widgets!  

Ok ok that sounds good, but how do we install it? well you just had to ask my friend:

to install it in a normal way, just hit:  
```bash
jupyter nbextension install extension/ --sys-prefix
jupyter nbextension enable extension/main --sys-prefix
```

> Note: If you have to develop it, then you should consider adding --symlink flag, it will allow you not to redo the above commands every time you update your code. 


> Note again: In the doc it is said that sys-prefix flag will make the install on the current virtualenv, use --user instead if you want to install it into your main environment.

So before doing that, make sure your notebook extension does something, like saying hello in the console. You then install and will receive a validation ok message. Then test it like this:

```bash
jupyter notebook
```

using the manager, create a new notebook and you will see that your notebook extension is loaded !  


## TroubleShooting

Sometimes, when messing with jupyter nbextension, you can corrupt some configuration files, it will then throw you an error right in your face, saying something about a jsonerror on a file.
When you hit `jupyter nbextension enable` it goes into a json config file, and mess with it. But the trick is that you can have several config files, normally in `venv/etc/Jupyter/nbconfig/notebook.json`.Sometimes you will have more than one file, and they are not always easy to find. So, after looking on the web if someone had the same issue, I [found out that post](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/issues/1211)

which give us a small snippet.py looking for all config files for jupyter
```bash
python snippet.py
```

In my case, when I had an issue, it returned to me:

Failed JSON file is: /home/USER/.jupyter/nbconfig/notebook.json
File /home/USER/weatherforce/Projects/nbextension_tryhard/venv/etc/jupyter/nbconfig/notebook.json is OK.

So the first one was broken, it had a coma that wasn't supposed to be there. fixing it manually fixed the issue.

