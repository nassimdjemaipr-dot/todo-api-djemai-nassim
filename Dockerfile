# Image de base legere (alpine = ~150 Mo au lieu de ~1 Go)
FROM node:18-alpine

# Repertoire de travail dans le conteneur
WORKDIR /app

# Copier d'abord les fichiers de dependances (optimisation du cache Docker)
COPY package*.json ./

# Installer uniquement les dependances de production, de maniere reproductible
RUN npm ci --omit=dev

# Copier le reste du code source
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Commande de demarrage
CMD ["npm", "start"]
