FROM node:20-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV MONGO_URI=mongodb://mongo:27017/midtermNodejs

EXPOSE 5000

CMD ["npm", "run", "start"]
