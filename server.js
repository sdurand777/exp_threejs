
const express = require('express');
const path = require('path');
const vite = require('vite');

const app = express();

// Démarrer Vite en mode développement
async function start() {
  const viteServer = await vite.createServer({
    server: { middlewareMode: 'html' }, // Utiliser le mode HTML de Vite pour servir les fichiers statiques
  });

  // Utiliser Vite comme middleware pour servir les fichiers
  app.use(viteServer.middlewares);

  // Dossier 'public' pour les fichiers statiques (images, styles.css, etc.)
  app.use(express.static(path.join(__dirname, 'public')));

  // Lancer le serveur Express
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

// Démarrer le serveur
start();
