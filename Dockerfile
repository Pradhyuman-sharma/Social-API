FROM node:14-alpine as base
WORKDIR /home/node/app
COPY package*.json ./

COPY --chown=node:node . .



FROM base as test
RUN npm install
COPY . .
CMD [ "npm", "test" ]

FROM base as prod
RUN npm install
COPY . .
CMD [ "npm", "start" ]
EXPOSE 8081