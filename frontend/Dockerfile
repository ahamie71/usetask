
# Utiliser une image de base Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers de l’application
COPY . .

# Exposer le port 5173 pour React (vite)
EXPOSE 5173

# Lancer l'application en mode développement
CMD ["npm", "run", "dev", "--", "--host"]

