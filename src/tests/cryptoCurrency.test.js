const { isApiKeyValid, isRequestValid }  = require('../validator/validator')
const { keys } = require('../config')
const { app }  = require('../../app');
const supertest = require("supertest");
const request = supertest(app);
const { sendExchangeRateRequest, isUseCache } = require('../helpers/exchangeRateAPI');

describe('Validation Scenarios - isApiKeyValid Method', () => {
    it('if wrong APIKey is passed then it returns false', () => {
        expect(isApiKeyValid('f440bc70-b57e-4ff6-9482-52bd561f8f1w')).toBeFalsy()
    })
    it('if Apikey is not valid uuid then it returns false',() =>{
        expect(isApiKeyValid('f440bc70')).toBeFalsy()
    })
    it('if correct APIkey is passed then it returns true', () => {
        expect(isApiKeyValid(keys.APIKEY_HEADER_VALUE)).toBeTruthy()
    })
})
describe('Validation Scenarios - isRequestValid Method', () => {
    it('if no key is passed it returns false', () => {
        expect(isRequestValid()).toBeFalsy()
    })
})
describe('end point testing - GET api/exchangeRates/:code', () =>{
    it("if correct code is passed with the api key 200 is returned", async() => {
        let res = await request.get('/api/exchangeRates/ETH').set('x-api-key', keys.APIKEY_HEADER_VALUE)
        expect(res.status).toBe(200);
    })
    it("if header is missing validation error is thrown...", async() => {
        let res = await request.get('/api/exchangeRates/ETH');
        expect(JSON.parse(res.text).message).toMatch('Missing Header x-api-key')
    })
    it("if wrong api key is passed validation error is thrown...", async() => {
        let res = await request.get('/api/exchangeRates/ETH').set('x-api-key', '450bc70-b57e-4ff6-9482-52bd561f8f1w');
        expect(JSON.parse(res.text).message).toMatch('Invalid ApiKey')
    })
})

describe('exchangeRate API Method testing', () =>{
    it("if for same cypto code multiple requests has been sent within the duration of 1 min then after first call rest of the requests will be served through local cache...", async() => {
        expect(isUseCache('BTC')).toBeFalsy();
        let res = await sendExchangeRateRequest('BTC')
        expect(res.status).toBe(200);
        let res1 = await sendExchangeRateRequest('BTC')
        expect(isUseCache('BTC')).toBeTruthy();
        expect(res1.status).toBe(200);
        let res2 = await sendExchangeRateRequest('BTC')
        expect(isUseCache('BTC')).toBeTruthy();
        expect(res2.status).toBe(200);
    })
})