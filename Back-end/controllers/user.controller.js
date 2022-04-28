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
        res.status(200).json( {error});
    }

}

// ********** Modification d'un utilisateur via son ID ********** //


module.exports.updateUser = (req, res) => {
    res.status(200);

}

// module.exports.deleteUser = (req, res) => {
//     res.status(200);

// }
