FROM node:18-alpine

WORKDIR /app

# Instalar dependencias primero (cache layer)
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 5000

# Comando por defecto (usa nodemon para hot reload)
CMD ["npm", "run", "dev"]