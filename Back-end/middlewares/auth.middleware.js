const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'})

module.exports = (req, res, next) => {

  try {
    
    const token = req.headers.cookie.split('jwt=')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID invalide';
    }
    
    else {
      req.user = () => decodedToken
      next();
    }
  } 
  
  catch {
    res.status(401).json({
      error: new Error('Requête invalide!')
    });
  }
};