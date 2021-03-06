FROM node:12.1.0-alpine

WORKDIR /www

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src
COPY types ./types

RUN npm ci
RUN npm run build

CMD ["node", "dist/src/index.js"]
