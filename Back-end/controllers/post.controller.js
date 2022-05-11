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
    
    // Récupération de l'ID du token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Insertion du post dans la DB
    const sqlCreateComment = `INSERT INTO posts(user_id) VALUES (?)`;

    mySqlConnection.query(sqlCreateComment, userId, (error, results) => {
        if (error) {
            res.status(500).json( {error} );
        }
        else {
            console.log("===> Post créé");

            // Si du texte est présent, on met à jour le texte dans la table "posts"
            if(req.body.text) {
                const sqlUpdateText = `UPDATE posts SET text= ? WHERE post_id= LAST_INSERT_ID()`;

                mySqlConnection.query( sqlUpdateText, req.body.text, (error, results) => {
                    
                    if (error) {
                        res.status(500).json( {error} );
                    }
                    // Si il n'y a pas d'image
                    else if (req.file === undefined) {
                        console.log("===> Texte créé !");
                        res.status(201).json( {message: "Texte créé !"} )
                    } 
                });
            }

            // Si une image est présente, on met à jour l'URL de l'image dans la table "posts"
            if (req.file) {

                const image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                
                const sqlUpdateImgUrl = `UPDATE posts SET image_url= ? WHERE post_id= LAST_INSERT_ID()`;

                mySqlConnection.query( sqlUpdateImgUrl, image_url, (error, results) => {
                    if (error) {
                        res.status(500).json( {error} );
                    }
                    else {
                        console.log("===> URL de l'image modifiée !");
                    }
                });

                // Puis on insert un nouvel objet dans la table "post_image"
                const imageUserArray = [image_url, userId];
                const sqlInsertPostImg = `INSERT INTO post_image (post_id, image_url, user_id) VALUES (LAST_INSERT_ID(), ?, ?)`;

                mySqlConnection.query( sqlInsertPostImg, imageUserArray, (error, results) => { 
                    if (error) {
                        res.status(500).json( {error} );
                    }
                    // Si il n'y a pas de texte
                    if (req.body.text === undefined) {
                        console.log("===> Image créée");
                        res.status(201).json( {message: "Post avec image seule envoyé !"});
                    } 
                    else {
                        res.status(201).json( {message: "Post image + texte envoyé !"});
                    }
                });
            }
        }
    });
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

// ********** Comptage de likes ********** //

module.exports.countLike = (req, res) => {

    const sqlCountLikes = `SELECT COUNT(*) FROM likes WHERE post_id = ?`;

    mySqlConnection.query(sqlCountLikes, req.body.post_id, (error, results) => {
        if (error) {
            res.status(500).json( {error} );
        }
        else {
            res.status(200).json( {results} );
        }
    });

};

// ********** Comptage de dislikes ********** //

module.exports.countdisLike = (req, res) => {

    const sqlCountDislikes = `SELECT COUNT(*) FROM dislikes WHERE post_id = ?`;

    mySqlConnection.query(sqlCountDislikes, req.body.post_id, (error, results) => {
        if (error) {
            res.status(500).json( {error} );
        }
        else {
            res.status(200).json( {results} );
        }
    });

};