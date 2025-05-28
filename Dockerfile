# Étape 1 : build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Étape 2 : image de production avec NGINX
FROM nginx:alpine
COPY --from=build /app/dist/catmash-client /usr/share/nginx/html

# Copie la configuration NGINX par défaut
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
