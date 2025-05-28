# Etapa de construcción (builder)
FROM node:18-alpine AS builder

WORKDIR /app

# Copia package.json y package-lock.json para instalar dependencias
COPY package.json ./
COPY package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación React
RUN npm run build

# Etapa de producción (servidor Nginx)
FROM nginx:stable-alpine

# Copia la configuración de Nginx (¡AHORA DESCOMENTADA Y LISTA!)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos de la aplicación construida al servidor Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]