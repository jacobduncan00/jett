FROM node:12
ENV PORT 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/ 
RUN npm install --silent

COPY . /usr/src/app

RUN npm run build --silent
EXPOSE 3000

CMD "npm" "run" "dev"

