// Middleware de gestion centralisee des erreurs
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Erreur interne du serveur',
  });
}

module.exports = errorHandler;
