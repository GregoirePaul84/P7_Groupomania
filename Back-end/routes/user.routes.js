const router = require('express').Router();
const userCtlr = require('../controllers/user.controller');
const multer = require('../middlewares/multer-config');

// Route pour /api/user/

router.get('/:id', userCtlr.readOneUser);
router.put('/:id', multer, userCtlr.updateUser);
router.delete('/:id', userCtlr.deleteUser);

module.exports = router;