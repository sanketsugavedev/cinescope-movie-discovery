const Movie = require('../models/Movies');

const getFav = async (req, res) => {
    try {
        const favorites = await Movie.find({ isFavorite: true });

        return res.status(200).json(favorites);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const addFav = async (req, res) => {
    try {
        const { Title, imdbID, Type, Poster } = req.body;

        const foundMovie = await Movie.findOne({ movieId: imdbID });

        if (foundMovie) {
            if (!foundMovie.isFavorite) {
                foundMovie.isFavorite = true;
                await foundMovie.save();
            }

            return res.status(200).json({ message: "Movie added to favorites" });
        } else {
            const newMovie = new Movie({
                movieId: imdbID,
                mediaType: Type,
                title: Title,
                posterPath: Poster,
                isFavorite: true,
                isInWatchlist: false,
            });

            await newMovie.save();

            return res.status(201).json({ message: "Movie added to favorites" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteFav = async (req, res) => {
    try {
        const  movieId  = req.params.id;

        const foundMovie = await Movie.findOne({ movieId });

        if (!foundMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (foundMovie.isFavorite) {
            foundMovie.isFavorite = false;
            await foundMovie.save();
        }

        return res.status(200).json({ message: "Movie removed from favorites" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {getFav, addFav, deleteFav};