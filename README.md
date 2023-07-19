# Simple Performance crawler

The aim of this application to quickly check a set of sites or site/sub-sites response times (average, sum) using threads.
The crawler will run trough the urls and request the sites and measures their response times. It will repeat this process under rhe given cycle.

## Requirements

-   NodeJS v18.x.x

## Prerequisite

```
npm install
```

## Run

```
npm start
```

## Config

-   Under the example folder in the urls.json list all the necessary url(s)
-   in the .env file set the `CYCLES` to the desired value
-   in the .env file set the `URL_PATH` to the desired value, if you would like to add an additional path for URLs

## Example

```
Results of cycle #1
Url: https://jsonplaceholder.typicode.com/posts/1 - Status Code: 200 - Response time: 201(ms)
Url: https://jsonplaceholder.typicode.com/posts/2 - Status Code: 200 - Response time: 202(ms)
Url: https://jsonplaceholder.typicode.com/posts/3 - Status Code: 200 - Response time: 202(ms)
Url: https://jsonplaceholder.typicode.com/posts/4 - Status Code: 200 - Response time: 201(ms)
Url: https://jsonplaceholder.typicode.com/posts/5 - Status Code: 200 - Response time: 202(ms)
Average response time: 202(ms)
Total response time: 1008(ms)
```
