1) How long did you spend on the coding assignment? What would you add to your solution if you had
more time? If you didn't spend much time on the coding assignment then use this as an opportunity to
explain what you would add

- 2-2.5 hrs (25-30 min externalAPI documentation and analyzing which end points to use, 1-1.5 hrs for development, tests, readme and rest of the things.)

- Currently if user makes a quote request for cryptocode either it is fetched from the external API(if request is first time or 1 min is passed after its last fetched) or from local dictionary and the local dictionary gets updated only if user makes a request for the same code again after 1 min. 

   What i wanted to add or improve is as follow:
   - Fire an event as soon as cachedtime completes 1 min 
   - Calls externalAPI to fetch the data
   - Updates the local cache/dictionary with data and in this way we will remove the dependency of updating cache on end user request and cache will always have      latest data and response time would be very less.

2) What was the most useful feature that was added to the latest version of your language of choice?
Please include a snippet of code that shows how you've used it.

-  I used Optional Chaining in this project which is released in ES11: 
   
   [optional?.chaining documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

    Here is the code snippet which shows how it is used
    
    ```
       const queryString = querystring.encode({ symbol: code, convert: keys.EXTERNALAPI.CURRENCIES});
       const url = keys.EXTERNALAPI.BASE_URL + queryString;
       let res =  await axios.get(url, keys.EXTERNALAPI.config)
       **let data = res?.data?.data;**
       exchangeCacheDict[code] = { data, cachedDateTime: new Date().toISOString() }
    ```
    
    The line which is prefixed with ** uses this feature. This functionality removes the need for conditionals before calling a variable or method enclosed in it.
    
    Before this feature release we have to do it like
    ```
        let data = res && res.data && res.data.data
    ```
    
3) How would you track down a performance issue in production? Have you ever had to do this?
- I will start by looking into the CPU usage and memory consumption on the environment. 
- Perform logging/Monitoring and try to get metrics of what is used and what processes/methods are taking time. For Example in AWS cloudWatch metrics you can see what every lambda is doing and how much cpu it is using and how fast it is procesing the sync with DB and other resources. 
4) What was the latest technical book you have read or tech conference you have been to? What did you
learn?
- In terms of reading I generally follow mdn link for JS releases and also follow some courses on udemy and check aws reinvent events.

5) What do you think about this technical assessment?
- I enjoyed working on this as I get to know more on cryptoCurrency and also which external providers you can use to play with it.
6) Please, describe yourself using JSON.

```
{
  "firstName": "Puneet",
  "lastName": "Gupta",
  "age": 32,
  "nationality": "Indian",
  "livesIn": "Almere",
  "profession" : "Full Stack Developer",
  "techStack": [
      "Node.js",
      "AWS",
      "React",
      "Javascript",
      "C#.Net"
  ],
  "hobbies": [
    "Table Tennis",
    "Gardening",
    "Cooking"
  ]
}
```
