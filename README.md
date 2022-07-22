## Groupomania ##

!!! Important !!!
Etant trop avancé lors de la mise à jour du projet le 26/05/2022, ce dernier correspond à l'ancienne version du 22/02/2022. 

Dernier projet de la formation Openclassrooms, qui consiste à créer un MVP d'un réseau social d'entreprise. Ceci est mon premier projet basé en partie sur React. Le fichier .sql se situe dans le dossier config du dossier backend.

**Pour éviter les erreurs de versions, installer le projet via Docker**

## __Backend__
- MySQL, NodeJS

## __Frontend__
- ReactJS, Redux, VanillaJS, Sass

## Installation Docker ##
- Lancer Docker

- Ouvrir le terminal windows et se placer dans le répertoire racine du projet, qui contient le fichier "docker-compose.yml"

- Exécutez la commande suivante :

```
docker-compose up
```

- Lors de l'affichage "webpack compiled successfully", lancer "http://localhost:3001/register" dans le navigateur

## __Variables d'environnement__
- le fichier .env a été volontairement retiré de .gitignore pour faciliter le lancement de l'application

## __Compte admin__
- Un compte admin est présent pour la modération des posts :

- > email : groupomania@gmail.com
- > mdp : Admin84000


## Installation classique ##

-Créer 2 terminaux renommés en "Front-end" et "Back-end"

/// Etape 1 ///

## __Backend__

- Installer node_modules dans le dossier Back-end.
```
cd back-end
npm i
```

## __Frontend__

- Installer node_modules dans le dossier Front-end.
```
cd front-end
npm i
```
/// Etape 2 ///

1. Lancer phpmyadmin
2. Dans le fichier .env qui se situe dans Back-end/config , indiquez :
```
DB_USER= votre nom d'utilisateur (root par défaut)
DB_PASS= votre mot de passe (vide par défaut)
```
3. Attribuer une "nouvelle base de données" interclassement utf8mb4_0900_ai_ci , attribuer le nom de "groupomania", cliquer sur "Créer"
4. Sélectionner la base de données puis cliquer sur "importer"
5. Cliquer sur "choisir un fichier" puis sélectionner le fichier .sql se trouvant dans le dossier "config" du dossier "Back-end"
6. Cliquer sur "Executer"


## Lancement ##

## __Backend__
- Lancer le projet (port 3000)
```
cd back-end
npm start
```

## __Frontend__
- Lancer le projet (port 3001)
```
cd front-end
npm start
```

![image Home](https://user-images.githubusercontent.com/90619952/179761722-94145a88-d3b1-45e2-8031-e0a5eadca0ab.jpg)



