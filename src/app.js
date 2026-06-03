const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const { initDb } = require('./db');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
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
