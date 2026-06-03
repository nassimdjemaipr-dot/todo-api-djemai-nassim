# TODO API - DJEMAI Nassim

API REST de gestion de tâches (CRUD), développée avec Node.js / Express et PostgreSQL, conteneurisée avec Docker Compose.

## Stack technique

Node.js · Express · PostgreSQL · Docker / Docker Compose · Jest

## Lancer le projet

```bash
git clone https://github.com/nassimdjemaipr-dot/todo-api-djemai-nassim.git
cd todo-api-djemai-nassim
docker compose up -d --build
```

- API accessible sur http://localhost:3000
- Arrêter : `docker compose down` (les données sont conservées grâce au volume)

## Endpoints

| Méthode | Endpoint | Description |
|---------|----------------|------------------------|
| GET | /health | État de l'API |
| GET | /api/tasks | Lister les tâches |
| GET | /api/tasks/:id | Récupérer une tâche |
| POST | /api/tasks | Créer une tâche |
| PUT | /api/tasks/:id | Modifier une tâche |
| DELETE | /api/tasks/:id | Supprimer une tâche |

Modèle d'une tâche : `{ id, title, description, status, createdAt, updatedAt }`

## Tests

```bash
docker compose up -d db
npm test
```

## Persistance et volumes

Les données sont stockées dans PostgreSQL et persistées via le volume Docker `postgres-data` : elles survivent à un `docker compose down` puis `up`.

Démonstration d'un volume partagé entre plusieurs conteneurs (les données survivent même après suppression des conteneurs) :

```text
# 1. Creer le volume partage
docker volume create todo-logs

# 2. Conteneur qui ECRIT dans le volume
docker run -it --name todo-writer -v todo-logs:/data node:22-alpine sh
/data # echo "mon premier log" > first_log.log
/data # echo "mon second log" > second_log.log

# 3. Conteneur qui LIT le volume (donnees ecrites par l'autre conteneur)
docker run -it --name todo-reader -v todo-logs:/data node:22-alpine sh
/data # cat first_log.log
mon premier log

# 4. Supprimer les deux conteneurs
docker rm todo-writer todo-reader

# 5. Nouveau conteneur : les logs sont TOUJOURS la (persistance du volume)
docker run -it --name todo-reader -v todo-logs:/data node:22-alpine sh
/data # cat first_log.log
mon premier log


```
<img width="1558" height="890" alt="image" src="https://github.com/user-attachments/assets/97ea79eb-0db9-43fd-9595-cd1d6d7bf8f1" />

## Gestion de projet (Agile / Kanban)

- Projet réalisé en **solo**, en méthode **Kanban** (GitHub Projects + Issues)
- Workflow Git : une **branche** + une **Pull Request** par fonctionnalité (pas de commit direct sur `master`)
- Colonnes du tableau : Backlog → To Do → In Progress → Done
- User stories : créer, lister, consulter, modifier et supprimer une tâche

## Auteur

DJEMAI Nassim
