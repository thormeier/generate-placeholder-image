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

  let type = options.output.split('.').pop()
  if (type === 'jpeg') {
    type = 'jpg'
  }

  const allowedTypes = ['png', 'jpg', 'pdf', 'svg']

  if (allowedTypes.indexOf(type) === -1) {
    throw new Error(`Unknown image type "${type}", expected one of "${allowedTypes.join('", "')}"`)
  }


  const width = options.width
  const height = options.height
  const color = colorToHex(options.r, options.g, options.b)
  const textColor = invertColor(options.r, options.g, options.b)

  const canvas = createCanvas(width, height, type)
  const context = canvas.getContext('2d')

  const fontSize = height / 10

  context.fillStyle = color
  context.fillRect(0, 0, width, height)
  context.fillStyle = textColor
  context.font = `${fontSize}px ${options.font}`

  const textSize = context.measureText(options.text)

  context.fillText(options.text , (canvas.width / 2) - (textSize.width / 2), (canvas.height / 2) + (fontSize / 2))

  const mimeTypes = {
    png: 'image/png',
    jpg: 'image/jpeg',
    pdf: 'application/pdf',
    svg: 'image/svg+xml'
  }
  const buffer = canvas.toBuffer(mimeTypes[type])
  fs.writeFileSync(options.output, buffer)
}

module.exports = generateImage
