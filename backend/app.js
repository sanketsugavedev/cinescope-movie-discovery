const express = require('express');
const cors = require('cors');
const favoritesRoutes = require('./routes/favoritesRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname,'../frontend')));

app.use('/api/favorites',favoritesRoutes);
app.use('/api/watchlist',watchlistRoutes);

module.exports = app;