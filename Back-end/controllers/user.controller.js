const mySqlConnection = require('../config/db');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})


// ********** Récupération d'un utilisateur ********** //

module.exports.readOneUser = (req, res) => {
    
    try {
        // Stockage de l'id des paramètres de l'URL
        const userId = req.params.id;
        const sqlGetUser = `SELECT * FROM user WHERE user_id = ${userId}`; 

        mySqlConnection.query(sqlGetUser, (error, results) => {
            
            if (results.length == 1) {
                res.status(200).json( {message: "Utilisateur récupéré"});
            }

            else {
                res.status(404).json( {message: "Utilisateur introuvable"} )
            } 
        });
    }
    catch (error) {
        res.status(500).json( {error});
    }
}


// ********** Modification d'un utilisateur ********** //

module.exports.updateUser = (req, res) => {
    
    // Si l'utilisateur souhaite changer sa photo de profil
    if (req.file) {
        console.log(req.file);
        const image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const imageUserArray = [image_url, req.params.id, req.params.id];
        const sqlInsertProfilPic = `UPDATE profil_image SET image_url= ?, user_id= ? WHERE user_id= ?`;

        mySqlConnection.query(sqlInsertProfilPic, imageUserArray, (error, results) => {
            if (error) {
                res.status(500).json( {message: "Problème d'envoi de fichier"} );;
            }
            else {
                
                console.log("===> Photo modifiée");
                if (req.body.first_name === undefined && req.body.first_name === undefined && req.body.bio === undefined && req.body.bio === undefined && req.body.date_naissance === undefined) {
                    res.status(200).json( {message: "Photo de profil modifiée !"} );
                }     
            }
        });
    }

    // Si l'utilisateur ne change que ses données personnelles
    if (req.body.first_name || req.body.last_name || req.body.date_naissance || req.body.bio) {
        const SqlUpdateUser = `UPDATE user SET first_name= ?, last_name= ?, date_naissance= ?, profil_pic= ?, bio= ? WHERE user_id= ?`;
        const bodyInfos = [req.body.first_name, req.body.last_name, req.body.date_naissance, req.body.profil_pic, req.body.bio, req.params.id];

        mySqlConnection.query(SqlUpdateUser, bodyInfos, function (error, results) {
            if (!error) {
                res.status(200).json( {message: "Utilisateur modifié !"} );
            }
            else {
                res.status(500).json( {error} );
            }
        });
    }
    
    
}

// ********** Suppression d'un utilisateur de la DB ********** //


module.exports.deleteUser = (req, res) => {

    try {
        const sqlDeleteUser = `DELETE FROM user WHERE user_id = ?`; 
        console.log(req.params.id);

        mySqlConnection.query(sqlDeleteUser, req.params.id, (error, results) => {
            if (!error) {
                res.status(200).json( {message: 'Utilisateur supprimé!' });
            }
            else {
                res.status(500).json( {error} );
            }

        });
    }
    catch {
        res.status(200).json( { error });
    }
}


// ********** Envoi d'une photo de profil au serveur ********** //

module.exports.postPicUser = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        const image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const imageUserArray = [image_url, userId]
        const sqlInsertProfilPic = `INSERT INTO profil_image (image_url, user_id) VALUES (?, ?)`;

        mySqlConnection.query(sqlInsertProfilPic, imageUserArray, (error, results) => {
            if (!error) {
                res.status(201).json( {message: "Image de profil envoyée !"});
            }
            else {
                res.status(500).json( {error} );
            }
        });
    }

    catch (error) {
        res.status(500).json( {error});
    }
};
