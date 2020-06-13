FROM node:12.1.0-alpine

WORKDIR /www

COPY package.json ./
COPY package-lock.json ./
COPY .env ./
COPY tsconfig.json ./
COPY src ./src

RUN npm ci
RUN npm run build

CMD ["npm", "start"]
