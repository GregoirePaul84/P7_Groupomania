const mySqlConnection = require('../config/db');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


require('dotenv').config({path: './config/.env'})

// ********** Récupération de tous les utilisateurs ********** //

module.exports.readAllUsers = (req, res) => {
    
    const sqlGetAllUsers = `SELECT * FROM user`; 

    mySqlConnection.query(sqlGetAllUsers, (error, results) => {
        
        if (results) {
            res.status(200).json( {message: "Utilisateurs récupérés !", results});
        }

        else {
            res.status(404).json( {error} )
        } 
    });
}


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
        const userId = req.user().userId;
        const imageUserArray = [image_url, req.params.id, req.params.id, userId];
        const sqlUpdateProfilPic = `UPDATE profil_image SET image_url= ?, user_id= ? WHERE user_id= ? AND user_id= ?`;
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
    if (req.body.first_name || req.body.last_name || req.body.date_naissance || req.body.bio || req.body.adresse || req.body.tel) {
        const userId = req.user().userId;
        const SqlUpdateUser = `UPDATE user SET first_name= ?, last_name= ?, date_naissance= ?, bio= ?, adresse= ?, tel= ? WHERE user_id= ? AND user_id= ?`;
        const bodyInfos = [req.body.first_name, req.body.last_name, req.body.date_naissance, req.body.bio, req.body.adresse, req.body.tel, req.params.id, userId];

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
    const userId = req.user().userId;
    const idArray = [req.params.id, userId]
    const sqlDeleteUser = `DELETE FROM user WHERE user_id = ? AND user_id = ?`;
    const sqlDeleteProfilImage = `DELETE FROM profil_image WHERE user_id = ? AND user_id = ?`;

    // Suppression de l'utilisateur de la table user
    mySqlConnection.query(sqlDeleteUser, idArray, (error, results) => {
        if (error) {
            res.status(500).json( {error} );    
        }
        else {
            // Suppression de la photo de profil liée à l'utilisateur
            mySqlConnection.query(sqlDeleteProfilImage, idArray, (error, results) => {
                if(error) {
                    res.status(500).json( {error} ); 
                }
                else {
                    res.clearCookie('jwt');
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


// ********** Changer le mot de passe ********** //

module.exports.changePassword = async (req, res) => {
    const userId = req.user().userId;
    const sqlChangePassword = `UPDATE user SET password= ? WHERE user_id= ? AND user_id= ?`;
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    mySqlConnection.query(sqlChangePassword, [passwordHash, req.params.id, userId], (error, results) => {
        if (error) {
            res.status(500).json( {error} ); 
        }
        else {
            res.status(200).json({message: "Mot de passe modifié !"});
        }
    });
}


// ********** Récupération de tous les likes d'un utilisateur********** //

module.exports.readAllLikes = (req, res) => {
    
    const sqlGetAllLikes = `SELECT * FROM likes`;

    mySqlConnection.query(sqlGetAllLikes, (error, results) => {
        
        if (results) {
            res.status(200).json( {message: "Likes récupérés !", results});
        }

        else {
            res.status(500).json( {error} )
        } 
    });
}

// ********** Récupération de tous les likes d'un utilisateur********** //

module.exports.readAllDislikes = (req, res) => {
    
    const sqlGetAllDislikes = `SELECT * FROM dislikes`;

    mySqlConnection.query(sqlGetAllDislikes, (error, results) => {
        
        if (results) {
            res.status(200).json( {message: "Dislikes récupérés !", results});
        }

        else {
            res.status(500).json( {error} )
        } 
    });
}

// ********** Récupération de toutes les images ********** //

module.exports.readAllPictures = (req, res) => {
    
    const sqlGetAllPics = `SELECT * FROM post_image`; 

    mySqlConnection.query(sqlGetAllPics, (error, results) => {
        
        if (results) {
            res.status(200).json( {results} );
        }

        else {
            res.status(404).json( {error} )
        } 
    });
}