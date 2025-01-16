# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias al directorio de trabajo
COPY package*.json ./

# Copia el archivo .env al contenedor .env .
COPY ./back/ecommerce-anibau/.env .

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código del proyecto al contenedor
COPY . .

# Construye la aplicación (compila TypeScript a JavaScript)
RUN npm run build

# Expone el puerto en el que se ejecuta la app NestJS (por defecto 3000)
EXPOSE 3000

# Comando para construir la app y ejecutarla
CMD ["node", "dist/main"]
