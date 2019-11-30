FROM node:dubnium-alpine

WORKDIR /usr/src/app

EXPOSE 4000

RUN npm install -g yarn

COPY ./package.json .
COPY ./yarn.lock .

COPY . .

RUN yarn

CMD ["yarn", "run", "dev"]
