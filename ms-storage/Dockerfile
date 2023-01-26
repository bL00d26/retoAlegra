FROM node:16-alpine
WORKDIR /usr/storage
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3600
CMD npm start