const { createCanvas } = require('canvas')
const fs = require('fs')

/**
 * Transforms R, G and B into a hex color string.
 * @param r
 * @param g
 * @param b
 * @returns {string}
 */
const colorToHex = (r, g, b) => '#' +
  (r.toString(16).padStart(2, '0')) +
  (g.toString(16).padStart(2, '0')) +
  (b.toString(16).padStart(2, '0'))

/**
 * Inverts a color and returns its hex value
 * @param r
 * @param g
 * @param b
 * @returns {string}
 */
const invertColor = (r, g, b) => colorToHex(
  (255 - r),
  (255 - g),
  (255 - b)
)

/**
 * Generates an image with a given set of options
 * @param userOptions
 */
const generateImage = userOptions => {
  const defaultOptions = {
    width: 640,
    height: 480,
    r: 255,
    g: 255,
    b: 255,
    text: 'Lorem ipsum',
    font: 'san-serif',
    output: './image.png'
  }

  const options = {
    ...defaultOptions,
    ...userOptions
  }

const width = options.width
const height = options.height
const color = colorToHex(options.red, options.green, options.blue)
const textColor = invertColor(options.red, options.green, options.blue)

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

context.fillStyle = color
context.fillRect(0, 0, width, height)
context.fillStyle = textColor
context.font = `${height / 10}px ${options.font}`

const textSize = context.measureText(options.text)

context.fillText(options.text , (canvas.width / 2) - (textSize.width / 2), (canvas.height / 2))

const buffer = canvas.toBuffer('image/png')
fs.writeFileSync(options.output, buffer)
}

module.exports = generateImage
