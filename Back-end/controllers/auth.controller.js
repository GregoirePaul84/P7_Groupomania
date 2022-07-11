const mySqlConnection = require('../config/db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})

// ********** Enregistrement d'un nouvel utilisateur ********** //

module.exports.register = async (req, res) => {
    
    try {
        
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const regExName = new RegExp("^[A-Za-z. 'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ-]{2,20}$");
        const regExEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$|^$");
        const testFirstName = regExName.test(firstName);
        const testLastName = regExName.test(lastName);
        const testEmail = regExEmail.test(email);
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        // Création d'une variable "user" contenant les informations utilisateur obligatoires
        const user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: passwordHash,
            profil_pic: 'http://localhost:3000/images/empty_profil_pic.png'
        }

        if (testFirstName === false) {
            res.status(400).json( {wrong_first_name: "Prénom incorrect"} );
            return;
        }
        if (testLastName === false) {
            res.status(400).json( {wrong_last_name: "Nom non conforme"} );
            return;
        }
        if (testEmail === false) {
            res.status(400).json( {wrong_email: "Email incorrect"} );
            return;
        }

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
        res.status(500).json({ error });
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
            
            if (email && password === '') {
                res.status(200).json({ empty_password: "Merci d'indiquer votre mot de passe" });
                return;
            }

            if (password && email === '') {
                res.status(200).json({ empty_email: "Merci d'indiquer votre email" });
                return;
            }
            
            if (email && password) {
                console.log(results);
                // Récupération du password hashé de la base de données
                const hashedPassword = results[0].password;
                const comparePassword = await bcrypt.compare(password, hashedPassword);

                if (comparePassword) {
                    console.log("===> Connexion réussie")

                    const token = jwt.sign(
                        { userId: results[0].user_id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: process.env.TOKEN_EXPIRES }
                    );
                    
                    res.cookie("jwt", token);

                    res.status(200).json({
                        message:`${results[0].first_name} est connecté!`, 
                        userId: results[0].user_id,
                        token: token
                    })
                } 
                else {
                    console.log("===> Mot de passe incorrect")
                    res.status(403).json( {wrong_password: 'Mot de passe incorrect !'} )
                }
            }
            
            else {
                console.log(req.body);
                res.status(404).json( { error } );
            }         
            
        })
    }
    catch {
        res.status(500).json({ error });
    }
};


// ********** Déconnexion d'un utilisateur ********** //

module.exports.logout = (req,res) => {

    try {
        console.log('Utilisateur déconnecté !');
        res.clearCookie('jwt');
        res.status(200).json({ message: "Utilisateur déconnecté !"});
    }
    catch (error) {
        res.status(500).json({ error });
    } 
};


