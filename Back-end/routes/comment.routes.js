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

// Décrémenter le nombre de commentaires dans post
router.put('/decrement/:id', auth, commentCtlr.updateNbOfComments);

// Like / Dislike d'un commentaire
router.post('/:id', auth, commentCtlr.likeDislikeComment);

// Like / Dislike d'un commentaire
router.post('/cancel/:id', auth, commentCtlr.cancelLikeDislikeComment);


module.exports = router;