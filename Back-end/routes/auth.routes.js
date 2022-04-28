const router = require('express').Router();
const authCtlr = require('../controllers/auth.controller');

// Route pour /api/user/register
router.post('/register', authCtlr.register);
router.post('/login', authCtlr.login);
router.get('/logout', authCtlr.logout);

module.exports = router;