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

| URL | Méthode | Description |
|-----|--------|-------------|
| `/` | GET | Page d’accueil |
| `/about` | GET | Page À propos |
| `/contact` | GET | Page Contact |
| `/login` | GET / POST | Connexion (admin / admin) |
| `/logout` | GET | Déconnexion et suppression de la session |
| `/download` | GET | Téléchargement d’un fichier texte avec la date actuelle |
| `/error` | GET | Page d’erreur volontaire |
| `/users/:id` | GET | Page de profil utilisateur (id passé dans l’URL) |
| `/dab` | GET / POST | DAB – Calcul du nombre de billets |
| Toute autre URL | GET | Page 404 personnalisée |
| `/tp-api/api/messages/:room` | GET | Récupère tous les messages d’une room |
| `/tp-api/api/messages` | GET | Récupère tous les messages |
| `/tp-api/api/users` | GET | Récupère tous les utilisateurs |
| `/tp-api/api/users/:id` | GET | Récupère un utilisateur par ID |
| `/tp-api/api/courses` | GET | Récupère tous les cours |
| `/tp-api/api/categories` | GET | Récupère toutes les catégories |
| `/tp-api/api/reviews` | GET | Récupère tous les avis |
| `/tp-api/api/enrollments` | GET | Récupère toutes les inscriptions |
| `/tp-api/api/chapters` | GET | Récupère tous les chapitres |
| `/tp-api/api/certificates` | GET | Récupère tous les certificats |
| `/tp-api/api/course-categories` | GET | Récupère les relations cours / catégories |
| `/tp-api/auth/google` | GET | Connexion a Google OpenID |
| `/tp-api/auth/google/callback` | GET | Callback venant de Google |
| `/tp-api//profile` | GET | Recupère les informations du profile du compte google connecter |






public/js/chat.js (écoute et envoie les requetes a la page ) -> chat.js (methode métier)