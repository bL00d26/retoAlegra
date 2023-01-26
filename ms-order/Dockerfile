FROM node:16-alpine
WORKDIR /usr/order
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3400
CMD npm start