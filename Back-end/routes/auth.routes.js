const router = require('express').Router();
const authCtlr = require('../controllers/auth.controller');
const password = require('../middlewares/password.middleware');


// Enregistrement d'un nouvel utilisateur
router.post('/register', password, authCtlr.register);

// Connexion d'un utilisateur existant
router.post('/login', authCtlr.login);

// Déconnexion d'un utilisateur
router.get('/logout', authCtlr.logout);

module.exports = router;