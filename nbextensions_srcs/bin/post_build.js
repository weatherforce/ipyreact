#!/usr/bin/env node

import fs from 'fs';

const getNbextensionList = (folderpath) => {
	return fs.readdirSync(folderpath)		
};

const generateJson = (nbextension) => {
	let extensionEnabling = {};
	extensionEnabling[nbextension +'/main'] = true
	return { "load_extensions": extensionEnabling }
}

const generateAllJsons = (nbextensions) => {
	let JsonList = nbextensions.map(nbextension => generateJson(nbextension))
	return JsonList
}

//grab provided args
const [,, ...args] = process.argv


let nbextensions = getNbextensionList("./nbextensions")
console.log(nbextensions)
console.log(generateAllJsons(nbextensions))
