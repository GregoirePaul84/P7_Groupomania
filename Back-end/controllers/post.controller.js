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
        const postId = req.params.id;
        const sqlDeletePost = `DELETE FROM posts WHERE posts.post_id = ${postId}`;
        mySqlConnection.query (sqlDeletePost, (error, results) => {
            if (!error) {
                res.status(200).json( {message : "Suppression du post réussie !"} );
            }
            else {
                res.status(500).json( {error} );
            }
        })    
        
    }
    catch {
        res.status(500).json( {message : "Suppression du post échouée"} );
    }
};

// ********** Like / Dislike d'un post ********** //

module.exports.likeDislikePost = (req, res) => {
    try {
        // Récupération de l'ID du token, de l'ID du post dans les paramètres de requête
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        const postId = req.params.id;
        const userPostId = [postId, userId];
        
        if (req.body.like == 1) {

            // Vérification si l'utilisateur a déjà liké le post
            const sqlCheckLike = `SELECT user_id FROM likes WHERE post_id = ?`;
            mySqlConnection.query( sqlCheckLike, postId, (error, results) => {
                for (let i in results) {
                    let idWhoLiked = results[i].user_id;

                    if (idWhoLiked === userId) {
                        
                        res.status(400).json( {message: "Post déjà liké par l'utilisateur"} );
                        return 
                    }             
                }

                // Si l'utilisateur n'a pas liké, insertion du post_id et user_id dans la table likes
                const sqlLike = `INSERT INTO likes(post_id, user_id) VALUES (? , ?)`;
                mySqlConnection.query( sqlLike, userPostId, (error, results) => {
        
                    if (!error) {
                        res.status(200).json( {message : "Like ajouté !"} );
                    }
                    else {
                        res.status(500).json( {error} );
                    } 
                });    
            });      
        }

        else if (req.body.like == 0) {

            // Vérification si l'utilisateur a déjà disliké le post
            const sqlCheckDislike = `SELECT user_id FROM dislikes WHERE post_id = ?`;
            mySqlConnection.query( sqlCheckDislike, postId, (error, results) => {
                for (let i in results) {
                    let idWhoDisliked = results[i].user_id;

                    if (idWhoDisliked === userId) {
                        
                        res.status(400).json( {message: "Post déjà disliké par l'utilisateur"} );
                        return 
                    }             
                }

                // Si l'utilisateur n'a pas disliké, insertion du post_id et user_id dans la table likes
                const sqlDislike = `INSERT INTO dislikes(post_id, user_id) VALUES (? , ?)`;
                mySqlConnection.query( sqlDislike, userPostId, (error, results) => {
        
                    if (!error) {
                        res.status(200).json( {message : "Dislike ajouté !"} );
                    }
                    else {
                        res.status(500).json( {error} );
                    } 
                });    
            });
        }
    }
    catch (error) {
        res.status(500).json( {error} );
    }
};