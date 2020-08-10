FROM node:12.18-alpine3.12

RUN mkdir /src
WORKDIR /src

COPY package*.json ./
RUN npm install

CMD [ "npm", "run", "start" ] 