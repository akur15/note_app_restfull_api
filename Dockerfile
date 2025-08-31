# Gunakan image Node.js resmi
FROM node:18-alpine

# Tentukan direktori kerja dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Expose port 3000 untuk Webpack Dev Server
EXPOSE 3000

# Jalankan server development
CMD ["npm", "run", "start-dev"]
