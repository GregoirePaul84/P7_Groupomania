const mySqlConnection = require('../config/db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})

// ********** Enregistrement d'un nouvel utilisateur ********** //

module.exports.register = async (req, res) => {
    
    try {

        // Création d'une variable "user" contenant les informations utilisateur obligatoires
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: passwordHash
        }

        console.log(user);

        // Envoi des données user dans la DB
        const addNewUser = 'INSERT INTO user SET ?';

        mySqlConnection.query( addNewUser, user, (error, results) => {
            
            if(error) {
                res.status(409).json({ error });
            }

            else {
                console.log('==>results');
                console.log(results);
                res.status(201).json({ message: "Utilisateur enregistré !" });
            }
        })
    }

    catch(error) {
        res.status(200).json({ error });
    }
};

// ********** Connexion d'un utilisateur existant ********** //

module.exports.login = async (req,res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        // Récupération de l'email et vérification de son existence dans la DB
        const findUserEmail = 'SELECT * FROM user WHERE email = ?';

        mySqlConnection.query( findUserEmail, [email], async (error, results) => {
            if (error) {

                console.log(error);
                res.status(200).json({ error });
            }
            
            if (results.length == 1) {

                // Récupération du password hashé de la base de données
                const hashedPassword = results[0].password;
                const comparePassword = await bcrypt.compare(password, hashedPassword);

                if (comparePassword) {
                    console.log("===> Connexion réussie")
                    res.status(200).json({
                        message:`${results[0].first_name} est connecté!`, 
                        userId: results[0].user_id,
                        token: jwt.sign(
                          { userId: results[0].user_id },
                          process.env.TOKEN_SECRET,
                          { expiresIn: process.env.TOKEN_EXPIRES }
                        ),
                    })
                } 
                else {
                    console.log("===> Mot de passe incorrect")
                    res.status(403).json("Mot de passe incorrect!")
                }
            }
            
            else {
                res.status(404).json({ message: 'Utilisateur non trouvé!' });
            }         
            
        })
    }
    catch {
        res.status(200).json({ error });
    }
};


// ********** Déconnexion d'un utilisateur ********** //

module.exports.logout = (req,res) => {

    res.clearCookie('jwt');
    res.status(200).json({ message: "Utilisateur déconnecté !"});
};