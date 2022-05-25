const mySqlConnection = require('../config/db');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})


// ********** Récupération d'un utilisateur ********** //

module.exports.readOneUser = (req, res) => {
    
    const sqlGetUser = `SELECT * FROM user WHERE user_id = ?`; 

    mySqlConnection.query(sqlGetUser, req.params.id, (error, results) => {
        
        if (results.length == 1) {
            res.status(200).json( {message: "Utilisateur récupéré !", results});
        }

        else {
            res.status(404).json( {message: "Utilisateur introuvable"} )
        } 
    });
}


// ********** Modification d'un utilisateur ********** //

module.exports.updateUser = (req, res) => {
    
    // Si l'utilisateur souhaite changer sa photo de profil
    if (req.file) {
        const image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const imageUserArray = [image_url, req.params.id, req.params.id];
        const sqlUpdateProfilPic = `UPDATE profil_image SET image_url= ?, user_id= ? WHERE user_id= ?`;
        const sqlUpdateUserProfilPic = `UPDATE user SET profil_pic= ? WHERE user_id= ?`;

        // Mise à jour de la table profil_image
        mySqlConnection.query(sqlUpdateProfilPic, imageUserArray, (error, results) => {
            if (error) {
                res.status(500).json( {error} );;
            }
            else {
                // Mise à jour de la colonne profil_pic de la table user
                mySqlConnection.query(sqlUpdateUserProfilPic, [image_url, req.params.id], (error, results) => {
                    if (error) {
                        res.status(500).json( {error} );;
                    }
                    // Si aucune modification d'informations utilisateur, on renvoie un status 200
                    else if (req.body.first_name === undefined && req.body.last_name === undefined && req.body.bio === undefined && req.body.date_naissance === undefined){
                        console.log("===> Photo modifiée");
                        res.status(200).json( {message: "Photo de profil modifiée !"} );
                    }
                });
            }
        });
    }

    // Si l'utilisateur ne change que ses données personnelles
    if (req.body.first_name || req.body.last_name || req.body.date_naissance || req.body.bio) {
        const SqlUpdateUser = `UPDATE user SET first_name= ?, last_name= ?, date_naissance= ?, bio= ? WHERE user_id= ?`;
        const bodyInfos = [req.body.first_name, req.body.last_name, req.body.date_naissance, req.body.bio, req.params.id];

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
    
    const sqlDeleteUser = `DELETE FROM user WHERE user_id = ?`;
    const sqlDeleteProfilImage = `DELETE FROM profil_image WHERE user_id = ?`;

    // Suppression de l'utilisateur de la table user
    mySqlConnection.query(sqlDeleteUser, req.params.id, (error, results) => {
        if (error) {
            res.status(500).json( {error} );    
        }
        else {
            // Suppression de la photo de profil liée à l'utilisateur
            mySqlConnection.query(sqlDeleteProfilImage, req.params.id, (error, results) => {
                if(error) {
                    res.status(500).json( {error} ); 
                }
                else {
                    res.status(200).json( {message: 'Utilisateur supprimé!' });
                }
            });
        }
    });
}

// ********** Récupérer une photo de profil ********** //

module.exports.readProfilImage = (req, res) => {
    const sqlGetUser = `SELECT profil_pic FROM user WHERE user_id = ?`;

    mySqlConnection.query(sqlGetUser, req.params.id, (error, results) => {
        if (error) {
            res.status(500).json( {error} ); 
        }
        else {
            res.status(200).json({results});
        }
    });
}


// ********** Envoi d'une photo de profil au serveur ********** //

module.exports.postPicUser = (req, res) => {
    
    const token = req.headers.cookie.split('jwt=')[1];
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
};
