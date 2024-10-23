# NDLivre 📚

**NDLivre** est une application web qui vous permet de partager votre bibliothèque de livres avec vos amis. Vos amis peuvent consulter les livres que vous possédez et vous envoyer une demande pour les emprunter. Simple et efficace, **NDLivre** transforme la gestion de vos prêts de livres en une expérience fluide et intuitive.

## Fonctionnalités Principales

- 📚 **Partage de Bibliothèque** : Affichez vos livres et partagez-les facilement avec vos amis.
- 📖 **Demande de Prêt** : Vos amis peuvent envoyer des demandes pour emprunter des livres.
- 🔄 **Suivi des Prêts** : Gardez une trace des livres prêtés et des demandes en attente.
- 📬 **Notifications** : Recevez des notifications lorsque quelqu’un demande un livre ou rend un livre.

## Prérequis

Back: Express
Mobile: Nativescript
Web: Angular
Windows/Linux/Mac : Electron

Assurez-vous d’avoir les éléments suivants installés :

- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/) 
- [Angular CLI](https://angular.io/cli)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/Guyane123/NDLivre.git
   ```

2. Installez les dépendances pour le **back-end** (Express/MongoDB) :

   ```bash
   cd NDLivre/backend
   npm install
   ```

3. Installez les dépendances pour le **front-end** (Angular) :

   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

1. Créez un fichier `.env` dans le répertoire `backend` pour y ajouter vos variables d'environnement (comme la connexion à MongoDB).

   Exemple de configuration `.env` :

   ```env
   ATLAS_URI=mongodb+srv://<username>:<mdp>.mongodb.net/
   PORT=3000
   ```

2. Dans le répertoire `frontend`, assurez-vous que le fichier `environment.ts` contient la bonne URL pour communiquer avec le back-end.

## Lancer l'Application

### Back-end (Express)

1. Dans le dossier `backend`, lancez le serveur :

   ```bash
   npm run start
   ```

2. Le serveur Express sera accessible à l'adresse `http://localhost:3000`.

### Front-end (Angular)

1. Dans le dossier `frontend`, lancez l'application Angular :

   ```bash
   npm run start
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:4200` pour utiliser l’application.

## Contribution 🤝

Nous accueillons volontiers les contributions de la communauté pour améliorer **NDLivre**. N’hésitez pas à soumettre des pull requests ou à signaler des problèmes.

## Licence 📜

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le distribuer sous les termes de la licence.

---

**NDLivre** facilite le partage de vos livres avec vos amis tout en vous permettant de garder une trace de vos prêts. Simplifiez la gestion de votre bibliothèque avec **NDLivre** !
