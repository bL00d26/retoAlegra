FROM node:16-alpine
WORKDIR /usr/frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3300
CMD npm run dev