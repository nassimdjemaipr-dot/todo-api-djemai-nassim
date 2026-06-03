# TODO API - DJEMAI Nassim

API REST de gestion de tâches (Todo) développée avec Node.js / Express, persistée dans PostgreSQL, conteneurisée avec Docker (Docker Compose) et préparée pour la CI/CD.

## Présentation du projet

Cette API permet de gérer des tâches (Tasks) via une API REST : créer, lister, consulter, modifier et supprimer des tâches (opérations CRUD). Les données sont stockées dans une base de données PostgreSQL, et persistent grâce à un volume Docker.

## Stack technique

- Node.js + Express (API)
- PostgreSQL (base de données)
- pg (client PostgreSQL) + dotenv (variables d'environnement)
- Helmet + CORS (sécurité)
- Docker + Docker Compose (conteneurisation)
- Jest + Supertest (tests)

## Prérequis

- Docker + Docker Compose (recommandé)
- (Optionnel, pour le dev sans Docker) Node.js 18+ et un PostgreSQL accessible

## Installation et lancement

### Cloner le projet

```bash
git clone https://github.com/nassimdjemaipr-dot/todo-api-djemai-nassim.git
cd todo-api-djemai-nassim
```

### Avec Docker Compose (recommandé)

Lance l'API et la base PostgreSQL en une commande :

```bash
docker compose up -d --build
```

L'application est accessible sur http://localhost:3000

Pour tout arrêter :

```bash
docker compose down
```

(Le volume `postgres-data` conserve les données entre les redémarrages. Pour tout supprimer, y compris les données : `docker compose down -v`.)

### Avec Node.js (dev local)

Nécessite un PostgreSQL accessible (par exemple `docker compose up -d db`) :

```bash
npm install
npm start
```

## Variables d'environnement

La configuration se fait via des variables d'environnement (voir `.env.example`) :

| Variable | Description | Valeur par défaut |
|-------------|------------------------------|-------------|
| PORT | Port de l'API | 3000 |
| DB_HOST | Hôte PostgreSQL | localhost |
| DB_PORT | Port PostgreSQL | 5432 |
| DB_NAME | Nom de la base | todo_db |
| DB_USER | Utilisateur | todo_user |
| DB_PASSWORD | Mot de passe | todo_pass |

En Docker Compose, ces variables sont définies dans le `docker-compose.yml`.

## Endpoints de l'API

| Méthode | Endpoint | Description |
|---------|------------------|------------------------------|
| GET | /health | Vérifier l'état de l'API |
| GET | /api/tasks | Lister toutes les tâches |
| GET | /api/tasks/:id | Récupérer une tâche par son id |
| POST | /api/tasks | Créer une tâche |
| PUT | /api/tasks/:id | Modifier une tâche |
| DELETE | /api/tasks/:id | Supprimer une tâche |

### Exemple avec curl

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Faire les courses","description":"lait, pain","status":"pending"}'
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

## Tests

Les tests (Jest + Supertest) nécessitent une base PostgreSQL accessible. Lance d'abord la base, puis les tests :

```bash
docker compose up -d db
npm test
```

## Structure du projet

```
todo-api/
├── src/
│   ├── routes/
│   │   └── tasks.js          # Routes CRUD des tâches
│   ├── models/
│   │   └── task.js           # Modèle (requêtes SQL)
│   ├── middleware/
│   │   └── errorHandler.js   # Gestion centralisée des erreurs
│   ├── db/
│   │   └── index.js          # Connexion PostgreSQL + init de la table
│   └── app.js                # Configuration Express et démarrage
├── tests/
│   ├── unit/
│   │   └── task.test.js
│   └── integration/
│       └── api.test.js
├── Dockerfile
├── .dockerignore
├── .gitignore
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

## Gestion de projet (Agile / Scrum / Kanban)

Ce projet est réalisé en solo. La méthodologie retenue est le Kanban, bien adaptée au travail individuel grâce à sa simplicité et à sa gestion continue des tâches.

### Outils

- Tableau Kanban via GitHub Projects
- Suivi des tâches et bugs via GitHub Issues
- Workflow Git : une branche + une Pull Request par fonctionnalité (pas de commit direct sur master)

### Tableau Kanban

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
- elle fonctionne dans les conteneurs Docker,
- les tests passent,
- le code est commité et poussé sur GitHub via une Pull Request.

## Auteur

DJEMAI Nassim
