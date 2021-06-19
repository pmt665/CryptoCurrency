const axios = require('axios').default;
const { keys } = require('../config')
const querystring = require('querystring')
const { ErrorHandler } = require('../helpers/error');

const exchangeCacheDict = {};

exports.sendExchangeRateRequest = async(code) => {
    try {
        if (isUseCache(code)){
            return {
                quotes: exchangeCacheDict[code].data,
                status: 200
            }
        }
        const queryString = querystring.encode({ symbol: code, convert: keys.EXTERNALAPI.CURRENCIES});
        const url = keys.EXTERNALAPI.BASE_URL + queryString;
        let res =  await axios.get(url, keys.EXTERNALAPI.config)
        let data = res?.data?.data;
        exchangeCacheDict[code] = { data, cachedDateTime: new Date().toISOString() }
        return { quotes: data, status: res.status }
    }
    catch(e){
        throw new ErrorHandler(500, e.message || 'unknown error')
    }
}

const isUseCache = code =>  exchangeCacheDict[code] && ((new Date().getTime() - new Date(exchangeCacheDict[code].cachedDateTime).getTime())/1000) <= keys.CACHE_EXPIRATIONTIME

exports.isUseCache = isUseCache;