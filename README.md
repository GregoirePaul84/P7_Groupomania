## Groupomania ##

!!! Important !!!
Etant trop avancé lors de la mise à jour du projet le 26/05/2022, ce dernier correspond à l'ancienne version du 22/02/2022. 

Dernier projet de la formation Openclassrooms, qui consiste à créer un MVP d'un réseau social d'entreprise. Ceci est mon premier projet basé en partie sur React. Le fichier .sql se situe dans le dossier install du dossier backend.

**Pour une installation plus rapide, installer le projet via Docker**

## __Backend__
- MySQL, NodeJS

## __Frontend__
- ReactJS, Redux, VanillaJS, Sass

## __Variables d'environnement__
- le fichier .env a été volontairement retiré de .gitignore pour faciliter le lancement de l'application

## __Compte admin__
- Un compte admin est présent pour la modération des posts :

- > email : groupomania@gmail.com
- > mdp : Azerty1234


## Installation Docker ##
- Lancer Docker

- Ouvrir le terminal windows et se placer dans le répertoire racine du projet, qui contient le fichier "docker-compose.yml"

- Exécutez la commande suivante :

```
docker-compose up
```

- Lors de l'affichage "webpack compiled successfully", lancer "http://localhost:3001/register" dans le navigateur


## Installation classique ##

-Créer 2 terminaux renommés en "Front-end" et "Back-end"

*** Etape 1 ***

## __Mysql__

- lancer une version de mysql 5.7, au choix avec xampp ( de préférence sur localhost 3306 )
- créer une base de donnée nommée "groupomania"

## __Backend__

- si mot de passe de mysql différent de vide "", modifier le fichier .env situé à backend/configs
```
DB_PASSWORD=""
```

- Installer les dépendances puis lancer le Back-end
```
cd P7_Groupomania/Back-end
npm i
npm start
```

*** Etape 2 ***

## __Frontend__

- Installer node_modules dans le dossier Front-end.
```
cd P7_Groupomania/Front-end
npm i
npm start
```

![image Home](https://user-images.githubusercontent.com/90619952/179761722-94145a88-d3b1-45e2-8031-e0a5eadca0ab.jpg)




