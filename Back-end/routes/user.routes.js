const router = require('express').Router();
const userCtlr = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');


// Route pour /api/user/

router.get('/:id', auth, userCtlr.readOneUser);
// router.post('/', auth, multer, userCtlr.postPicUser);
router.put('/:id', auth, multer, userCtlr.updateUser);
router.delete('/:id', auth, userCtlr.deleteUser);


module.exports = router;