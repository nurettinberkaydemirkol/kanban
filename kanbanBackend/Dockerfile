FROM node:18

WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Nodemon, TypeScript, ve ts-node'u global olarak kur
RUN npm install -g nodemon typescript ts-node

# Uygulama bağımlılıklarını kur
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Nodemon ile TypeScript dosyalarını çalıştır
CMD ["ts-node", "--watch", "src", "--exec", "ts-node", "src/server.ts"]
