const mongoose = require('mongoose');

const savedMovieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
        unique: true
    },
    mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true
    },
    title: String,
    posterPath: String,

    isFavorite: {
        type: Boolean,
        default: false
    },
    isInWatchlist: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Movies', savedMovieSchema);