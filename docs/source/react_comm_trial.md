# Jupyter + python + React using Comm 

This is the most exciting step of our journey to master widget building process for Jupyter Notebook.
In this cookbook you will find a way to open a communication between a python piece of code on your Notebook to a nbextension based on React.
At the end, we will have a base project to create a widget on Jupyter using React, and Python. From that package, we should be able to create a first version of a boilerplate, 
easing the development of a new kind of ipywidget, based on React.

## Set Up 

first things first, what should we implement? Personnally, I would love to bring to Jupyter Environment the nice and good looking [AppBar](https://material-ui.com/components/app-bar/#simple-app-bar) from Material UI.  So, naturally, our project will be called Appbar.

```bash
mkdir appbar
cd appbar
```
### Python Module part

This is probably the most simple part: 

```bash
mkdir appbarpy
cd appbarpy
touch __init__.py main.py
mkdir static
```
### JS part

As usual, lets create a basic setup for javascript:

```bash
cd ..
mkdir appbarjs
cd appbarjs
yarn init 
touch index.js
```

From there, we should follow the instruction from [react_nbextension_trial](react_nbextension_trial.md), and replace the names and paths accordingly to our configuration.

>Note:Have in mind that the final goal is to put the webpack output files into the static folder of appbarpy, so consider dist folder is appbarpy/static.

at the end of this section, your project's structure should look like the following:

```bash
tree -I node_modules appbar/
appbar/
├── appbarjs
│   ├── package.json
│   ├── src
│   │   ├── App.js
│   │   └── index.js
│   ├── webpack.config.js
│   └── yarn.lock
└── appbarpy
    ├── __init__.py
    ├── main.py
    └── static
        └── main.js
```

## Nbextension install from Python

Hehe, so here begin our new journey to a React Comm implementation. If you already have used [ipywidgets](https://ipywidgets.readthedocs.io/en/stable/) at least once,
you might have noticed that to install a nbextension, you just have to run a setup.py file and enable it ! Whoaw mind blowing right? 

Let's try to do the same here, cause it's quiet convenient. starting at the beginning, we should first read the documentation provided :  [jupyter notebook documenation](https://jupyter-notebook.readthedocs.io/en/stable/examples/Notebook/Distributing%20Jupyter%20Extensions%20as%20Python%20Packages.html#Distributing-Jupyter-Extensions-as-Python-Packages)

After reading it, you would have realize that what we want to accomplish here is described [here](https://jupyter-notebook.readthedocs.io/en/stable/examples/Notebook/Distributing%20Jupyter%20Extensions%20as%20Python%20Packages.html#Example---Server-extension-and-nbextension). 

More precisely, in our python package __init__.py file:

```python
...
# Jupyter Extension points
def _jupyter_nbextension_paths():
    return [dict(
        section="notebook",
        # the path is relative to the `my_fancy_module` directory
        src="static",
        # directory in the `nbextension/` namespace
        dest="my_fancy_module",
        # _also_ in the `nbextension/` namespace
        require="my_fancy_module/index")]
...
```

So let's transform that to our needs, and write in the `appbarpy/__init__.py`:

```python

def _jupyter_nbextension_paths():
    return [
        {
            "section": "notebook",
            "src": "static",
            "dest": "appbar",
            "require": "appbar/main"
        }
    ]
```

According to documentation, we can now install this nbextension from the python module using:

```bash
jupyter nbextension install appbarpy --py --sys-prefix
jupyter nbextension enable appbarpy --py --sys-prefix
```

Let's try it out right now, and see what happen:

```bash
jupyter nbextension install appbarpy --py --sys-prefix
...
ModuleNotFoundError: No module named 'appbarpy'
``` 

well that's a simple one, we need python to be able to find our package. we have two options here: 

- **option 1**: quick and dirty
we add path to appbarpy into PYTHONPATH, not very suistanable to on the long terme, but easy to do, quick to try out

- **option 2**: the setup.py file, allowing us to use pip install -e nice one don't you think? 

Option 2 is the best long terme speaking, so long terme, we will go with this.
But short terme we will setup the pythonpath and try it out directly to debug our current modification.

### Option 1

```bash
echo $PWD
.../appbar

export PYTHONPATH=$PYTHONPATH:$PWD

jupyter nbextension install appbarpy --py --sys-prefix
...
jupyter nbextension enable appbarpy --py --sys-prefix
...
Enabling notebook extension appbar/main...
      - Validating: OK
```
yay ! it worked, well at least it installed the nbextension.

let's try it out into a notebook

```bash
	jupyter notebook
```
and then you create a notebook from the manager.

Tadddaaaa it worked ! wouhou

![alt text](react_comm_1.png "Proof by screenshot :P")

### Option 2

Option 1 was a handcraft, it's was justified for  quick testing, but you might find a bit tiring to set PYTHONPATH all the time. 
A solution would be to package it, using setuptool. It is obviously not an obligation to make it work, but it will come with some benefits which are: publishing it if you want, and ease its sharing with other people, include some script to ease install... 

#### setup.py

if you haven't package a python package python before, i recommend to read the [official doc](https://packaging.python.org/tutorials/packaging-projects/) on that matter.  

here below the content of  my setup.py:
```python
import setuptools


with open("README.md", 'r') as fh:
    long_description = fh.read()

setuptools.setup(
    name="appbar",
    version="0.0.1",
    author="Thomas Pouvreau",
    author_email="thomas.pouvreau@weatherforce.org",
    description="a small example widget developped with React",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
```
In order for it work, I also added a small readme. right now there is pretty much nothing, but at somepoint it will be useful. 
Also, I added a MIT License as it is mentionned in doc.

what we want to do here is to leverage pip capabilities to make sure that when we install our package with pip install, it also install the nbextension so at the end, to install our project we just have to do:

```bash
pip install appbar
``` 
As we would with a custom widget from ipywidgets template.

On [jupyter notebook documentation](https://jupyter-notebook.readthedocs.io/en/stable/examples/Notebook/Distributing%20Jupyter%20Extensions%20as%20Python%20Packages.html) they are giving us an example on how you would do such a thing. 
According to this documentation, we need a appbar.json into appbar folder, containing this:

```javascript
{
	"load_extensions": {
		"appbar/main": true
	}
}
```

It is said to add to your setup few new arguments, which are include_package_data, data_files, zip_safe, here you will have our new setup.py:

```python
import setuptools


with open("README.md", 'r') as fh:
    long_description = fh.read()

setuptools.setup(
    name="appbar",
    version="0.0.1",
    author="Thomas Pouvreau",
    author_email="thomas.pouvreau@weatherforce.org",
    description="a small example widget developped with React",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="",
    include_package_data=True,
    data_files=[
        # like jupyter nbextension install --sys-prefix
        ("share/jupyter/nbextensions/appbar", ["appbarpy/static/main.js"]),
        # like jupyter nbextension enable --sys-prefix
        ("etc/jupyter/nbconfig/notebook.d", ["appbar.json"])
    ],
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)

```

in addition, we need to create a MANIFEST.in file:

```
recursive-include appbar.json
recursive-include appbarpy/static *.js
```

for now we can test if it install normally with :

```bash
pip install .
jupyter nbextension list
```

> first, make sure you have uninstall the nbextension and disable it: use jupyter nbextension disable then jupyter nbextension uninstall
Normally here you will see that appbar/main is in the nbextension list, aaaand, if you try it in the notebook, your extension will still be there. 
Yay!

## Entering the Fun part

Okay, so far we succeeded in creating a basic notebook extension, loading it from our python package and we also managed to automate the install process. 
What we need to do now is to initiate a communication with our Python package, receive it on the front end side and react accordingly.

### Starting a communication from Kernel 

Let's do as we did before, which is create a communication channel from kernel.
for now, just add this in a your notebook. `communication` will be the object
acting as a *socket*, which will allow you to communicate with the front end.
For now we will stick with it and later we will put it in a more sophisticated
object. 

```python
from ipykernel.comm import Comm

communication = Comm(target_name="appbar_comm",
                     data={"title": "this is the title"})


@communication.on_msg
def received(msg):
    print(msg)
```

### Receiving a communication within our front end objects

Okay so now is the tricky part: from [jupyter notebook documentation](https://jupyter-notebook.readthedocs.io/en/stable/comms.html#opening-a-comm-from-the-kernel) on how to open a comm from the kernel, we can see that we have to register a target using Jupyter object imported dynamically. For our component to be able to work with it, we have several solutions:
- one would be to put everything coming from the kernel into a Context, and then pass this context to the rest of the component subcomponent. 
- another one would be to use React composition pattern, and pass received data to children through props. 
- a third one would be to use a redux store, and it would be then very similar to how ipywidgets work. (store would took the model place)

This is a fundamental question on how we would like to build our future library: knowing that there are several ways to achieve the absolute same result, but with different levels of complexity, which one should we choose? Should we even choose one? Do we need to let developers access all these different ways of achieving it? If so why? And why not? 
 
In this very example we will use the second option, for simplicity, but we keep in mind that there is at the very least, two other options to achieve it, and most likely several more.

So, for simplicity, we will create a comm and data object and pass it as props to App component. 

In `appbar/appbarjs/src/index.js`:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
let promise = import('base/js/namespace')


export const load_ipython_extension = () => {
    promise.then( Jupyter => {
        Jupyter.notebook.kernel.comm_manager.register_target('appbar_comm', function(comm, msg){
            ReactDOM.render(<App comm={comm} data={msg.content.data}/>, document.getElementById('notebook-container'))
        })
    })
}
```

and then, in `appbar/appbarjs/src/App.js`:

```javascript
import React from 'react'

const App = (props) => {
	return <h1> Hello, {props.data.title}! </h1>
}

export default App
```

we just need to rebuild in dev mode, and re install the nbextension.

```bash
cd appbar/appbarjs/
yarn dev
cd ..
pip uninstall appbar
pip install .
jupyter notebook test.ipynb
```
We see absolutly nothing... but, we need to instantiate from kernel remember? and, we are supposed to render once the connection is open, so let's open a connection ! lets use the python snippet we defined earlier to create a comm from kernel, and put it in the first cell of test.ipynb.
We launch it and bouyah! it's working !!!

But... we just destroyed the notebook... maybe, it is time to think about how to target the cell output instead of destroying the whole notebook don't you think? 

Well I knew you would agree, moving on !

### Cell output

Well well, in [this wonderful project](https://github.com/timbr-io/jupyter-react-js/blob/master/src/output.js), we have a beginning of answer on how we could possibly do such a thing [index.js](https://github.com/timbr-io/jupyter-react-js/blob/master/src/index.js), and it is referred right here: 

```javascript 
...
 const msg_id = msg.parent_header.msg_id;
 const cell = Jupyter.notebook.get_msg_cell( msg_id );
...
```

then we have a bunch of functions to clear the cell output, to set it etc... on ipywidgets project, you will find something much more complex but very similar in the idea, so for now, we will stick to the most simple solution and see its limitation. 
but first, let's print this cell, and see if we can render the react just after :)

So for it, I just printed the cell, and realized that there was an output_area inside. So I've sligthly changed index.js to that:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
let promise = import('base/js/namespace')


export const load_ipython_extension = () => {

   promise.then( Jupyter => {
      
      Jupyter.notebook.kernel.comm_manager.register_target('appbar_comm', function(comm, msg) {

         const msg_id = msg.parent_header.msg_id
         const cell = Jupyter.notebook.get_msg_cell(msg_id);
         if(cell.output_area.selector[0]) {
            const output = cell.output_area.selector[0].getElementsByClassName('output')[0]
            ReactDOM.render(<App comm={comm} data={msg.content.data}/>, output)
         }
      })
   })
}

 ```

If you recompile, build and run the notebook again, you will see text get inserted right under the cell.

## Bi-directional communication

So far, we managed to :
- create a nbextension using JSX and React
- instantiate it from kernel leveraging Jupyter's communication system
- automate the install from python package using setup.py and some Jupyter's config files
- made sure that the widget print itself right under the notebook's calling cell

Now, we want to : 
- make sure that we can communicate back to kernel from widget
- update the widget from kernel 

To make that happen, we will make a simple widget printing the number of click on a button.

Let's change app.js to :

```javascript 
import React from 'react'


class App extends React.Component {

  constructor(props) {
     super(props)
     this.state = {data: props.data}
  
     this.handleMsg = this.handleMsg.bind(this)
     this.handleClick = this.handleClick.bind(this)
  
     props.comm.on_msg(this.handleMsg)
  }
  
  handleClick(e) {
     this.props.comm.send("click")
  }
  
  handleMsg(msg) {
     const data = msg.content.data
     this.setState({data: data})
     console.log("hey ! we received a msg")
  }
  
  render() {
     return(
       <div style={{marginLeft: "150px"}} >
         <h1> Hello {this.state.data.title}! </h1>
         <button onClick={ this.handleClick }> count +1 </button>
         <h3> count: {this.state.data.count} </h3>
       </div>
     )
  }
}

export default App
```

What we are doing here is passing props.data to this.state at initialisation, then we handle the updates through this.handleMsg that we pass as callback to props.comm.on_msg method. 
So everytime we receive data, we update the state, and react take care of the rest !

Then we just have to update the python part:

Inside the test.ipynb:

```python
from ipykernel.comm import Comm

data = {
    "title": "this is the title",
    "count": 0
}
communication = Comm(target_name="appbar_comm",
                     data=data)


@communication.on_msg
def received(msg):
    data['count'] = data['count'] + 1
    communication.send(data)

```

Click and the counter should get incremented.  You may also evaluate `data` in
a cell, click on the button and print again.

## Creating a proper output area

Above we've explicitely set a margin with `{{marginLeft: "150px"}}` in order to
fit the jupyter output area. Let's now properly create all the elements that
make an output area:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
let promise = import('base/js/namespace')

const create_subarea = (output) =>{
    const area = document.createElement('div')
    area.classList.add('output_area')
    output.appendChild(area)
    
    const prompt = document.createElement('div')
    prompt.classList.add('prompt')
    prompt.classList.add('prompt_output')
    area.appendChild(prompt)
    
    
    const subarea = document.createElement('div')
    subarea.classList.add('output_subarea')
    area.appendChild(subarea)
    return subarea
}

export const load_ipython_extension = () =>{

    promise.then( Jupyter =>{

        Jupyter.notebook.kernel.comm_manager.register_target('appbar_comm', function(comm, msg){

            const msg_id = msg.parent_header.msg_id
            const cell = Jupyter.notebook.get_msg_cell( msg_id );
            if(cell.output_area.selector[0]){
                const output = cell.output_area.selector[0].getElementsByClassName('output')[0] 
                const subarea = create_subarea(output)
                ReactDOM.render(<App comm={comm} data={msg.content.data}/>, subarea)
            }
        })
    })
}
```

Now the widget is displayed in a proper output area.


## Appbar at last!

Now, let's import Material-UI Appbar into our project.

Material-UI import: 

```bash
cd appbar/appbarjs
yarn add @material-ui/core @material-ui/icons typeface-roboto
```

Insert `import "typeface-roboto"` into index.js and modify `App.js` like this:

```javascript
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

class App extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {data: props.data}
        
        this.handleMsg = this.handleMsg.bind(this)
        this.handleClick = this.handleClick.bind(this)
        
        props.comm.on_msg(this.handleMsg)
    }
    
    handleClick(e){
        this.props.comm.send("click")
    }
    
    handleMsg( msg ){
        const data = msg.content.data
        this.setState({data: data})
        console.log("hey ! we received a msg")
    }
    
    render(){
        return(
        <div>
          <ButtonAppBar/>
          <h1> Hello {this.state.data.title}! </h1>
          <button onClick={ this.handleClick }> count +1 </button>
          <h3> count: {this.state.data.count} </h3>
        </div>
        )
    }
}

export default App
```

At this point it won't compile since it needs a CSS loader:

```bash
yarn add style-loader css-loader file-loader --dev
```

Then in webpack.config.js add these rules:

```javascript
// ...
    {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            'file-loader',
        ],
    },
// ...
```

Then:

```bash
yarn build && cd .. && pip install . && jupyter notebook test.ipynb
```

You should now have a nice appbar printed on you notebook.

A further step would be to instantiate it and set events on it for nice rendering.
