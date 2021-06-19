const express = require('express')
const router = express.Router();
const { isApiKeyValid, isRequestValid }  = require('../validator/validator')
const { keys } = require('../config')
const { ErrorHandler } = require('../helpers/error');
const  { sendExchangeRateRequest } = require('../helpers/exchangeRateAPI')

router.get('/:code', async(req, res, next) => {
    try{
        let apiKey = req.header(keys.APIKEY_HEADER_NAME);
        if(!isRequestValid(apiKey))
            throw new ErrorHandler(422, 'Missing Header x-api-key');
        if (!isApiKeyValid(apiKey))
            throw new ErrorHandler(422, 'Invalid ApiKey');
        let { code }  = req.params;
        let { status, quotes } = await sendExchangeRateRequest(code);
        return res.status(status).json(quotes)
    }
    catch(error){
        next(error)
    }
})
module.exports = router