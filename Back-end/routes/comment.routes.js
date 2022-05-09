const router = require('express').Router();
const commentCtlr = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

// Récupérer tous les commentaires d'un post
router.get('/:id', auth, commentCtlr.readAllComments);

// Récupérer un commentaire
// router.get('/:id', auth, commentCtlr.readOneComment);

// Créer un commentaire
router.post('/', auth, multer, commentCtlr.createComment);

// Supprimer un commentaire
router.delete('/:id', auth, commentCtlr.deleteComment);

module.exports = router;