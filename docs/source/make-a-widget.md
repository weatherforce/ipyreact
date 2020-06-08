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
then simply hit `yarn build` and you are good to go.

## make the python part

### setup

### develop 

### build


## Test it on a notebook
