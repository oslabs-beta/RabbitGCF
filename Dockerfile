FROM node:20.10
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build
EXPOSE 80
ENTRYPOINT ["node", "./server/server.js"]

