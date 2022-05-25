const express = require('express');
const app = express();

require('dotenv').config({path: './config/.env'})

const cors = require('cors');
const path = require('path');
const helmet = require ('helmet');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Cross-Origin-Resource-Policy',  'cross-origin');
    
    next();
});

const corsOptions ={
    origin:`${process.env.CLIENT_URL}`, 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));

app.use('/images', express.static(path.join(__dirname, 'images/profil_images')));
app.use('/images/post', express.static(path.join(__dirname, 'images/post_images')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app;