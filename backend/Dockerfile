# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
