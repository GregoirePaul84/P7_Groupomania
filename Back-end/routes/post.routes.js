const router = require('express').Router();
const postCtlr = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

router.get('/', auth, postCtlr.readAllPosts);
router.get(':/id', auth, postCtlr.readOnePost);
router.post('/', auth, postCtlr.createPost);

module.exports = router;