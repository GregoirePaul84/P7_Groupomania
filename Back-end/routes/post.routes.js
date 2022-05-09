const router = require('express').Router();
const postCtlr = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

// Récupérer tous les posts
router.get('/', auth, postCtlr.readAllPosts);

// Récupérer 1 post
router.get('/:id', auth, postCtlr.readOnePost);

// Créer un post
router.post('/', auth, multer, postCtlr.createPost);

// Liker / Disliker un post
router.post('/:id', auth, postCtlr.likeDislikePost);

// Compter les likes
router.post('/:id/like', auth, postCtlr.countLike);

// Compter les dislikes
router.post('/:id/dislike', auth, postCtlr.countdisLike);

// Supprimer un post
router.delete('/:id', auth, postCtlr.deletePost);

module.exports = router;