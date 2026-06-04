# Procédure de déploiement — Todo API (Kubernetes)

## 1. Prérequis
- Un cluster Kubernetes local : **Docker Desktop** (Kubernetes activé), **K3s** ou **minikube**
- **kubectl** installé et configuré (`kubectl get nodes` doit afficher un nœud `Ready`)
- **Git**
- L'image est publique sur DockerHub : `nassimdjemai/todo-api:latest` (rien à builder)

## 2. Déploiement
```bash
git clone https://github.com/nassimdjemaipr-dot/todo-api-djemai-nassim.git
cd todo-api-djemai-nassim
kubectl apply -f k8s/
```
Cela crée : le Secret (identifiants BD), PostgreSQL (Deployment + Service + volume),
la Todo API (Deployment 2 replicas) et son Service (NodePort).

## 3. Vérification
```bash
kubectl get pods         # tous les pods doivent être en Running
kubectl get services     # todo-api-service expose le port 30080
curl http://localhost:30080/health        # doit répondre {"status":"ok"}
curl http://localhost:30080/api/tasks      # liste des tâches (tableau JSON)
```
> Note : au tout premier démarrage, un pod `todo-api` peut redémarrer 1 fois
> (le temps que PostgreSQL soit prêt). Kubernetes le relance automatiquement.

## 4. Mise à jour sans coupure (rolling update)
```bash
kubectl rollout restart deployment/todo-api
kubectl rollout status deployment/todo-api   # attendre "successfully rolled out"
```

## 5. Rollback (revenir à la version précédente)
```bash
kubectl rollout undo deployment/todo-api
kubectl rollout status deployment/todo-api   # attendre "successfully rolled out"
kubectl get pods                             # tous Running
curl http://localhost:30080/health           # doit répondre {"status":"ok"}
```

## 6. Scaling (ajuster le nombre de copies)
```bash
kubectl scale deployment todo-api --replicas=4
kubectl get pods         # 4 pods todo-api
```

## 7. Tout supprimer
```bash
kubectl delete -f k8s/
```

## 8. Contacts
- Auteur : DJEMAI Nassim
