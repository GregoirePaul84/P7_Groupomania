const mySqlConnection = require('../config/db');
const fs = require('fs');


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
    catch {
        res.status(500).json( {error});
    }
}

module.exports.postPicUser = (req, res) => {
    if(req.file) {
        console.log(req.file);
        res.status(201).json( {message: "Fichier envoyé"});
    }
    else {
        console.log(req.file);
        res.status(500).json( {message: "Erreur"} );
    }
};


// ********** Modification d'un utilisateur ********** //

module.exports.updateUser = (req, res) => {
    
    try {

        console.log(req.file);

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

    catch (error) {
        res.status(500).json( {message: error} );
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
