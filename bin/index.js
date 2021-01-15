#!/usr/bin/node

const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const version = require('../package.json').version
const generate = require('../index.js')
const { exec } = require("child_process")

const optionDefinitions = [
  { name: 'width', alias: 'w', type: Number, defaultValue: 640, description: 'Width of the image. Default: 640' },
  { name: 'height', alias: 'h', type: Number, defaultValue: 480, description: 'Height of the image. Default: 480' },
  { name: 'red', alias: 'r', type: Number, defaultValue: 255, description: 'Red part, 0-255. Default: 255' },
  { name: 'green', alias: 'g', type: Number, defaultValue: 255, description: 'Green part, 0-255. Default: 255' },
  { name: 'blue', alias: 'b', type: Number, defaultValue: 255, description: 'Blue part, 0-255. Default: 255' },
  { name: 'text', alias: 't', type: String, defaultValue: 'Lorem ipsum', description: 'Text to put on image. Default: "Lorem ipsum"' },
  { name: 'font', alias: 'f', type: String, defaultValue: 'sans-serif', description: 'Font the text will be rendered in. Default: "sans-serif"' },
  { name: 'output', alias: 'o', type: String, defaultValue: './image.png', description: 'Path of the image. Default: "./image.png"' },
  { name: 'help', type: Boolean, defaultValue: false, description: 'Prints this help' },
  { name: 'version', alias: 'v', type: Boolean, defaultValue: false, description: 'Prints the version' },
  { name: 'open', type: Boolean, defaultValue: false, description: 'Opens the image in your default image viewer afterwards (Linux, OSX and Windows)' },
]
const options = commandLineArgs(optionDefinitions)

if (options.version) {
  console.log(version)
  return
}

if (options.help) {
  const sections = [
    {
      header: 'generate-placeholder-image',
      content: 'Create placeholder images with a single line of bash!'
    },
    {
      header: 'Arguments',
      optionList: optionDefinitions
    },
    {
      header: 'Example',
      content: './generate.js -w 100 -h 100 -r 0 -g 0 -b 255 -t "Hello, World!" -f Helvetica -o ./placeholder.png'
    }
  ]

  const usage = commandLineUsage(sections)
  console.log(usage)

  return
}

generate(options)

if (options.open) {
  let command = 'xdg-open'
  if (process.platform === 'win32') {
    command = 'start'
  }

  if (process.platform === 'darwin') {
    command = 'open'
  }

  exec(`${command} ${options.output}`)
}
