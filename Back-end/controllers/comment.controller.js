const mySqlConnection = require('../config/db');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})

// ********** Récupération de tous les commentaires d'un post ********** //

module.exports.readAllComments = (req, res) => {
    
    const postId = req.params.id;
    
    const sqlGetAllComments = `SELECT * FROM comments WHERE post_id = ?`;
    mySqlConnection.query( sqlGetAllComments, postId, (error, results) => {
        if (!error) {
            res.status(200).json( {results} )
        }
        else {
            res.status(500).json( {error} )
        }
    });
}

// ********** Récupération d'un commentaire ********** //

// module.exports.readOneComment = (req, res) => {
    
//     const commentId = req.params.id;
//     const sqlGetOneComment = `SELECT * FROM comments WHERE comment_id = ?`;

//     mySqlConnection.query( sqlGetOneComment, commentId, (error, results) => {
//         if (error) {
//             res.status(500).json( {error} )
//         }
//         else {
//             res.status(200).json( {results} )
//         }
//     });
// }

// ********** Création d'un commentaire sous un post ********** //

module.exports.createComment = (req, res) => {
    
    // Récupération de l'ID du token
    const token = req.headers.cookie.split('jwt=')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const commentBody = [req.body.post_id, userId];

    // Insertion du commentaire dans la DB
    const sqlCreateComment = `INSERT INTO comments(post_id, user_id) VALUES (?, ?)`;

    mySqlConnection.query(sqlCreateComment, commentBody, (error, results) => {
        if (error) {
            res.status(500).json( {error} );
        }
        else {
            console.log("===> Commentaire créé");

            // Si du texte est présent, on met à jour le texte dans la table "comments"
            if(req.body.text) {
                const sqlUpdateText = `UPDATE comments SET text= ? WHERE comment_id= LAST_INSERT_ID()`;

                mySqlConnection.query( sqlUpdateText, req.body.text, (error, results) => {
                    
                    if (error) {
                        res.status(500).json( {error} );
                    }
                    // Si il n'y a pas d'image
                    else if (req.file === undefined) {
                        console.log("===> Texte créé !");
                        res.status(200).json( {message: "Texte créé !"} )
                    } 
                });
            }

            // Si une image est présente, on met à jour l'URL de l'image dans la table "comments"
            if (req.file) {

                const image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                req.body.imgUrl = image_url;
                
                const sqlUpdateImgUrl = `UPDATE comments SET image_url= ? WHERE comment_id= LAST_INSERT_ID()`;

                mySqlConnection.query( sqlUpdateImgUrl, image_url, (error, results) => {
                    if (error) {
                        res.status(500).json( {error} );
                    }
                    else {
                        console.log("===> URL de l'image modifiée !");
                    }
                });

                // Puis on insert un nouvel objet dans la table "comment_image"
                const imageUserArray = [req.body.imgUrl, userId];
                const sqlInsertCommentImg = `INSERT INTO comment_image (comment_id, image_url, user_id) VALUES (LAST_INSERT_ID(), ?, ?)`;

                mySqlConnection.query( sqlInsertCommentImg, imageUserArray, (error, results) => { 
                    if (error) {
                        res.status(500).json( {error} );
                    }
                    // Si il n'y a pas de texte
                    if (req.body.text === undefined) {
                        console.log("===> Image créée");
                        res.status(201).json( {message: "Commentaire avec image seule envoyé !"});
                    } 
                    else {
                        res.status(201).json( {message: "Commentaire image + texte envoyé !"});
                    }
                });
            }
        }
    });
}

// ********** Suppression d'un commentaire ********** //

module.exports.deleteComment = (req, res) => {
    
    const commentId = req.params.id;
    const sqlDeleteComment = `DELETE FROM comments WHERE comments.comment_id = ?`;
    mySqlConnection.query (sqlDeleteComment, commentId, (error, results) => {
        if (!error) {
            res.status(200).json( {message : `Suppression du commentaire (id: ${commentId}) réussie !`} );
        }
        else {
            res.status(500).json( {error} );
        }
    });    
}