const express = require('express');

const app = express();

const path = require('path');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site, cross-origin');

    next();
});

app.use(express.json({limit: '50mb'}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);

app.use('/api/post', postRoutes);

app.use('/api/comment', commentRoutes);

module.exports = app;