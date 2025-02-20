# 🏗️ Cryptopoly – Documentation

Bienvenue dans **Cryptopoly**, un projet combinant **Hardhat** pour les smart contracts et un **frontend** en **React** pour une Marketplace Immobilière 🚀

---

## 📁 Structure du Projet

```bash
📦 Cryptopoly
 ┣ 📂 hardhat/              # Dossier des smart contracts (Solidity)
 ┃ ┣ 📂 contracts/          # Contient les smart contracts
 ┃ ┣ 📂 scripts/            # Scripts pour déployer et interagir avec la blockchain
 ┃ ┣ 📂 task/               # Tâches personnalisées pour Hardhat
 ┃ ┣ 📂 test/               # Tests unitaires avec Hardhat & Chai
 ┃ ┣ 📜 hardhat.config.js   # Configuration de Hardhat
 ┃ ┗ 📜 package.json        # Dépendances et commandes npm
 ┃
 ┣ 📂 cryptopoly-frontend/  # Dossier du frontend (React)
 ┃ ┣ 📂 public/             # Fichiers statiques (icônes, images, etc.)
 ┃ ┣ 📂 src/                # Code source React
 ┃ ┃ ┣ 📂 assets/           # Ressources statiques (images, styles, etc.)
 ┃ ┃ ┣ 📂 components/       # Composants React réutilisables
 ┃ ┃ ┣ 📂 context/          # Gestion du contexte walletContext
 ┃ ┃ ┣ 📂 contracts/        # Interactions avec les smart contracts
 ┃ ┃ ┣ 📂 data/             # Gestion des données et états
 ┃ ┃ ┣ 📂 pages/            # Pages principales de l'application
 ┃ ┃ ┣ 📂 utils/            # Fonctions utilitaires (Pinata)
 ┃ ┃ ┣ 📜 App.jsx           # Composant principal de l'application
 ┃ ┃ ┗ 📜 index.css         # Styles globaux
 ┃ ┣ 📜 .env.local          # Variables d'environnement locales
 ┃ ┣ 📜 package.json        # Dépendances et commandes npm
 ┃ ┗ 📜 vite.config.js      # Configuration Vite
 ┗ 📜 README.md             # Ce fichier 📖
```

## Liens vers les README des dossiers

- [Lire le README de Hardhat](./hardhat/README.md)
- [Lire le README du Frontend](./cryptopoly/README.md)
