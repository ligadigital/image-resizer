module.exports = process.env.USE_IMAGE_MAGICK ?
  require('gm').subClass({ imageMagick: true }) :
  require('gm');
