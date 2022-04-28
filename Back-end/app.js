const express = require('express');

const app = express();

const authRoutes = require('./routes/auth.routes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site, cross-origin');

    next();
});

app.use(express.json());

app.use('/api/user', authRoutes);

module.exports = app;