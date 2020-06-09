# Make a custom widget into ipyreactwidgets

This section aim to help developers to embed or develop their widget code into ipyreactwidgets.
Here you will find were to put the notebook extension, how to build it, and do the same with python side.

## Make the front end part

NBextensions source code is hosted in `nbextensions_srcs/`. If you check it out, you will see that 
all the configuration files and necessaries scripts are living there. This source code is then transpiled
to production code which is hosted into 'nbextensions_dists/'.

### set up
You will need to create a some mandatory files in order to create your widget

```bash
cd nbextensions_srcs/nbextensions
mkdir <your-widget>
cd <your-widget>
touch index.js <your-widget>.js
```

Copy paste the following lines into <your-widget>/index.js, and modify the <your-widget> variables accordingly.

```javascript
import React from 'react'
import {CommWrapper} from '../../utils/commwrapper/commWrapper'
import <Your-Widget> from './<your-widget>'

export const load_ipython_extension = () => {
	CommWrapper("<your-widget>_comm", <Your-Widget>)
}
```
This is your entry point, a piece of code that will actually serve your widget visual implementation. and The visual
will live in <your-widget>.js file. Let's dive into it.

### develop

Open <your-widget>.js in your favorite editor, and add copy paste the following lines into it:

```javascript
import React from 'react'
import Widget from '../../utils/widget/widget'


class <Your-Widget> extends Widget {

	render(){
		return(
			<h1<Hello from <Your-Widget></h1>	
		)
	}
}

export default <Your-Widget> 
```

This is the minimum amount of code necessary to create a widget. What you can do now is customize this part as you would do to any other React project.

### build

In nbextensions_srcs, edit `webpack.config.js` and add your widget as a new entry.
then simply hit `yarn build`( if you want a production code, otherwise use `yarn dev` to develop and have access to errors), and you are good to go.

## make the python part

Now that you have a minimal version that compiles in javascript, you want it to be print into your notebook. To do so, you need a python side that will
"summon" the visual javascript side.

### setup

Enter ipyreactwidgets package, then create your python module <your-widget>.py in it.

```bash
cd ipyreactwidgets
touch <your-widget>.py
```

### develop 

Copy paste the following into <your-widget>.py, and modify accordingly <your-widget> values.

```python
from ipyreactwidgets import Widget


class <YourWidget>(Widget):

    def __init__(self):
        super().__init__("<your-wigdet")
```

This is the minimal amount of code necessary to create the python side of a widget. 

### build

First step, ease access to your widget: edit `ipyreactwidgets/__init__.py` file, and 
append the following line, modifying <your-widget> accordingly.

```python
from .<your-widget> import <YourWidget> 
```

Second step, in ipyreactwidgets root folder, hit :

```bash
pip install .
```

## Test it on a notebook

Just run a notebook, import your widget from ipyreactwidgets, and instantiate it.

```bash
jupyter notebook TESTEME.ipynb
```

in a cell:

```python
from ipyreactwidgets import <YourWidget> 
your_widget_instance = <YourWidget>()
your_widget_instance
```

In this section you have seen the minimal amount of code to create a widget directly into ipyreactwidget.
Please refer to [cookiecutter](cookiecutter.md) for more details on how python and javascript modules communicates.

