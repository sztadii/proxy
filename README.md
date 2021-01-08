# Proxy

## Description:
Simple http proxy.

## Modes
- via form - helpful when you want just open proxy website
- via env variable - when you want to run your proxy service that is pointing to static URL


## Requirements:
- NodeJS ( min 12.0.0 ) for app serving and other development process
- Docker - if we want to build production version of the app

## How to run our application ( in development mode )
At first, you need to create .env file ( please use as an example .env-example ) in root directory <br/>
After please install NodeJS and then run below commands:
```
npm install
npm start
```


## How to build and run our application ( in production mode )
At first please install NodeJS and Docker on your machine, after that please run below commands:
```
docker build . -t proxy-image
docker run -d -p 8080:4000 -e "PORT=4000" --name proxy-container proxy-image
docker stop proxy-container && docker rm proxy-container // when we want to stop and remove it
```

When you want to override some env variable then please run:
```
docker run -e "PROXY_URL=https://app.moja-e-gazetka.pl" -d -p 9000:4000 proxy-image
```
