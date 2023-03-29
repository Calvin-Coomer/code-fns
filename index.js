const transforms = require('./transforms');
const validations = require('./validations');
const formatting = require('./formatting');
const misc = require('./miscFunctions');

module.exports = {
    ...transforms,
    ...validations,
    ...formatting,
    ...misc
}

// npm publish --access public