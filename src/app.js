const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const { initDb } = require('./db');
const { client, httpRequests } = require('./monitoring');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Middleware monitoring : on incremente le compteur a chaque requete terminee
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequests.inc({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Endpoint /metrics : expose les metriques au format Prometheus (scrape par Prometheus)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

// Demarrage du serveur (uniquement si app.js est lance directement)
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  initDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Serveur demarre sur le port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Erreur d initialisation de la base de donnees :', err);
      process.exit(1);
    });
}

module.exports = app;
