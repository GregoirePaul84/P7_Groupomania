const mySqlConnection = require('../config/db');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})


// ********** Récupération de tous les posts ********** //

module.exports.readAllPosts = (req, res) => {
    try {
        const sqlGetAllPosts = `SELECT * FROM posts`;
        mySqlConnection.query( sqlGetAllPosts, (error, results) => {
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
};

// ********** Récupération d'un post ********** //

module.exports.readOnePost = (req, res) => {
    try {
        const postId = req.params.id;
        const sqlGetOnePost = `SELECT * FROM posts WHERE posts.post_id = ${postId}`;

        mySqlConnection.query( sqlGetOnePost, (error, results) => {
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
};

// ********** Création d'un nouveau post ********** //

module.exports.createPost = (req, res) => {
    
    try {
        // Récupération de l'ID du token afin de lier le post à l'userID
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        
        const sqlCreatePost = `INSERT INTO posts(user_id, post_body) VALUES (?, ?)`;
        const postBody = [userId, req.body.post_body];

        mySqlConnection.query( sqlCreatePost, postBody, (error, results) => {
            
            if (!error) {
                res.status(201).json( {message: "Post créé"} )
            }
            else {
                res.status(500).json( {error} );

            } 
        });
        
    }
    catch (error) {
        res.status(500).json( {error} );
    }
};

// ********** Suppression d'un post ********** //

module.exports.deletePost = (req, res) => {
    try {
        const sqlDeletePost = `DELETE * FROM posts WHERE posts.post_id = ${req.params.id}`;
        mySqlConnection.query (sqlDeletePost, (error, results) => {
            if (!error) {
                res.status(200).json( {results} );
            }
            else {
                res.status(500).json( {error} );
            }
        })    
        
    }
    catch {
        res.status(500).json( {message : "Suppression du post échoué"} );
    }
};