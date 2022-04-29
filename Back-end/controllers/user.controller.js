const mySqlConnection = require('../config/db');

// ********** Récupération d'un utilisateur via son ID ********** //

module.exports.readOneUser = (req, res) => {
    
    try {
        // Stockage de l'id des paramètres de l'URL
        const userId = req.params.id;
        const sqlGetId = `SELECT * FROM user WHERE id = ${userId}`; 

        mySqlConnection.query(sqlGetId, (error, results) => {
            
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

// ********** Modification d'un utilisateur via son ID ********** //


module.exports.updateUser = (req, res) => {
    
    try {
        console.log(req.file);
        const updatedata = `UPDATE user SET first_name= ?, last_name= ?, date_naissance= ?, profil_pic= ?, bio= ? WHERE id= ?`;
        const bodyInfos = [req.body.first_name, req.body.last_name, req.body.date_naissance, req.body.profil_pic, req.body.bio, req.params.id];

        mySqlConnection.query(updatedata, bodyInfos, function (error, results) {
            if (!error) {
                res.status(200).json( {message: "Utilisateur modifié !"} );
            }
            else {
                res.status(500).json( {message: error} );
            }
        });

        
    }

    catch (error) {
        res.status(500).json( {message: error} );
    }

}

// module.exports.deleteUser = (req, res) => {
//     res.status(200);

// }
