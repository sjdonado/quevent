FROM node:dubnium-alpine

WORKDIR /usr/src/app

RUN npm install -g yarn

COPY ./server/package.json .
COPY ./server/yarn.lock .

RUN yarn

COPY ./server .

CMD ["yarn", "start"]
