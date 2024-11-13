FROM node:20-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "run", "start"]
