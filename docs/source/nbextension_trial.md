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

## Documentation 

Then, [you shoud follow this link](https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html "jupyter notebook documentation")

it basically ask you to create a javascript file called main.js into an extension folder, so [here is the file](extension/main.js)
See ? quite simple hu? 
Now, If you continue on the documentation you will find an installation part, which mention two commands that are: 

	jupyter nbextension install extension/ --sys-prefix
	jupyter nbextension enable extension/main --sys-prefix

In the doc it is said that sys-prefix flag will make the install on the current virtualenv.

So Once you have done that, you will receive a validation ok message. you should then test it:

	jupyter notebook example.ipynb

It will open jupyter [example notebook](example.ipynb)  unfortunatly, you won't see "this is my first extension" in the console log info...

We get a strange error though, about a jsonerror on a file. So, after looking on the web if someone had the same issue, I [found out that post](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/issues/1211)

which gave me a small [snippet](snippet.py) looking for all config files for jupyter

	python snippet.py

returned to me:

Failed JSON file is: /home/tomtom/.jupyter/nbconfig/notebook.json
File /home/tomtom/weatherforce/Projects/nbextension_tryhard/venv/etc/jupyter/nbconfig/notebook.json is OK.

So apparently the first one is a broken one, so let's fix it.

Fixing it made the code work... wow. so basically, to have a basic nbextension working, following the doc is ok.
