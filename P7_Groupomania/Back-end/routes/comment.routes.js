const router = require('express').Router();
const commentCtlr = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer-config');

// Récupérer tous les commentaires d'un post
router.get('/:id', auth, commentCtlr.readAllCommentsPost);

// Récupérer tous les commentaires
router.get('/', auth, commentCtlr.readAllComments);

// Créer un commentaire
router.post('/', auth, upload.single('comment_image'), commentCtlr.createComment);

// Modifier un post
router.put('/:id', auth, commentCtlr.updateComment);

// Supprimer un commentaire
router.delete('/:id', auth, commentCtlr.deleteComment);

// Incrémenter le nombre de commentaires dans post
router.put('/increment/:id', auth, commentCtlr.increaseNbOfComments);

// Décrémenter le nombre de commentaires dans post
router.put('/decrement/:id', auth, commentCtlr.decreaseNbOfComments);

// Like / Dislike d'un commentaire
router.post('/:id', auth, commentCtlr.likeDislikeComment);

// Like / Dislike d'un commentaire
router.post('/cancel/:id', auth, commentCtlr.cancelLikeDislikeComment);

// Supprimer l'image d'un post
router.delete('/image/:id', auth, commentCtlr.deletePictureComment);

// Supprimer les likes d'un post
router.delete('/like/:id', auth, commentCtlr.deleteLikesComment);

// Supprimer les dislikes d'un post
router.delete('/dislike/:id', auth, commentCtlr.deleteDislikesComment);


module.exports = router;