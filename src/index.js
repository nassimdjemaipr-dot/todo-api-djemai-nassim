const express = require('express');
const app = express();

// Port via variable d'environnement, 3000 par défaut
// (3000 pour rester cohérent avec le Dockerfile : EXPOSE 3000 + -p 3000:3000)
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: "Bonjouuuur :)" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
