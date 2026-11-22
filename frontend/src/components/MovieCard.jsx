
// import './MovieCard.css';

// function MovieCard({ movie, favorites, toggleFavorite, watchlist, toggleWatchlist }) {

//   const movieId = movie.imdbID || movie.movieId;
//   const movieTitle = movie.Title || movie.title;
//   const moviePoster = movie.Poster || movie.posterPath;
//   const movieYear = movie.Year || '';
//   const movieType = movie.Type || movie.mediaType;

//   const isFavorite = favorites.some(item => item.movieId === movieId);
//   const isInWatchlist = watchlist.some(item => item.movieId === movieId);

//   const movieData = {
//     imdbID: movieId,
//     Title: movieTitle,
//     Poster: moviePoster,
//     Type: movieType === 'tv' ? 'series' : movieType
//   };

//   return (
//     <div className="movie-card">

//       <img
//         src={
//           moviePoster && moviePoster !== "N/A"
//             ? moviePoster
//             : "https://placehold.co/300x450?text=No+Poster"
//         }
//         alt={movieTitle}
//       />

//       <div className="movie-info">
//         <h3>{movieTitle}</h3>
//         <p>{movieYear}</p>
//         <p className="movie-type">{movieType}</p>
//       </div>

//       <div className="card-actions">

//         <button
//           className="favorite-btn"
//           onClick={() => toggleFavorite(movieData)}
//         >
//           {isFavorite
//             ? "❤️ Remove Favorite"
//             : "🤍 Add to Favorites"}
//         </button>

//         <button
//           className="watchlist-btn"
//           onClick={() => toggleWatchlist(movieData)}
//         >
//           {isInWatchlist
//             ? "✓ Remove from Watchlist"
//             : "＋ Add to Watchlist"}
//         </button>

//       </div>
//     </div>
//   );
// }

// export default MovieCard;


import './MovieCard.css';

function MovieCard({ movie, favorites = [], toggleFavorite, watchlist = [], toggleWatchlist }) {
  // Home results come from OMDb; saved titles come from MongoDB.
  const movieId = movie.imdbID || movie.movieId;
  const movieTitle = movie.Title || movie.title || 'Untitled';
  const moviePoster = movie.Poster || movie.posterPath;
  const movieYear = movie.Year || movie.year || '';
  const movieType = movie.Type || movie.mediaType || '';

  const isFavorite = favorites.some((item) => item.movieId === movieId);
  const isInWatchlist = watchlist.some((item) => item.movieId === movieId);

  const movieData = {
    imdbID: movieId,
    Title: movieTitle,
    Poster: moviePoster,
    Type: movieType === 'tv' ? 'series' : movieType,
  };

  const poster = moviePoster && moviePoster !== 'N/A'
    ? moviePoster
    : 'https://placehold.co/500x750/17181e/e8e5e2?text=No+Poster';

  return (
    <article className="movie-card">
      <div className="movie-poster-wrap">
        <img className="movie-poster" src={poster} alt={`${movieTitle} poster`} loading="lazy" />
        <span className="poster-type">{movieType || 'Movie'}</span>
        <div className="poster-overlay" aria-hidden="true">
          <span className="poster-overlay-mark">C</span>
          <span className="poster-overlay-text">CINESCOPE PICK</span>
        </div>
      </div>

      <div className="movie-info">
        <div className="movie-heading-row">
          <h3 title={movieTitle}>{movieTitle}</h3>
          {movieYear && <span className="movie-year">{movieYear}</span>}
        </div>
        <p className="movie-type-label">{movieType === 'series' || movieType === 'tv' ? 'TV SERIES' : movieType === 'episode' ? 'EPISODE' : 'FEATURE FILM'}</p>

        <div className="card-actions">
          <button
            className={`favorite-btn ${isFavorite ? 'is-active' : ''}`}
            onClick={() => toggleFavorite(movieData)}
            aria-label={isFavorite ? `Remove ${movieTitle} from favorites` : `Add ${movieTitle} to favorites`}
          >
            <span className="action-icon">{isFavorite ? '♥' : '♡'}</span>
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
          <button
            className={`watchlist-btn ${isInWatchlist ? 'is-active' : ''}`}
            onClick={() => toggleWatchlist(movieData)}
            aria-label={isInWatchlist ? `Remove ${movieTitle} from watchlist` : `Add ${movieTitle} to watchlist`}
          >
            <span className="action-icon">{isInWatchlist ? '✓' : '+'}</span>
            {isInWatchlist ? 'In watchlist' : 'Watchlist'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
