const mysql = require('mysql');

// Importation des variables d'environnement
require('dotenv').config({path: './config/.env'})

const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    multipleStatements: true
});

db.connect((err) => {
    if (err) {
        console.log("Connexion à la base de données impossible");
        console.log(err);
    } else {
        console.log("Connexion à la base de données réussie !");
        
    }
})

module.exports = db;





