# React Extension trial

## Intro

The goal here is to explore webpack ability to pass from JSX with ES6 way of handling import/export into an AMD "compliant" bundle. The idea behind is to find a way to make widgets using React on front end as an alternative of Ipywidget and its uses of BackBone framework. 

## setting up

### general set up

To begin with, I suggest that you create a dedicated space for your trial to live in. The reason why is that by the end of this cookbook, we will have created a bunch of configuration files, code sources, and production code. In addition, we will use Node Package Manager, to import React, babel and webpack. Make sure you have npm or even better, yarn installed.

> Note: make sure your package manager is up to date

So let's create a basic set up for a node package

```bash
mkdir react_extension
cd react_extension
yarn init
mkdir src dist
touch src/index.js 
```

### Installing Webpack 

Webpack is a bundler, it fetch source code, and create an output that is simpler to manipulate. that's it whole purpose, but by binding webpack with some other services such as babel, you can minify it, or even transpile it into diferents version of javascript, and this is mandatory to be browser compliant. So let's install webpack as a development dependency:   

```bash
yarn add webpack webpack-cli --dev
```
To work with webpack, it needs a configuration files, called webpack.config.js. It's a quiet simple, following the documentation, we will provide a first iteration: 
 
```bash

touch webpack.config.js

```
and editing webpack.config.js

```javascript

const path = require('path');

module.exports = {
	entry: './src/index.js',
  	output: {
   		filename: 'main.js',
   		path: path.resolve(__dirname, 'dist'),
  	},
};
```
What we are doing in this configs, is simply read from entry point index.js in src folder, and create an output in dist folder.So for now, it is not very useful... It will soon be though ! 
Now we need to automatize the bundling, by making scripts into our package.json.

let's add a watch, dev and build script to our project:

within your project package.json:

```javascript
scripts:{
	"build": "webpack -p",
	"watch": "webpack --watch",
	"dev": "webpack --mode development"
}
```

Now if you run:

```bash

yarn build && ls dist/

```

should give this output:

```bash

webpack stuff
...
main.js

```
I don't really want to cover all webpack options here, but just remember that -p stands for production, which is minimified to be as light as possible. but it isn't the best way to debug your code. To do so we have the development bundling command which is dev script, that can be sometime useful. Yet the best one would definetly be watch script, that will automatically rebundle your code every time it detects a change on one of the sources files concerned by the bundle. 

### Adding React to the equation

```bash
yarn add react react-dom
```

Once installed, we can start to write some code and try to build it.

editing index.js

```javascript

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App/>, document.getElementById('root'))

```

then editing a brand new App.js file:

```javascript

import React from 'react'

const App = () =>{
	return <h1> Hello world ! </h1>
}
export default App

```

but now if you retry to build it will fail (try it ;)).

So next step is to be able to build !

```bash
yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react --dev
touch .babelrc
```

and then, within your .babelrc

```javascript
{
	"presets":["@babel/preset-env", "@babel/preset-react"]
}
```
next step is to update webpack.config.js, it should then looks like this:

```javascript
const path = require('path');

module.exports = {
	entry: './src/index.js',
    output: {
    	filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
	module:{
		rules:[
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
};
```

here a link to a very fine article about setting up react from scratch using webpack and babel [the article](https://www.valentinog.com/blog/babel/)

### live testing 

Now we want to be able to test it very quick within a notebook.So we have to turn this as an extension.
To do so, we will use asynchronous import from es6 syntax, and hopefully it will work straight away. But my intuition is that it will probably not work. 
Anyway, lets use what we have learn in  the [notebook extension trial](nbextension_trial.md) and try to turn this into a notebook extension.

let's transform our src/index.js file:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const load_extension = () =>{
	ReactDOM.render(<App/>, document.getElementById('root'))
}

import(/* webpackIgnore: true */'base/js/namespace').then( Jupyter => {
			load_ipython_extension: load_extension
})

```
>Note: the /*webpackIgnore: true*/ is a magic comment which kind of act as preprocessor directive in C.

let's build:

```bash
yarn build
```
And normally, at this point, it worked.

So we now have to test it into a notebook:

let's install and enable the extension:

```bash
cd ..
source venv/bin/activate
jupyter nbextension install react_extension/dist/ --sys-prefix --symlink
jupyter nbextension enable react_extension/dist/main --sys-prefix
jupyter notebook example.ipynb
```

and at this point, we fail to make it work into the notebook. why it is that way? probably because it ignore the base/js/namespace dependency...
So, my guess is that `/*webpackIgnore: true*/` magic command is not the proper way to tell webpack to import from an external librairy.
From jupyter-cookiecutter, i found this line `externals: ['@jupyter-widgets/base']`, let's try it out with our 'base/js/namespace' dependency provided by jupyter:

```javascript
const path = require('path');

module.exports = {
	entry: './src/index.js',
    output: {
    	filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
	module:{
		rules:[
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	externals: ['base/js/namespace']
};

```
Then, let's remove the magic comment, rebuild, and retry the enabling

```bash
yarn build
jupyter nbextension enable react_extension/dist/main --sys-prefix
```

```bash
jupyter notebook example.ipynb
```

and still, it is not working. browser error says it's about an export of base/js/namespace ... so it doesn't like the dynamic import...
by exploring webpack.config.js file in jupyter-cookiecutter, i found out that they are using a libraryTarget option setted to amd, could be the solution.
let's try to target an AMD system on webpack. 

```javascript
const path = require('path');

module.exports = {
	entry: './src/index.js',
    output: {
    	filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'amd',
    },
	module:{
		rules:[
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	externals: ['base/js/namespace']
};
```
Oookay, lets rebuild and try it out.
Well well, it is not such a failure, cause it seems that the notebook extension was loaded, but nothing appear, like reactDom could not put the h1 element...
So, just to make sure, we will add a simple console.log() into our nbextension, rebuild and see if it loads.
Let's hello world Adele's style, in our src/index.js file:

```javascript
...
const load_extension = () =>{
	console.log("Hello from the other siiiiiiide")
    ReactDOM.render(<App/>, document.getElementById('root'))
}
...
```

and then rebuild, and reload a notebook...

And still, it doesn't load... bu why? it is because of my uncomprehension of how AMD modules work. we have to export a load_ipython_extension function from our ES6 modules, that will be bundled into an AMD module, which will then expose this function the same way we did when coding extension. Long story made short, let's modify our index.js in our source to look like this. 

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

let promise = import('base/js/namespace')

export const load_ipython_extension = () =>{
	promise.then( Jupyter =>{
		console.log("Hello from the other siiiiiiide")
    	ReactDOM.render(<App/>, document.getElementById('root'))
	})
}
```

then we have to uninstall, then reinstall the jupyter nbextension dist (symlink doesn't work, I suspect it is because of the fact that webpack suppress the old main and then create the new one, which erase the symlink), any way you know the drill:

```bash
jupyter nbextension uninstall react_extension/dist
jupyter nbextension install react_extension/dist/ --sys-prefix --symlink
jupyter nbextension enable react_extension/dist/main --sys-prefix

```
Now we relaunch the notebook: 

```bash
jupyter notebook example.ipynb
```

In the webbrowser console we see `hello from the other siiiiiide`, so it finally loaded ! I'm tempted to says Eureka, but still, React component is not rendered (yet).
Exploring the issue on React, It was just a question of not passing a dom element to ReactDOM.render() method. So , let's change it in src/index.js :
```javascript
...
    ReactDOM.render(<App/>, document.getElementById('root'))
...
```
by: 
```javascript
...
	ReactDOM.render(<App/>, document.getElementById('notebook'))
...
```
after rebuild and launching we get a notebook with `Hello World` in it. Congrats, you've just made a jupyter nbextension with react and moderne javascript.besides, you have got all the tools to add typescript over it.

BOOYAH.
