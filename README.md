## Groupomania ##

!!! Important !!!
Etant trop avancé lors de la mise à jour du projet le 26/05/2022, ce dernier correspond à l'ancienne version du 22/02/2022. 

Dernier projet de la formation Openclassrooms, qui consiste à créer un MVP d'un réseau social d'entreprise. Ceci est mon premier projet basé en partie sur React. Le fichier .sql se situe dans le dossier config du dossier backend.

*** Back-end ***
- MySQL, NodeJS

*** Front-end ***
- ReactJS, Redux, VanillaJS, Sass

## Installation ##

-Créer 2 terminaux renommés en "Front-end" et "Back-end"

/// Etape 1 ///

*** Back-end ***

- Installer node_modules dans le dossier Back-end.
`==> cd back-end`
`==> npm i`

*** Front-end ***

- Installer node_modules dans le dossier Front-end.
`==> cd front-end`
`==> npm i`

/// Etape 2 ///

1) Lancer phpmyadmin
2) Dans le fichier .env qui se situe dans Back-end/config , indiquez :
    DB_USER= votre nom d'utilisateur (root par défaut)
    DB_PASS= votre mot de passe (vide par défaut)
3) Attribuer une "nouvelle base de données" interclassement utf8mb4_0900_ai_ci , attribuer le nom de "groupomania", cliquer sur "Créer"
4) Sélectionner la base de données puis cliquer sur "importer"
5) Cliquer sur "choisir un fichier" puis sélectionner le fichier .sql se trouvant dans le dossier "config" du dossier "Back-end"
6) Cliquer sur "Executer"


## Lancement ##

*** Back-end ***
- Lancer le projet (port 3000)
`==> cd back-end`
`==> npm start`

*** Front-end ***
- Lancer le projet (port 3001)
`==> cd front-end`
`==> npm start`

*** Variables d'environnement ***
le fichier .env a été volontairement retiré de .gitignore pour faciliter le lancement de l'application

![image Home](https://user-images.githubusercontent.com/90619952/179761722-94145a88-d3b1-45e2-8031-e0a5eadca0ab.jpg)

