const Movie = require('../models/Movies');

const getWatch = async (req, res) => {
    try {
        const watchlist = await Movie.find({ isInWatchlist: true });

        return res.status(200).json(watchlist);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addWatch = async (req, res) => {
    try {
        const { Title, imdbID, Type, Poster } = req.body;

        const foundMovie = await Movie.findOne({ movieId: imdbID });

        if (foundMovie) {
            if (!foundMovie.isInWatchlist) {
                foundMovie.isInWatchlist = true;
                await foundMovie.save();
            }

            return res.status(200).json({ message: "Movie added to watchlist" });

        } else {
            const newMovie = new Movie({
                movieId: imdbID,
                mediaType: Type,
                title: Title,
                posterPath: Poster,
                isFavorite: false,
                isInWatchlist: true,
            });

            await newMovie.save();

            return res.status(201).json({ message: "Movie added to watchlist" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteWatch = async (req, res) => {
  try {
    const movieId = req.params.id;

    const foundMovie = await Movie.findOne({ movieId });

    if (!foundMovie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    foundMovie.isInWatchlist = false;
    await foundMovie.save();

    return res.status(200).json({
      message: "Movie removed from watchlist"
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {getWatch, addWatch, deleteWatch}