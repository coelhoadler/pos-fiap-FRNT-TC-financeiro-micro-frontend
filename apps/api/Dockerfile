FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production

CMD ["sh", "-c", "cp .env.docker .env && node index.js"]
