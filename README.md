# **Livres & Explications **

## Lien concernant les les repo Docker Hub :

- `https://hub.docker.com/repository/docker/batyste/usetask-front/general`
- `https://hub.docker.com/repository/docker/batyste/usetask-back/general`

## Explication des services
### Backend
Le backend gère la logique métier de l'application, l'authentification des utilisateurs (inscription, connexion), ainsi que les communications avec la base de données Mongo. 

- Image utilisée : batyste/usetask-back:v1.0
- Port exposé : 5002
- Dépendances : Le backend dépend du service MongoDB pour stocker et récupérer les données

### MongoDB
Le service MongoDB est une base de données NoSQL utilisée pour stocker les données de l'application. 
Ce service expose le port 27017 et utilise l'image officielle de MongoDB.

- Image utilisée : mongo:latest
- Port exposé : 27017
- Dépendances : MongoDB est utilisé par le backend pour effectuer des opérations CRUD sur la base de données

### Frontend
Le frontend représente l'interface utilisateur de l'application. 
C'est une application web développée en utilisant React (précisément Vite). Pour ça que le port par défaut sera 5173

- Image utilisée : batyste/usetask-front:v1.0
- Port exposé : 5173
- Dépendances : Le frontend dépend du service backend pour récupérer et afficher les données.

## Commandes pour lancer le projet
`docker-compose up -d`

# **Questions de réflexion à inclure dans le README**

1. Quelle est la différence entre `build:` et `image:` dans Docker Compose ?

Le `build:` permet de construire une image à partir d'un Dockerfile tandis que `image:` utilise une image existante

2. Quel est l’intérêt d’utiliser un fichier `.env` dans un projet Docker ?

Dans un projet Docker, le fichier `.env` stocke les variables d'environnement pour rendre la configuration plus flexible et sécurisé

3. Comment les volumes Docker aident-ils à gérer la persistance des données ?

Les volumes stockent les données en dehors des conteneurs ce qui assure (en cas de suppression d'un containers) le stockage des logs

4. Si vous deviez ajouter un quatrième service (ex : un reverse proxy NGINX), comment l’intégreriez-vous ?

Une section nginx devra être ajouté dans le `docker-compose.yml`. On lui difinira un nom, une image et un port