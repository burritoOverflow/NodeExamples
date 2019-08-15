FROM node:10
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production && mv node_modules ../
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]