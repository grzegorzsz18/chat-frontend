FROM node:9.6.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
USER root
RUN npm install
RUN npm install -g --unsafe @angular/cli@1.7.1
RUN npm install stompjs
COPY . /usr/src/app

CMD ng serve --host 0.0.0.0 --port 4200
