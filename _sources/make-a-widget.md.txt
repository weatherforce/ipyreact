# Adding a widget to ipyreact

This section aims at helping developers to create new widgets within
ipyreact.  Here you will find how to create both the frontend and
backend sides of a notebook extension.

## Creating the frontend part

Notebook extensions source code lives in in `nbextensions_srcs/`. If you check it out, you will see that
all the configuration files and necessary scripts. This source code is then transpiled
to production code which is stored in `nbextensions_dists/`.

### Directory structure

You will need to create a some mandatory files in order to create your widget

```bash
cd nbextensions_srcs/nbextensions
mkdir hello
cd hello
touch index.js hello.js
```

### Minimal code example

Type the following lines in `index.js`:

```javascript
import React from 'react'
import {CommWrapper} from '../../utils/commwrapper/commWrapper'
import HelloWidget from './hello'

export const load_ipython_extension = () => {
  CommWrapper("hello", HelloWidget)
}
```

This is your entry point, a piece of code that will make your React component available to Jupyter.
Let's look at the React component which will live in `hello.js`:

```javascript
import React from 'react'
import Widget from '../../utils/widget/widget'

class HelloWidget extends Widget {
  render() {
    return <h1>Hello, World!</h1>
  }
}

export default HelloWidget
```

This is the minimum amount of code necessary to create a widget. You may then customize this component as you would do with any other React component.

### Building your extension

In `nbextensions_srcs`, edit `webpack.config.js` and add your widget as a new entry:

```javascript
var path = require('path')

module.exports = {
  entry: {
    breadcrumbs: './nbextensions/breadcrumbs/index.js',
    dialog: './nbextensions/dialog/index.js',
    // ...
    hello: './nbextensions/hello/index.js',
  },
  // ...
}
```

Then run `yarn build` for a production build or `yarn dev` for a development build.

## Creating the backend part

Now that you have a minimal frontend that compiles to JavaScript, you want to
invoke it in your notebook. To do so, you need Python code that will trigger
rendering of the frontend part.

### Directory structure

Enter the `ipyreact` Python package directory, then create a Python module named `hello.py`.

```bash
cd ipyreact
touch hello.py
```

### develop

Copy paste the following into `hello.py`:

```python
from ipyreact import Widget


class HelloWidget(Widget):

    def __init__(self):
        super().__init__("hello")
```

This is the minimum amount of code necessary to create the Python side of a
widget.  The argument passed to init should be the same as the first argument
you passed to `CommWrapper` in your JavaScript code.

To make it easier to import your widget, edit `ipyreact/__init__.py` and
append the following line:

```python
from .hello import HelloWidget
```

To install it, from ipyreact root folder, run:

```bash
pip install .
```

## Testing it in a notebook

Create a notebook, import your widget from ipyreact and instantiate it in a cell:

```python
from ipyreact import HelloWidget
your_widget_instance = HelloWidget()
your_widget_instance
```

In this section you have seen the minimal amount of code to add a widget to
ipyreact.
