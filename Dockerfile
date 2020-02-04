FROM node:12.1.0

WORKDIR /www

COPY package.json ./
COPY package-lock.json ./
COPY .env ./
COPY tsconfig.json ./
COPY src ./src

RUN npm ci
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
