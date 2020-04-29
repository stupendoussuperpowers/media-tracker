FROM node:alpine

WORKDIR /usr/src/api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
ENTRYPOINT ["npm", "start"]