# Create a custom widget

If you are not satisfied with the current available widgets you have two options to build a custom widget.
the first one, is building a widget externally using the [provided-cookiecutter](https://gitlab.com/weatherforce-platform/cookiecutter-ipyreact-widget)
The following section will provide a cookbook on how to use the cookiecutter.

## Use the Cookiecutter

### First step: Create an empty repository
 would be to create an empty repository on gitlab, or github. Find the big button offering to create a new project and click on it.
>Note: Do not provide any Readme or license stuff right now, we want an empty repo, and its url.


### Second step: cookiecutter readme

go on [cookiecutter-ipyreact-widget](https://gitlab.com/weatherforce-platform/cookiecutter-ipyreact-widget) repository page.
According to readme :

```bash
pip install cookiecutter
cookiecutter cookiecutter git@gitlab.com:weatherforce-platform/cookiecutter-ipyreact-widget.git
```
And start filling the provided form.
> Note: fill asked url with the repository url.

### finish project initialisation 

Enter your widget folder, and turn it into a repository.  

```bash
cd widget_name
git init
git remote add origin <repo-url>
git add .
git commit -m "First commit"
git push
```
You can then provide a venv and install all the required dependencies.

```bash
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```
Finally, you will need to access your code from a notebook. To do so we need to install it. To avoid the hustle of re-install it every time you make a change on your code base do :
```bash
pip install -e .
```
then go on js side, install and transpile it on dev mode and go back to parent folder:

```bash
cd js
yarn install 
yarn dev
cd ..
```

Final step: install js side on dev mode as well using Jupyter part from Readme:

```bash
jupyter nbextension install --py --symlink --sys-prefix ... 
jupyter nbextension enable --py --sys-prefix ...
```

There you go ! the interesting parts begin just now !

### Coding is on!

An IpyReactWidget is a compound of a python Widget's child class, and a notebook extension (which is a javascript piece of code, interacting with jupyter) using React library.
To have a communication between those two, Jupyter provide the comm package, which is a communication bridge between front end to back end. Here below a schema to ease comprehension.

"...I have to put the schema here..."

Fortunatly, you don't really have to handle the communication part, the Widgets classes on both side are meant to save you the time and trouble. Instead, you can directly focus on 
creating your widget. To do so you will need to have a good knowledge of React in addition of Javascript and Python.

To create a Widget , my advice would be to start directly with front end, creating all necessary parts, with hard coded state and props, and once it is up and running, you can then start to 
pass state and props from python side.

let's dive in! 

#### Development environment

Now that everything is set up, we need a way to quickly test what we are developping. to do so, you have to open at least three terminals, one for launching a notebook where you will import
your widget, aka the TESTME.ipynb, one to launch webpack watch server, and finaly one to develop.

```bash
#first terminal
jupyter notebook TESTME.ipynb

#second terminal
cd js
yarn watch

#third terminal
cd js/src
vim widget.js
```
then try to edit widget.js, save it, and just hit the F5 (refresh) button focused on your web browser. You will see your changes directly on screen. 

Sadly, for python side changes, you will need to stop and relaunch jupyter notebook server. 

## Develop a widget directly into ipyreactwidgets  

This is the second way of doing a widget, that could be complementary to the first one. The only issue with this option is that your widget should be accepted as a relevant widget for everyone to be accepted into the ipyreactwidget repository.
