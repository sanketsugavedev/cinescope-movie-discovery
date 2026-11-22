
// import './MovieList.css'
// import MovieCard from './MovieCard';

// function MovieList({ movies, favorites, toggleFavorite, watchlist, toggleWatchlist }) {
//   return (
//     <div className="movie-grid">
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie.imdbID}
//           movie={movie}
//           favorites={favorites}
//           toggleFavorite={toggleFavorite}
//           watchlist={watchlist}
//           toggleWatchlist={toggleWatchlist}
//         />
//       ))}
//     </div>
//   );
// }

// export default MovieList;


import './MovieList.css';
import MovieCard from './MovieCard';

function MovieList({ movies = [], favorites = [], toggleFavorite, watchlist = [], toggleWatchlist }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID || movie.movieId}
          movie={movie}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          watchlist={watchlist}
          toggleWatchlist={toggleWatchlist}
        />
      ))}
    </div>
  );
}

export default MovieList;
