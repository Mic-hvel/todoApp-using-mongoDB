FROM node:20.16-alpine3.19

WORKDIR /src

COPY package*.json ./

RUN npm cache clean --force && npm install

# Install Prisma globally
RUN npm install -g prisma

COPY . .

RUN npm install @prisma/client
RUN npm install nodemon

EXPOSE 5500

# Generate the Prisma client
RUN npx prisma generate

CMD ["nodemon", "index.js"]