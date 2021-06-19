exports.keys = {
    APIKEY_HEADER_NAME: 'x-api-key',
    APIKEY_HEADER_VALUE : process.env.INTERNALAPIKEY,
    CACHE_EXPIRATIONTIME: 60,
    EXTERNALAPI:{
        BASE_URL: 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?',
        CURRENCIES: 'USD,EUR,BRL,GBP,AUD',
        config: {
            headers:{
                'X-CMC_PRO_API_KEY': process.env.EXTERNALAPIKEY,
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip,deflate'
            }
        }
    }
}