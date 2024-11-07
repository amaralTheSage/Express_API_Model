FROM node:21-alpine

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

RUN npx prisma generate

EXPOSE 8000

CMD ["npm","run","dev"]

