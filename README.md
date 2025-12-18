# Mon Projet Express

## Description
Ceci est un projet Node.js utilisant Express et EJS pour créer un site web avec plusieurs pages, login/logout, téléchargement de fichiers et gestion des erreurs.

## Installation

1. Cloner le projet :
```bash
git clone https://github.com/ton-compte/ton-projet.git

```

2. Installer les dépendances :
```bash
npm install
```

3. Lancement :
```bash
npm run start
```

Le serveur sera accessible sur : http://localhost:8080

| URL            | Méthode  | Description                                             |
| -------------- | -------- | ------------------------------------------------------- |
| `/`            | GET      | Page d'accueil                                          |
| `/about`       | GET      | À propos                                                |
| `/contact`     | GET      | Contact                                                 |
| `/login`       | GET/POST | Connexion (login admin/admin)                           |
| `/logout`      | GET      | Déconnexion et suppression de session                   |
| `/download`    | GET      | Téléchargement d’un fichier texte avec la date actuelle |
| `/error`       | GET      | Page d’erreur volontaire                                |
| `/users/:id`   | GET      | Page de profil avec un id passer dans l'url             |
| `/dab`         | GET/POST | DAB fonctionnel / Calcul du nombre de billets           |
| `http://localhost:3000/api/messages/:room` | GET | API qui renvoie tous les messages d'une room           |
| Tout autre URL | GET      | Page 404 personnalisée                                  |


public/js/chat.js (écoute et envoie les requetes a la page ) -> chat.js (methode métier)