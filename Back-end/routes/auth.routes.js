const router = require('express').Router();
const authCtlr = require('../controllers/auth.controller');
const password = require('../middlewares/password.middleware');


// Route pour /api/user/register
router.post('/register', password, authCtlr.register);
router.post('/login', authCtlr.login);
router.get('/logout', authCtlr.logout);

module.exports = router;