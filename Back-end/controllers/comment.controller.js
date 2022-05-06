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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Si le commentaire comporte une image
    if(req.file) {
        const image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        req.body.Imgurl = image_url;
        const imageUserArray = [image_url, userId];
        const commentBody = [req.body.post_id, userId, req.body.text, image_url];
        const sqlInsertCommentImg = `INSERT INTO comment_image (image_url, user_id) VALUES (?, ?)`;
        const sqlCreateComment = `INSERT INTO comments(post_id, user_id, text, image_url) VALUES (?, ?, ?, ?)`;

        mySqlConnection.query(sqlInsertCommentImg, imageUserArray, (error, results) => {
            if (error) {
                res.status(500).json( {error} );
            }
            // Si le commentaire comporte une image seule
            else if (req.body.text === undefined) {
                console.log("===> Image créée");
                
                mySqlConnection.query( sqlCreateComment, commentBody, (error, results) => {
            
                    if (error) {
                        res.status(500).json( {error} );
                    }
                    else {
                        console.log("===> Commentaire créé");
                        res.status(201).json( {message: "Commentaire avec image seule envoyée !"});
                    } 
                }); 
            }
            else {
                console.log("===> Image créée");
            }
        });
    };
    
    // Si le commentaire comporte au moins du texte
    if (req.body.text) {
        const sqlCreateComment = `INSERT INTO comments(post_id, user_id, text, image_url) VALUES (?, ?, ?, ?)`;
        const commentBody = [req.body.post_id, userId, req.body.text, req.body.Imgurl];

        mySqlConnection.query( sqlCreateComment, commentBody, (error, results) => {
            
            if (error) {
                res.status(500).json( {error} );
            }
            else {
                console.log("===> Commentaire créé");
                res.status(201).json( {message: "Commentaire créé !"} )
            } 
        });
    } 
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