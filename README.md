# CryptoCurrency  - ExchangeRate quotes

A node project which retrieves exchangeRate quotes in (USD,EUR,BLR,GBP,AUD) for the given cryptoCurrency code.

Note: This API uses sandbox version of 'CoinMarketAPI' as externalAPI for reteriving quotes.

## Run Project

Run using docker

 `docker-compose up --build`

## Project Setup for Local Machine

Installation:

`npm install`

 You need to export two environement variables "INTERNALAPI and EXTERNALAPI" as follow before running further steps:
 
 `export INTERNALAPIKEY=f440bc70-b57e-4ff6-9482-52bd561f8f1a EXTERNALAPIKEY=b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c` on terminal

To Run Test Suite:  

`npm test`  

To Run App:

`npm start`

## EndPoints

| Method | Path | Description|
|--------|------|------------|
| GET | /api/exchangeRates/code | Reterieve exchange Rate quotes in (USD,EUR,BLR,GBP,AUD) for the given cryptocurrency code.

This end point is secured with custom APIKey header.

### GET api/exchangeRates/code
 
response
```
{
    "BTC": {
        "id": 5499,
        "name": "lpw89j1w1bc",
        "symbol": "BTC",
        "slug": "zzpr7cbfhfs",
        "is_active": 9779,
        "is_fiat": null,
        "circulating_supply": 2315,
        "total_supply": 5698,
        "max_supply": 7848,
        "date_added": "2021-06-19T13:23:01.165Z",
        "num_market_pairs": 3552,
        "cmc_rank": 7924,
        "last_updated": "2021-06-19T13:23:01.165Z",
        "tags": [
            "s8grv76b55n",
            "zmhffxzzpab",
            "ge1wcil67cg",
            "witsx2pxteb",
            "x60v164m3ui",
            "krbkwllqs08",
            "auj1ot4z77a",
            "579rc25y7dj",
            "zokalkl1me9",
            "bktr71tm6a"
        ],
        "platform": null,
        "quote": {
            "AUD": {
                "price": 0.510115883075013,
                "volume_24h": 0.9855367152717158,
                "percent_change_1h": 0.6688283485759496,
                "percent_change_24h": 0.6753010729241535,
                "percent_change_7d": 0.45840459433896874,
                "percent_change_30d": 0.04230628322419561,
                "market_cap": 0.14425603830633937,
                "last_updated": "2021-06-19T13:23:01.165Z"
            },
            "BRL": {
                "price": 0.510115883075013,
                "volume_24h": 0.9855367152717158,
                "percent_change_1h": 0.6688283485759496,
                "percent_change_24h": 0.6753010729241535,
                "percent_change_7d": 0.45840459433896874,
                "percent_change_30d": 0.04230628322419561,
                "market_cap": 0.14425603830633937,
                "last_updated": "2021-06-19T13:23:01.165Z"
            },
            "EUR": {
                "price": 0.510115883075013,
                "volume_24h": 0.9855367152717158,
                "percent_change_1h": 0.6688283485759496,
                "percent_change_24h": 0.6753010729241535,
                "percent_change_7d": 0.45840459433896874,
                "percent_change_30d": 0.04230628322419561,
                "market_cap": 0.14425603830633937,
                "last_updated": "2021-06-19T13:23:01.165Z"
            },
            "GBP": {
                "price": 0.510115883075013,
                "volume_24h": 0.9855367152717158,
                "percent_change_1h": 0.6688283485759496,
                "percent_change_24h": 0.6753010729241535,
                "percent_change_7d": 0.45840459433896874,
                "percent_change_30d": 0.04230628322419561,
                "market_cap": 0.14425603830633937,
                "last_updated": "2021-06-19T13:23:01.165Z"
            },
            "USD": {
                "price": 0.510115883075013,
                "volume_24h": 0.9855367152717158,
                "percent_change_1h": 0.6688283485759496,
                "percent_change_24h": 0.6753010729241535,
                "percent_change_7d": 0.45840459433896874,
                "percent_change_30d": 0.04230628322419561,
                "market_cap": 0.14425603830633937,
                "last_updated": "2021-06-19T13:23:01.165Z"
            }
        }
    }
}
```

Following checks/validations are fired on the request and corresponding error is thrown:

1) Request should have cryptoCode like (BTC,ETH)in the url
2) Request should have custom 'x-api-key' header.
3) APIKey should be of type uuid and should be same as defined in env variable 'INTERNALAPIKEY'.

### Project Structure

```bash
├── README.md                        <-- This instructions file
├── src                              <-- Source code
│   └──helpers
│   │	├── errors.js        	         <-- Error handler middleware which is used whenever error needs to be thrown
│   │ ├── exchangeRateAPI.js	        <-- calls externalAPI of (coinMarket) to reterive actual quotes or use cache if quotes for same code is requested multiple    │   │  					                            times in a minute.
│   └── tests
│   │   ├── cryptoCurrency.tests.js  <-- contains tests
│   └── validators
│   │   ├── validator.js             <-- contains validation logic for request.
│   └── routes
│       ├── cryptoCurrency.js        <-- contains routes for exchangeRates (GET)
├── app.js                	          <-- Contains all the routes which are used and specfiying other dependencies used in the project.
├── server.js                	       <-- use app.js and start the server on the 5000 if no port is specfied.
└── config.js               	        <-- configuration keys required for the API.
```


ExchangeRateApi.js --> This is the main helper file which is used to fetch the quotes from the CoinMarket API or use local cache. 

As per the documentation on CoinMarket their API gets updated every 60 secs, so if user request quotes for same code again within a minute it is better to use local cache except of sending it to external API.

To implement this in current assignment a dictionary 'exchangeCacheDict' is created which store the quotes for the code`<code>: <data, cachedDateTime>` and then it is used to serve the rest of requests for a same code which comes within a minute. As soon as a minute gets completed and user requests for the same code again the local cache gets updated with the latest data and then it is used again.

### Tools and Technologies
node.js,express,nodemon,jest,supertest,helmet,axios,uuid, docker.
