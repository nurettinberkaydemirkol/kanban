FROM node:18

WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

RUN npm install -g nodemon typescript ts-node

RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Nodemon ile TypeScript dosyalarını çalıştır
CMD ["ts-node", "--watch", "src", "--exec", "ts-node", "src/server.ts"]
