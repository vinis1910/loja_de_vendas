FROM node:18-alpine

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=prod

CMD [ "npm", "run", "start:prod" ]
