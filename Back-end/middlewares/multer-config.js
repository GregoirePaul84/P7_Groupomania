// ************ Middleware pour enregistrer les images ************//

// Importation de multer
const multer = require('multer');

// Gère les extensions des fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    "image/gif": "gif"
  };
  
// Objet de configuration pour multer
const storage = multer.diskStorage({
    // Indique à multer les dossiers où il doit enregistrer les images
    destination: (req, file, callback) => {
        if (file.fieldname === "profil_image") {
            callback(null, './images/profil_images');
        }
        if (file.fieldname === "post_image") {
            callback(null, './images/post_images');
        }
        if (file.fieldname === "comment_image") {
            callback(null, './images/comment_images');     
        }
    },

    filename: (req, file, callback) => {
        // Gère le problème des espaces
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        // Génère un nom de fichier unique
        callback(null, name + 'file.' + extension);
    },
    
});

// Exportation du middleware multer 
const upload = multer({storage: storage});

module.exports = upload;