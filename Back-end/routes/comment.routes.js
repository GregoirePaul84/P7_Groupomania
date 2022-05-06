const router = require('express').Router();
const commentCtlr = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

router.get('/:id', auth, commentCtlr.readAllComments);
// router.get('/:id', auth, commentCtlr.readOneComment);
router.post('/', auth, multer, commentCtlr.createComment);
router.delete('/:id', auth, commentCtlr.deleteComment);

module.exports = router;