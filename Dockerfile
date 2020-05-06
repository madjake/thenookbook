FROM node:12

WORKDIR /opt/thenookbook

COPY . /opt/thenookbook

RUN npm install

ENTRYPOINT npm run start-dev
