# Imagen base oficial de Node
FROM node:22.14.0-alpine


#TODO Directorio de trabajo dentro del contenedor
WORKDIR /app

#TODO Copiar package.json y package-lock.json (o yarn.lock/pnpm-lock.yaml)
COPY package*.json ./

#TODO Instalar dependencias
RUN npm install

#TODO Copiar todo el código
COPY . .

#TODO Construir la app
RUN npm run build

#TODO Exponer el puerto donde corre Next.js
EXPOSE 3000

#TODO Comando por defecto para iniciar la app
CMD ["npm", "start"]
