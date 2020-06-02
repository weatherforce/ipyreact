#!/usr/bin/env node

import fs from 'fs';

const getTemplate = ()=>{
	return JSON.parse(fs.readFileSync('template.json'))
}
//grab provided args
const [,, ...args] = process.argv



console.log(getTemplate())
