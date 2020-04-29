FROM node:alpine

RUN npm install -g http-server

WORKDIR /usr/src/client

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
ENTRYPOINT [ "npm", "run", "serve" ]