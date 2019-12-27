FROM node:dubnium-alpine

WORKDIR /usr/src/app

COPY server/package.json .

RUN npm install

COPY server .

CMD ["npm", "start"]
