const router = require('express').Router();
const userCtlr = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');

// Récupérer un utilisateur
router.get('/:id', auth, userCtlr.readOneUser);

// Envoyer une photo de profil à la DB
router.post('/', auth, multer, userCtlr.postPicUser);

// Modifier les infos ou la photo utilisateur
router.put('/:id', auth, multer, userCtlr.updateUser);

// Supprimer un utilisateur
router.delete('/:id', auth, userCtlr.deleteUser);

module.exports = router;