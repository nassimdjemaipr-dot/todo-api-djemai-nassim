const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

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

// Demarrage du serveur (uniquement si app.js est lance directement,
// pas quand il est importe par les tests)
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
  });
}

module.exports = app;
