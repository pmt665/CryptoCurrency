const { validate : uuidValidate } = require('uuid');
const { keys } = require('../config')

const isApiKeyValid = apiKey => uuidValidate(apiKey) && keys.APIKEY_HEADER_VALUE === apiKey;
const isRequestValid = key => typeof key !== 'undefined';

module.exports = {
    isApiKeyValid,
    isRequestValid
}
