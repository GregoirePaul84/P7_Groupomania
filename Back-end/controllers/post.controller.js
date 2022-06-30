const mySqlConnection = require('../config/db');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})


// ********** Récupération de tous les posts ********** //

module.exports.readAllPosts = (req, res) => {
    
    const sqlGetAllPosts = `SELECT * FROM posts ORDER BY created DESC`;
    mySqlConnection.query( sqlGetAllPosts, (error, results) => {
        if (!error) {
            res.status(200).json( {results} )
        }
        else {
            res.status(500).json( {error} )
        }
    });  
};

// ********** Récupération de tous les posts d'un utilisateur ********** //

module.exports.readAllPostsUser = (req, res) => {
    
    const sqlGetAllPostsUser = `SELECT * FROM posts WHERE user_id = ? ORDER BY created DESC`;
    mySqlConnection.query( sqlGetAllPostsUser, req.params.id, (error, results) => {
        if (!error) {
            res.status(200).json( {results} )
        }
        else {
            res.status(500).json( {error} )
        }
    });
};

// ********** Récupération d'un post ********** //

module.exports.readOnePost = (req, res) => {
    
    const postId = req.params.id;
    const sqlGetOnePost = `SELECT * FROM posts WHERE posts.post_id = ${postId}`;

    mySqlConnection.query( sqlGetOnePost, (error, results) => {
        if (!error) {
            res.status(200).json( {results} );
        }
        else {
            res.status(500).json( {error} );
        }
    });
};

// ********** Création d'un nouveau post ********** //

module.exports.createPost = (req, res) => {
    
    // Récupération de l'ID du token
    const token = req.headers.cookie.split('jwt=')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Insertion du post dans la DB
    const sqlCreatePost = `INSERT INTO posts(user_id) VALUES (?)`;

    mySqlConnection.query(sqlCreatePost, userId, (error, results) => {
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

                const image_url = `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`;
                
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


// ********** Modification d'un post ********** //

module.exports.updatePost = (req, res) => {
    
    const postId = req.params.id;
    const newText = req.body.text;
    const updateArray = [newText, postId]

    const sqlUpdatePost = `UPDATE posts SET text = ? WHERE post_id = ?`;
    mySqlConnection.query (sqlUpdatePost, updateArray, (error, results) => {
        if (!error) {  
            res.status(200).json( {message : "Modification du post réussie !"} ); 
        }
        else {
            res.status(500).json( {error} );
        }
    })         
}

// ********** Suppression d'un post ********** //

module.exports.deletePost = (req, res) => {
    
    const postId = req.params.id;
    const sqlDeletePost = `DELETE FROM posts WHERE posts.post_id = ?`;
    mySqlConnection.query (sqlDeletePost, postId, (error, results) => {
        if (!error) {
            const sqlDeleteComments = `DELETE FROM comments WHERE comments.post_id = ?`;
            mySqlConnection.query(sqlDeleteComments, postId, (error, results) => {
                if (!error) {
                    res.status(200).json( {message : "Suppression du post réussie !"} ); 
                }
                else {
                    res.status(500).json( {error} ); 
                }
            })
        }
        else {
            res.status(500).json( {error} );
        }
    })         
}

// ********** Suppression d'une image d'un post ********** //

module.exports.deletePicturePost = (req, res) => {
    
    const postId = req.params.id;
    const sqlDeletePicturePost = `DELETE FROM post_image WHERE post_id = ?`;
    mySqlConnection.query (sqlDeletePicturePost, postId, (error, results) => {
        
        if (!error) {
            res.status(200).json( {message : "Suppression de l'image réussie !"} ); 
        }
        else {
            res.status(500).json( {error} ); 
        }
    })            
}

// ********** Suppression des likes d'un post ********** //

module.exports.deleteLikesPost = (req, res) => {
    
    const postId = req.params.id;
    const sqlDeleteLikesPost = `DELETE FROM likes WHERE post_id = ?`;
    mySqlConnection.query (sqlDeleteLikesPost, postId, (error, results) => {
        
        if (!error) {
            res.status(200).json( {message : "Suppression de likes réussie !"} ); 
        }
        else {
            res.status(500).json( {error} ); 
        }
    })            
}

// ********** Suppression des dislikes d'un post ********** //

module.exports.deleteDislikesPost = (req, res) => {
    
    const postId = req.params.id;
    const sqlDeleteDislikesPost = `DELETE FROM dislikes WHERE post_id = ?`;
    mySqlConnection.query (sqlDeleteDislikesPost, postId, (error, results) => {
        
        if (!error) {
            res.status(200).json( {message : "Suppression de dislikes réussie !"} ); 
        }
        else {
            res.status(500).json( {error} ); 
        }
    })            
}

// ********** Like / Dislike d'un post ********** //

module.exports.likeDislikePost = (req, res) => {
    
    // Récupération de l'ID du token, de l'ID du post dans les paramètres de requête
    const token = req.headers.cookie.split('jwt=')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const postId = req.params.id;
    const postText = req.body.postText;
    const commentText = req.body.postText;
    const userPostId = [postId, userId];
    const postInfos = [postId, userId, postText];
    
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
            const sqlLike = `INSERT INTO likes(post_id, user_id, text_post) VALUES (? , ? , ?)`;
            mySqlConnection.query( sqlLike, postInfos, (error, results) => {
    
                if (!error) {

                    // Incrémentation du like dans la table posts
                    const sqlInsertPost = `UPDATE posts SET like_number=like_number+1, isLiked=1 WHERE post_id=?`;
                    mySqlConnection.query( sqlInsertPost, userPostId, (error, results) => {
                        if (!error) {
                            res.status(200).json( {message : "Like ajouté !"} );
                        }
                        else {
                            res.status(500).json( {error} );
                        } 
                    });
                }
                else {
                    res.status(500).json( {error} );
                } 
            });    
        });      
    }

    else if (req.body.dislike == 1) {

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

                    // Incrémentation du dislike dans la table posts
                    const sqlInsertPost = `UPDATE posts SET dislike_number=dislike_number+1, isDisliked=1 WHERE post_id=?`;
                    mySqlConnection.query( sqlInsertPost, userPostId, (error, results) => {
                        if (!error) {
                            res.status(200).json( {message : "Dislike ajouté !"} );
                        }
                        else {
                            res.status(500).json( {error} );
                        } 
                    });
                }
                else {
                    res.status(500).json( {error} );
                } 
            });    
        });
    }
};

// ********** Annulation d'un like / dislike ********** //

module.exports.cancelLikeDislike = (req, res) => {

    // Récupération de l'ID du token, de l'ID du post dans les paramètres de requête
    const token = req.headers.cookie.split('jwt=')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const postId = req.params.id;
    
    if (req.body.like == 0) {

        // Vérification si l'utilisateur a déjà liké le post
        const sqlCheckLike = `SELECT user_id FROM likes WHERE post_id = ?`;
        mySqlConnection.query( sqlCheckLike, postId, (error, results) => {
            for (let i in results) {
                let idWhoLiked = results[i].user_id;

                if (idWhoLiked === userId) {
                    const sqlCancelLike = `DELETE FROM likes WHERE post_id = ?`;
                    mySqlConnection.query( sqlCancelLike, postId, (error, results) => {

                        if (!error) {
                            const sqlUpdatePost = `UPDATE posts SET like_number=like_number-1, isLiked=0 WHERE post_id=?`;
                            mySqlConnection.query( sqlUpdatePost, postId, (error, results) => {
                                if (!error) {
                                    res.status(200).json( {message : "Like annulé !"} );
                                }
                                else {
                                    res.status(500).json( {error} );
                                } 
                            });
                        }
                        else {
                            res.status(500).json( {error} );
                        } 
                    });
                }             
            }
        });      
    }

    else if (req.body.dislike == 0) {

        // Vérification si l'utilisateur a déjà disliké le post
        const sqlCheckDislike = `SELECT user_id FROM dislikes WHERE post_id = ?`;
        mySqlConnection.query( sqlCheckDislike, postId, (error, results) => {
            for (let i in results) {
                let idWhoDisliked = results[i].user_id;

                if (idWhoDisliked === userId) {
                    
                    const sqlCancelLike = `DELETE FROM dislikes WHERE post_id = ?`;
                    mySqlConnection.query( sqlCancelLike, postId, (error, results) => {

                        if (!error) {
                            const sqlUpdatePost = `UPDATE posts Set dislike_number=dislike_number-1, isDisliked=0 where post_id=?`;
                            mySqlConnection.query( sqlUpdatePost, postId, (error, results) => {
                                if (!error) {
                                    res.status(200).json( {message : "Dislike annulé !"} );
                                }
                                else {
                                    res.status(500).json( {error} );
                                } 
                            });
                        }
                        else {
                            res.status(500).json( {error} );
                        } 
                    });
                }             
            }    
        });
    }
}


// ********** Récupération de toutes les images post ********** //

module.exports.readAllPics = (req, res) => {
    
    const sqlGetAllPics = `SELECT * FROM post_image`;
    mySqlConnection.query( sqlGetAllPics, (error, results) => {
        if (!error) {
            res.status(200).json( {results} )
        }
        else {
            res.status(500).json( {error} )
        }
    });  
};
