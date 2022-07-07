const mySqlConnection = require('../config/db');

const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})

// ********** Récupération de tous les commentaires d'un post ********** //

module.exports.readAllCommentsPost = (req, res) => {
    
    const postId = req.params.id;
    
    const sqlGetAllCommentsPost = `SELECT * FROM comments WHERE post_id = ?`;
    mySqlConnection.query( sqlGetAllCommentsPost, postId, (error, results) => {
        if (!error) {
            res.status(200).json( {results} );
        }
        else {
            res.status(500).json( {error} );
        }
    });
}

// ********** Récupération de tous les commentaires ********** //

module.exports.readAllComments = (req, res) => {
    
    const sqlGetAllComments = `SELECT * FROM comments`;

    mySqlConnection.query( sqlGetAllComments, (error, results) => {
        if (error) {
            res.status(500).json( {error} );
        }
        else {
            res.status(200).json( {results} );
        }
    });
}

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

                const image_url = `${req.protocol}://${req.get('host')}/images/comment/${req.file.filename}`;
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


// ********** Modification d'un commentaire ********** //

module.exports.updateComment = (req, res) => {
    
    const commentId = req.params.id;
    const newText = req.body.text;
    const updateArray = [newText, commentId];

    const sqlUpdatePost = `UPDATE comments SET text = ? WHERE comment_id = ?`;
    mySqlConnection.query (sqlUpdatePost, updateArray, (error, results) => {
        if (!error) {  
            res.status(200).json( {message : "Modification du commentaire réussie !"} ); 
        }
        else {
            res.status(500).json( {error} );
        }
    })         
}


// ********** Incrémentation d'un commentaire dans posts ********** //

module.exports.increaseNbOfComments = (req, res) => {

    const postId = req.body.postId;

    const sqlUpdateNumberPosts = `UPDATE posts SET comments_number = comments_number+1 where post_id = ?`;
    mySqlConnection.query(sqlUpdateNumberPosts, postId, (error, results) => {
        if (!error) {
             res.status(200).json( {message : `comments-number +1`} ); 
        }
        else {
            res.status(500).json( {error} ); 
        }
    })
}

// ********** Décrémentation d'un commentaire dans posts ********** //

module.exports.decreaseNbOfComments = (req, res) => {

    const postId = req.body.postId;

    const sqlUpdateNumberPosts = `UPDATE posts SET comments_number = comments_number-1 where post_id = ?`;
    mySqlConnection.query(sqlUpdateNumberPosts, postId, (error, results) => {
        if (!error) {
             res.status(200).json( {message : `comments-number -1`} ); 
        }
        else {
            res.status(500).json( {error} ); 
        }
    })
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
    })
}

// ********** Like / Dislike d'un post ********** //

module.exports.likeDislikeComment = (req, res) => {
    
    // Récupération de l'ID du token, de l'ID du post dans les paramètres de requête
    const token = req.headers.cookie.split('jwt=')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const commentId = req.params.id;
    const commentText = req.body.postText;
    const userCommentId = [commentId, userId];
    
    if (req.body.like == 1) {

        // Vérification si l'utilisateur a déjà liké le post
        const sqlCheckLike = `SELECT user_id FROM likes WHERE comment_id = ?`;
        mySqlConnection.query( sqlCheckLike, commentId, (error, results) => {
            for (let i in results) {
                let idWhoLiked = results[i].user_id;

                if (idWhoLiked === userId) {
                    
                    res.status(400).json( {message: "Post déjà liké par l'utilisateur"} );
                    return 
                }             
            }

            // Si l'utilisateur n'a pas liké, insertion du comment_id et user_id dans la table likes
            const sqlLike = `INSERT INTO likes(comment_id, user_id, isLiked) VALUES (?, ?, 1)`;
            mySqlConnection.query( sqlLike, userCommentId, (error, results) => {
    
                if (!error) {

                    // Incrémentation du like dans la table comments
                    const sqlIncrementLike = `UPDATE comments SET like_number=like_number+1, isLiked=1 where comment_id=?`;
                    mySqlConnection.query( sqlIncrementLike, commentId, (error, results) => {
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
        const sqlCheckDislike = `SELECT user_id FROM dislikes WHERE comment_id = ?`;
        mySqlConnection.query( sqlCheckDislike, commentId, (error, results) => {
            for (let i in results) {
                let idWhoDisliked = results[i].user_id;

                if (idWhoDisliked === userId) {
                    
                    res.status(400).json( {message: "Post déjà disliké par l'utilisateur"} );
                    return 
                }             
            }

            // Si l'utilisateur n'a pas disliké, insertion du comment_id et user_id dans la table dislikes
            const sqlDislike = `INSERT INTO dislikes(comment_id, user_id, isDisliked) VALUES (? , ? , 1)`;
            mySqlConnection.query( sqlDislike, userCommentId, (error, results) => {
    
                if (!error) {

                    // Incrémentation du dislike dans la table comments
                    const sqlIncrementDislike = `UPDATE comments Set dislike_number=dislike_number+1 where comment_id=?`;
                    mySqlConnection.query( sqlIncrementDislike, commentId, (error, results) => {
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

module.exports.cancelLikeDislikeComment = (req, res) => {

    // Récupération de l'ID du token, de l'ID du post dans les paramètres de requête
    const token = req.headers.cookie.split('jwt=')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const commentId = req.params.id;
    
    if (req.body.like == 0) {

        // Vérification si l'utilisateur a déjà liké le post
        const sqlCheckLike = `SELECT user_id FROM likes WHERE comment_id = ?`;
        mySqlConnection.query( sqlCheckLike, commentId, (error, results) => {
            for (let i in results) {
                let idWhoLiked = results[i].user_id;

                if (idWhoLiked === userId) {
                    const sqlCancelLike = `DELETE FROM likes WHERE comment_id = ?`;
                    mySqlConnection.query( sqlCancelLike, commentId, (error, results) => {

                        if (!error) {
                            const sqlDecrementLike = `UPDATE comments Set like_number=like_number-1 where comment_id=?`;
                            mySqlConnection.query( sqlDecrementLike, commentId, (error, results) => {
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
        const sqlCheckDislike = `SELECT user_id FROM dislikes WHERE comment_id = ?`;
        mySqlConnection.query( sqlCheckDislike, commentId, (error, results) => {
            for (let i in results) {
                let idWhoDisliked = results[i].user_id;

                if (idWhoDisliked === userId) {
                    
                    const sqlCancelLike = `DELETE FROM dislikes WHERE comment_id = ?`;
                    mySqlConnection.query( sqlCancelLike, commentId, (error, results) => {

                        if (!error) {
                            const sqlDecrementDislike = `UPDATE comments Set dislike_number=dislike_number-1 where comment_id=?`;
                            mySqlConnection.query( sqlDecrementDislike, commentId, (error, results) => {
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

// ********** Suppression d'une image d'un commentaire ********** //

module.exports.deletePictureComment = (req, res) => {
    
    const commentId = req.params.id;
    const sqlDeletePictureComment = `DELETE FROM comment_image WHERE comment_id = ?`;

    mySqlConnection.query(sqlDeletePictureComment, commentId, (error, results) => {
        
        if (!error) {
            res.status(200).json( {message : "Suppression de l'image réussie !"} ); 
        }
        else {
            res.status(500).json( {error} ); 
        }
    })            
}

// ********** Suppression des likes d'un commentaire ********** //

module.exports.deleteLikesComment = (req, res) => {
    
    const commentId = req.params.id;
    const sqlDeleteLikesComment = `DELETE FROM likes WHERE comment_id = ?`;
    mySqlConnection.query(sqlDeleteLikesComment, commentId, (error, results) => {
        
        if (!error) {
            res.status(200).json( {message : "Suppression de likes réussie !"} ); 
        }
        else {
            res.status(500).json( {error} ); 
        }
    })            
}

// ********** Suppression des dislikes d'un commentaire ********** //

module.exports.deleteDislikesComment = (req, res) => {
    
    const commentId = req.params.id;
    const sqlDeleteDislikesComment = `DELETE FROM dislikes WHERE comment_id = ?`;
    mySqlConnection.query(sqlDeleteDislikesComment, commentId, (error, results) => {
        
        if (!error) {
            res.status(200).json( {message : "Suppression de dislikes réussie !"} ); 
        }
        else {
            res.status(500).json( {error} ); 
        }
    })            
}