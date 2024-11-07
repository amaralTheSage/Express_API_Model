FROM node:18-alpine

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

EXPOSE 8000

CMD [ "npm","run","dev" ]

