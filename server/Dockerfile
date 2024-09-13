FROM node:20.16-alpine3.19

WORKDIR /src

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

EXPOSE 4500

CMD ["node", "index.js"]