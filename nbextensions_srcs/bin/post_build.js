#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const getNbextensionList = (folderpath) => {
	return fs.readdirSync(folderpath)		
};

const generateJson = (nbextension) => {
	let extensionEnabling = {};
	extensionEnabling[nbextension +'/index'] = true
	return { "load_extensions": extensionEnabling }
}

const writeJson = (nbextension, generatedJson) => {
	let targetfile = path.resolve(path.dirname('.'),
		`../nbextensions_dists/${nbextension}`,
		`${nbextension}.json`);
	let data = JSON.stringify(generatedJson)
	fs.writeFileSync(targetfile, data)
}

const writeAllJsons = (nbextensions) => {
	nbextensions.forEach( nbextension =>{
		let jsonfile = generateJson(nbextension)
		writeJson(nbextension, jsonfile)
	})
}

//grab provided args
const [,, ...args] = process.argv

let nbextensions = getNbextensionList("./nbextensions")
writeAllJsons(nbextensions)
