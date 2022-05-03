const mySqlConnection = require('../config/db');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})

// ********** Récupération de tous les commentaires d'un post ********** //

module.exports.readAllComments = (req, res) => {
    try {
        const postId = req.params.id;

        const sqlGetAllComments = `SELECT * FROM comments WHERE post_id = ${postId}`;
        mySqlConnection.query( sqlGetAllComments, (error, results) => {
            if (!error) {
                res.status(200).json( {results} )
            }
            else {
                res.status(500).json( {error} )
            }
        });

    }
    catch (error) {
        res.status(500).json( {error} )
    }

}

// ********** Récupération d'un commentaire ********** //

module.exports.readOneComment = (req, res) => {
    try {
        const commentId = req.params.id;
        const sqlGetOneComment = `SELECT * FROM comments WHERE comments.comment_id = ${commentId}`;

        mySqlConnection.query( sqlGetOneComment, (error, results) => {
            if (!error) {
                
                res.status(200).json( {results} )
            }
            else {
                res.status(500).json( {error} )
            }
        });

    }
    catch (error) {
        res.status(500).json( {error} )
    }

}

// ********** Création d'un commentaire sous un post ********** //

module.exports.createComment = (req, res) => {
    try {
        // Récupération de l'ID du token afin de lier le commentaire à l'userID
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        
        const sqlCreateComment = `INSERT INTO comments(post_id, user_id, comment_body) VALUES (?, ?, ?)`;
        const commentBody = [req.body.post_id, userId, req.body.comment_body];

        mySqlConnection.query( sqlCreateComment, commentBody, (error, results) => {
            
            if (!error) {
                res.status(201).json( {message: "Commentaire créé !"} )
            }
            else {
                res.status(500).json( {error} );

            } 
        });
        
    }
    catch (error) {
        res.status(500).json( {error} );
    }

}

// ********** Suppression d'un commentaire ********** //

module.exports.deleteComment = (req, res) => {
    try {
        const commentId = req.params.id;
        const sqlDeleteComment = `DELETE FROM comments WHERE comments.comment_id = ${commentId}`;
        mySqlConnection.query (sqlDeleteComment, (error, results) => {
            if (!error) {
                res.status(200).json( {message : "Suppression du commentaire réussie !"} );
            }
            else {
                res.status(500).json( {error} );
            }
        })    
        
    }
    catch {
        res.status(500).json( {message : "Suppression du commentaire échouée"} );
    }

}