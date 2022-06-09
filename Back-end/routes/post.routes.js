const router = require('express').Router();
const postCtlr = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer-config');

// Récupérer tous les posts
router.get('/', auth, postCtlr.readAllPosts);

// Récupérer tous les posts d'un utilisateur
router.get('/all/:id', auth, postCtlr.readAllPostsUser);

// Récupérer 1 post
router.get('/:id', auth, postCtlr.readOnePost);

// Créer un post
router.post('/', auth, upload.single('post_image'), postCtlr.createPost);

// Modifier un post
router.put('/:id', auth, postCtlr.updatePost);

// Liker / Disliker un post
router.post('/:id', auth, postCtlr.likeDislikePost);

// Annulation d'un like / dislike
router.post('/cancel/:id', auth, postCtlr.cancelLikeDislike);

// Supprimer un post
router.delete('/:id', auth, postCtlr.deletePost);

// Compter les likes
router.post('/:id/like', auth, postCtlr.countLike);

// Compter les dislikes
router.post('/:id/dislike', auth, postCtlr.countdisLike);

module.exports = router;