# TODO API - DJEMAI Nassim

API REST de gestion de tâches (Todo) développée avec Node.js / Express, conteneurisée avec Docker, et préparée pour la CI/CD.

Projet en cours de développement (exercice noté). Cette base contient une API Node.js simple ; les fonctionnalités de la Todo API (CRUD des tâches) seront ajoutées ensuite.

## Stack technique
- Node.js + Express
- Docker

## Lancer le projet

### Avec Node.js
```bash
npm install
npm start
```
L'application est accessible sur http://localhost:3000

### Avec Docker
```bash
docker build -t todo-api-djemai-nassim:1.0 .
docker run -p 3000:3000 todo-api-djemai-nassim:1.0
```
L'application est accessible sur http://localhost:3000

## Structure actuelle
```
.
├── src/
│   └── index.js        # Point d'entrée de l'application Express
├── Dockerfile          # Recette de l'image Docker
├── .dockerignore
├── .gitignore
├── package.json
└── README.md
```

## Auteur
DJEMAI Nassim
