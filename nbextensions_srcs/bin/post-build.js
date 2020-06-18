#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const getNbextensionList = (folderpath) => {
  return fs.readdirSync(folderpath)
}

const generateJson = (nbextension) => {
  const extensionEnabling = {}
  extensionEnabling[nbextension + '/index'] = true
  return { load_extensions: extensionEnabling }
}

const writeJson = (nbextension, generatedJson) => {
  const targetfile = path.resolve(path.dirname('.'),
    `../nbextensions_dists/${nbextension}`,
    `${nbextension}.json`
  )
  const data = JSON.stringify(generatedJson)
  fs.writeFileSync(targetfile, data)
}

const writeAllJsons = (nbextensions) => {
  nbextensions.forEach(nbextension => {
    const jsonfile = generateJson(nbextension)
    writeJson(nbextension, jsonfile)
  })
}

const nbextensions = getNbextensionList('./nbextensions')
writeAllJsons(nbextensions)
