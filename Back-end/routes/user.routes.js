const router = require('express').Router();
const userCtlr = require('../controllers/user.controller');

// Route pour /api/user/

router.get('/:id', userCtlr.readOneUser);
router.put('/:id', userCtlr.updateUser);
// router.delete('/:id', userCtlr.deleteUser);

module.exports = router;