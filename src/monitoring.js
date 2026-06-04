const client = require('prom-client');

// Collecte automatique des metriques par defaut (CPU, memoire, event loop...)
client.collectDefaultMetrics();

// Compteur custom : nombre total de requetes HTTP, ventile par methode/route/status
const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requetes HTTP recues',
  labelNames: ['method', 'route', 'status'],
});

module.exports = { client, httpRequests };