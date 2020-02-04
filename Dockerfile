FROM node:10.1.0

WORKDIR /www

COPY package.json ./
COPY package-lock.json ./
COPY .env ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
