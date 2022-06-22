const router = require('express').Router();
const userCtlr = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer-config');
const password = require('../middlewares/password.middleware');


// Récupérer tous les utilisateurs
router.get('/', auth, userCtlr.readAllUsers);

// Récupérer un utilisateur
router.get('/:id', auth, userCtlr.readOneUser);

// Envoyer une photo de profil à la DB
router.post('/:id', auth, upload.single('profil_image'), userCtlr.postPicUser);

// Récupérer une photo de profil
router.get("/image/:id", auth, userCtlr.readProfilImage);

// Modifier les infos ou la photo utilisateur
router.put('/:id', auth, upload.single('profil_image'), userCtlr.updateUser);

// Modifier le mot de passe
router.put('/password/:id', auth, password, userCtlr.changePassword);

// Supprimer un utilisateur
router.delete('/:id', auth, userCtlr.deleteUser);

// Récupérer tous les likes
router.get('/likes/:id', auth, userCtlr.readAllLikes);

module.exports = router;