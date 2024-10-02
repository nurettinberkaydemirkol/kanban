# Base image olarak Node.js kullanıyoruz
FROM node:18

# Çalışma dizini oluştur ve ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
