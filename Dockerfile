FROM "node:lts-alpine"

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY ./dist /usr/src/app

CMD ["node", "index.js"]