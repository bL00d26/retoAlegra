FROM node:16-alpine
WORKDIR /usr/recipe
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3500
CMD npm start