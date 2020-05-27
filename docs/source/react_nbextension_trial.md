# React Extension trial

## Intro

The goal here is to explore webpack ability to pass from JSX with ES6 way of handling import/export into an AMD "compliant" bundle. The idea behind is to find a way to make widgets using React on front end as an alternative of ipywidget library and its uses of Backbone framework. 

## setting up

### general set up

To begin with, I suggest that you create a dedicated space for your trial to live in. The reason why is that by the end of this cookbook, we will have created a bunch of configuration files, code sources, and production code. In addition, we will use Node Package Manager, to import React, babel and webpack. Make sure you have NPM or even better, yarn installed.

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

Webpack is a bundler, it fetch source code, and create an output that is simpler to manipulate. that's it whole purpose, but by binding webpack with some other services such as babel, you can minify it, or even transpile it into different version of JavaScript, and this is mandatory to be browser compliant. So let's install webpack as a development dependency:   

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
What we are doing in this configurations, is simply read from entry point index.js in src folder, and create an output in dist folder.So for now, it is not very useful... It will soon be though ! 
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
I don't really want to cover all webpack options here, but just remember that -p stands for production, which is minimized to be as light as possible. but it isn't the best way to debug your code. To do so we have the development bundling command which is dev script, that can be sometime useful. Yet the best one would definitely be watch script, that will automatically re bundle your code every time it detects a change on one of the sources files concerned by the bundle. 

## Adding React to the equation

Having nicely set up our project, we can now enter the heart of the matter. In this section we will install React, make a very simple React Component to render, and render it into our notebook.

### Install React

```bash
yarn add react react-dom
```
Once installed, we can start to write some code and try to build it.

### Writing Code 

Here comes the fun part ! we need to modify our index.js file to look like the code below:
```javascript

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App/>, document.getElementById('root'))

```
What we are doing here is rendering an App component into a DOM element called 'root'. If you explore a running Jupyter notebook, you won't find any 'root' element, but seriously, who cares? Right? 

Anyway, we don't have an App yet, so we need to create it. In the same src folder create App.js and add the following to it:

```javascript

import React from 'react'

const App = () =>{
	return <h1> Hello world ! </h1>
}
export default App

```
And its about time to build ! so `yarn build` will unfortunately crash miserably...  Next step: be able to build!

### bundling

According to Webpack error messages, we need a transpiler to understand JSX, which is React's javascript flavour.So, we need to call Babel at the rescue.
Below the commands to install babel:

```bash
yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react --dev
touch .babelrc
```

Then, editing your .babelrc

```javascript
{
	"presets":["@babel/preset-env", "@babel/preset-react"]
}
```

let's update webpack.config.js, it should then looks like this:


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
you can now hit `yarn build` again, and it will build.

>Note:here a link to a very fine article about setting up react from scratch using webpack and babel [the article](https://www.valentinog.com/blog/babel/).

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
Then, let's remove the magic comment, rebuild and refresh the notebook page.

>Note: you can also set up `yarn watch` in a terminal, create a second one for jupyter notebook,  and edit code into a third one. Like this, you would just have to refresh the webpage! ;)

```bash
yarn build
jupyter notebook example.ipynb
```
Still, not working. browser error says it's about an export of base/js/namespace ... so it doesn't like the dynamic import...
by exploring webpack.config.js file in jupyter-cookiecutter, I found out that they are using a libraryTarget option setted to amd, could be the solution.
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
Okay, lets rebuild and try it out.
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

and then rebuild, refresh...

And still, it doesn't load... bu why? it is because of my incomprehension of how AMD modules work. we have to export a load_ipython_extension function from our ES6 modules, that will be bundled into an AMD module, which will then expose this function the same way we did when coding extension. Long story made short, let's modify our index.js in our source to look like this. 

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
after rebuild and launching we get a notebook with `Hello World` in it. Congrats, you've just made a jupyter nbextension with react and modern javascript.besides, you have got all the tools to add typescript over it.

BOOYAH.
