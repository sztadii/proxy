# Proxy

## Description:

Simple http proxy

## Requirements:

- NodeJS ( min 11.0.0 ) for app serving and other development process
- Docker - to build and get some dependencies ( like MongoDB etc )

## How to run our application ( in development mode )

At first please install NodeJS, after that please run below commands:
```
npm install
npm run dev
```

## How to build and run our application ( in production mode )

At first please install NodeJS and Docker on your machine, after that please run below commands:
```
docker build . -t proxy-image
docker run -d --restart=always -p 8080:4000 --name proxy-container proxy-image
docker stop proxy-container // when we want to stop it
docker rm proxy-container   // when we want to remove the container
```
