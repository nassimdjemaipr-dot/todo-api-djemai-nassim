# TODO API - DJEMAI Nassim

API REST de gestion de tâches (Todo) développée avec Node.js / Express, conteneurisée avec Docker et préparée pour la CI/CD.

## Présentation du projet

Cette API permet de gérer des tâches (Tasks) via une API REST : créer, lister, consulter, modifier et supprimer des tâches (opérations CRUD). Les données sont actuellement stockées en mémoire (stockage local).

## Stack technique

- Node.js (runtime)
- Express (framework web)
- Helmet (sécurité des en-têtes HTTP)
- CORS (gestion des requêtes cross-origin)
- Docker (conteneurisation)

## Prérequis

- Node.js 18 ou supérieur, OU
- Docker

## Installation et lancement

### Cloner le projet

```bash
git clone https://github.com/nassimdjemaipr-dot/todo-api-djemai-nassim.git
cd todo-api-djemai-nassim
```

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

Le port peut être personnalisé avec la variable d'environnement PORT.

## Endpoints de l'API

| Méthode | Endpoint | Description |
|---------|------------------|------------------------------|
| GET | /health | Vérifier l'état de l'API |
| GET | /api/tasks | Lister toutes les tâches |
| GET | /api/tasks/:id | Récupérer une tâche par son id |
| POST | /api/tasks | Créer une tâche |
| PUT | /api/tasks/:id | Modifier une tâche |
| DELETE | /api/tasks/:id | Supprimer une tâche |

### Exemples avec curl

```bash
# Créer une tâche
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Faire les courses","description":"lait, pain","status":"pending"}'

# Lister les tâches
curl http://localhost:3000/api/tasks

# Modifier une tâche
curl -X PUT http://localhost:3000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'

# Supprimer une tâche
curl -X DELETE http://localhost:3000/api/tasks/<id>
```

## Modèle de données (Task)

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

- id : identifiant unique généré automatiquement
- title : titre de la tâche (obligatoire)
- description : description de la tâche (optionnel)
- status : état de la tâche (ex : pending, done)
- createdAt / updatedAt : dates de création et de dernière modification (automatiques)

## Structure du projet

```
todo-api/
├── src/
│   ├── routes/
│   │   └── tasks.js          # Routes CRUD des tâches
│   ├── models/
│   │   └── task.js           # Modèle et stockage des tâches
│   ├── middleware/
│   │   └── errorHandler.js   # Gestion centralisée des erreurs
│   └── app.js                # Configuration Express et démarrage du serveur
├── tests/                    # Tests (à développer)
│   ├── unit/
│   └── integration/
├── Dockerfile
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

## Gestion de projet (Agile / Scrum / Kanban)

Ce projet est réalisé en solo. La méthodologie retenue est le **Kanban**, bien adaptée au travail individuel grâce à sa simplicité et à sa gestion continue des tâches (pas de sprints figés).

### Outils

- Tableau Kanban via GitHub Projects
- Suivi des tâches et bugs via GitHub Issues
- Historique et versionnement via Git / GitHub

### Tableau Kanban

Le travail est organisé en colonnes :

| Colonne | Rôle |
|--------------|---------------------------------------------|
| Backlog | Toutes les fonctionnalités à faire |
| To Do | Tâches sélectionnées pour la période en cours |
| In Progress | Tâche en cours de réalisation |
| Done | Tâches terminées |

### User stories

- En tant qu'utilisateur, je veux créer une tâche afin de l'ajouter à ma liste.
- En tant qu'utilisateur, je veux lister mes tâches afin de voir ce que j'ai à faire.
- En tant qu'utilisateur, je veux consulter une tâche précise afin de voir son détail.
- En tant qu'utilisateur, je veux modifier une tâche afin de mettre à jour son état.
- En tant qu'utilisateur, je veux supprimer une tâche afin de retirer ce qui est terminé.

### Definition of Done

Une tâche est considérée comme terminée lorsque :

- la fonctionnalité est codée et fonctionne en local,
- elle fonctionne également dans le conteneur Docker,
- le code est commité et poussé sur GitHub.

## Auteur

DJEMAI Nassim