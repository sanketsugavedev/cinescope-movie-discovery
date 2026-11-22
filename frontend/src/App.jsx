// import './App.css'
// import  {useState,useEffect} from 'react';
// const movieAPI = import.meta.env.VITE_Movie_API;
// import MovieList from './components/MovieList';

// function App() {
//   const [Movies,SetMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [favorites, setFavorites] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);
//   const [activePage, setActivePage] = useState('home');

//   const fetchMovies = async(query) => {
//     const response = await fetch(`${movieAPI}&s=${query == '' ? 'batman' : query}`);
//     const data = await response.json();
//     SetMovies(data.Search);
//   }
  
//   useEffect(() => {
//     fetchMovies('batman');
//     fetchFavorites();
//     fetchWatchlist();
//   }, []);

//   const fetchFavorites = async () => {
//     try {
//       const response = await fetch('/api/favorites');
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }

//       setFavorites(data);

//     } catch (error) {
//       console.error("Error fetching favorites:", error.message);
//     }
//   };

//   const fetchWatchlist = async () => {
//     try {
//       const response = await fetch('/api/watchlist');
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }

//       setWatchlist(data);

//     } catch (error) {
//       console.error("Error fetching watchlist:", error.message);
//     }
//   };

  
//   const toggleFavorite = async (movie) => {
//     const isFav = favorites.some(
//       item => item.movieId === movie.imdbID
//     );

//     try {
//       const response = await fetch(
//         isFav
//           ? `/api/favorites/${movie.imdbID}`
//           : `/api/favorites`,
//         {
//           method: isFav ? 'DELETE' : 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: isFav ? undefined : JSON.stringify(movie)
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }

//       if (isFav) {
//         setFavorites(prev =>
//           prev.filter(item => item.movieId !== movie.imdbID)
//         );
//       } else {
//         await fetchFavorites();
//       }

//     } catch (error) {
//       console.error("Favorite error:", error.message);
//     }
//   };

//   const toggleWatchlist = async (movie) => {
//     const isInWatchlist = watchlist.some(
//       item => item.movieId === movie.imdbID
//     );

//     try {
//       const response = await fetch(
//         isInWatchlist
//           ? `/api/watchlist/${movie.imdbID}`
//           : `/api/watchlist`,
//         {
//           method: isInWatchlist ? 'DELETE' : 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: isInWatchlist ? undefined : JSON.stringify(movie)
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }

//       if (isInWatchlist) {
//         setWatchlist(prev =>
//           prev.filter(item => item.movieId !== movie.imdbID)
//         );
//       } else {
//         await fetchWatchlist();
//       }

//     } catch (error) {
//       console.error("Watchlist error:", error.message);
//     }
//   };


//   let displayedMovies = [];

//   if (activePage === 'home') {
//     displayedMovies = Movies;
//   } else if (activePage === 'favorites') {
//     displayedMovies = favorites;
//   } else if (activePage === 'watchlist') {
//     displayedMovies = watchlist;
//   }

//   return (
//     <>
//       <nav className="navbar">
//         <div className="logo">
//           <span className="logo-icon">🎬</span>
//           <h1>CineScope</h1>
//         </div>

//         <div className="nav-links">
//           <button
//             className={activePage === 'home' ? 'active' : ''}
//             onClick={() => setActivePage('home')}
//           >
//             Home
//           </button>

//           <button
//             className={activePage === 'favorites' ? 'active' : ''}
//             onClick={() => setActivePage('favorites')}
//           >
//             Favorites
//           </button>

//           <button
//             className={activePage === 'watchlist' ? 'active' : ''}
//             onClick={() => setActivePage('watchlist')}
//           >
//             Watchlist
//           </button>
//         </div>
//       </nav>

//       <main className="main-content">
//         <section className="hero">
//           <h2>Discover Your Next Favorite Movie</h2>
//           <p>Explore movies and TV shows worth watching.</p>

//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="Search movies or TV shows..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button onClick={() => fetchMovies(searchTerm)}>Search</button>
//           </div>
//         </section>

//         <section className="movies-section">
//           <div className="section-header">
//             <h2>
//               {activePage === 'home'
//                 ? 'Discover Movies'
//                 : activePage === 'favorites'
//                 ? 'Your Favorites'
//                 : 'Your Watchlist'}
//             </h2>

//             <p>
//               {activePage === 'home'
//                 ? 'Explore movies and TV shows worth watching.'
//                 : activePage === 'favorites'
//                 ? 'Movies you have added to your favorites.'
//                 : 'Movies you have saved to watch later.'}
//             </p>
//           </div>

//           <MovieList
//             movies={displayedMovies}
//             favorites={favorites}
//             toggleFavorite={toggleFavorite}
//             watchlist={watchlist}
//             toggleWatchlist={toggleWatchlist}
//           />
//         </section>
//       </main>
//     </>
//   )
// }

// export default App


import './App.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';

const movieAPI = import.meta.env.VITE_Movie_API;

function App() {
  const [Movies, SetMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activePage, setActivePage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovies = async (query = 'batman') => {
    const searchQuery = query.trim() || 'batman';
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${movieAPI}&s=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (!response.ok || data.Response === 'False') {
        throw new Error(data.Error || 'Unable to find movies right now.');
      }

      SetMovies(data.Search || []);
    } catch (error) {
      SetMovies([]);
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not load favorites.');
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error.message);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await fetch('/api/watchlist');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not load watchlist.');
      setWatchlist(data);
    } catch (error) {
      console.error('Error fetching watchlist:', error.message);
    }
  };

  useEffect(() => {
    fetchMovies('batman');
    fetchFavorites();
    fetchWatchlist();
  }, []);

  const toggleFavorite = async (movie) => {
    const isFav = favorites.some((item) => item.movieId === movie.imdbID);

    try {
      const response = await fetch(
        isFav ? `/api/favorites/${movie.imdbID}` : '/api/favorites',
        {
          method: isFav ? 'DELETE' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: isFav ? undefined : JSON.stringify(movie),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Favorite update failed.');

      if (isFav) {
        setFavorites((prev) => prev.filter((item) => item.movieId !== movie.imdbID));
      } else {
        await fetchFavorites();
      }
    } catch (error) {
      console.error('Favorite error:', error.message);
    }
  };

  const toggleWatchlist = async (movie) => {
    const isInWatchlist = watchlist.some((item) => item.movieId === movie.imdbID);

    try {
      const response = await fetch(
        isInWatchlist ? `/api/watchlist/${movie.imdbID}` : '/api/watchlist',
        {
          method: isInWatchlist ? 'DELETE' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: isInWatchlist ? undefined : JSON.stringify(movie),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Watchlist update failed.');

      if (isInWatchlist) {
        setWatchlist((prev) => prev.filter((item) => item.movieId !== movie.imdbID));
      } else {
        await fetchWatchlist();
      }
    } catch (error) {
      console.error('Watchlist error:', error.message);
    }
  };

  const displayedMovies =
    activePage === 'home' ? Movies : activePage === 'favorites' ? favorites : watchlist;

  const pageDetails = {
    home: {
      eyebrow: 'YOUR NEXT MOVIE NIGHT STARTS HERE',
      title: 'Find your next\nfavorite story.',
      description: 'Search thousands of movies and series, then save the ones you love.',
      sectionTitle: 'Explore movies',
      sectionDescription: 'Popular picks and discoveries for your next watch.',
    },
    favorites: {
      eyebrow: 'YOUR PERSONAL COLLECTION',
      title: 'The ones you love.',
      description: 'All your favorite movies and shows, collected in one place.',
      sectionTitle: 'Your favorites',
      sectionDescription: 'The movies and shows you have marked as favorites.',
    },
    watchlist: {
      eyebrow: 'SAVE IT FOR MOVIE NIGHT',
      title: 'Queue up the good stuff.',
      description: 'Keep track of everything you want to watch next.',
      sectionTitle: 'Your watchlist',
      sectionDescription: 'Your personal list of movies and shows to watch later.',
    },
  };

  const currentPage = pageDetails[activePage];

  const handleSearch = (event) => {
    event.preventDefault();
    setActivePage('home');
    fetchMovies(searchTerm);
  };

  return (
    <div className="app-shell">
      <nav className="navbar">
        <button className="brand" onClick={() => setActivePage('home')} aria-label="CineScope home">
          <span className="brand-mark">C</span>
          <span className="brand-name">Cine<span>Scope</span></span>
        </button>

        <div className="nav-links" aria-label="Main navigation">
          <button className={activePage === 'home' ? 'active' : ''} onClick={() => setActivePage('home')}>
            Discover
          </button>
          <button className={activePage === 'favorites' ? 'active' : ''} onClick={() => setActivePage('favorites')}>
            Favorites <span className="nav-count">{favorites.length}</span>
          </button>
          <button className={activePage === 'watchlist' ? 'active' : ''} onClick={() => setActivePage('watchlist')}>
            Watchlist <span className="nav-count">{watchlist.length}</span>
          </button>
        </div>

        <div className="nav-tagline"><span className="status-dot" /> YOUR CINEMA, CURATED</div>
      </nav>

      <main className="main-content">
        <section className={`hero ${activePage !== 'home' ? 'hero-compact' : ''}`}>
          <div className="hero-copy">
            <p className="eyebrow"><span /> {currentPage.eyebrow}</p>
            <h1>{currentPage.title.split('\n').map((line, index) => (
              <span key={line}>{index === 1 ? <em>{line}</em> : line}{index === 0 && <br />}</span>
            ))}</h1>
            <p className="hero-description">{currentPage.description}</p>
          </div>

          {activePage === 'home' && (
            <form className="search-container" onSubmit={handleSearch}>
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                type="text"
                placeholder="Search movies, series, titles..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search movies and TV shows"
              />
              <button type="submit" disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</button>
            </form>
          )}
          <div className="hero-decoration" aria-hidden="true"><span>CS</span></div>
        </section>

        <section className="movies-section">
          <div className="section-header">
            <div>
              <p className="section-kicker">CURATED FOR YOU</p>
              <h2>{currentPage.sectionTitle}</h2>
              <p className="section-description">{currentPage.sectionDescription}</p>
            </div>
            <span className="result-count">{displayedMovies.length} {displayedMovies.length === 1 ? 'TITLE' : 'TITLES'}</span>
          </div>

          {isLoading && activePage === 'home' ? (
            <div className="feedback-state"><span className="loader" /><p>Finding something worth watching...</p></div>
          ) : errorMessage && activePage === 'home' ? (
            <div className="feedback-state"><span className="feedback-icon">!</span><h3>No results found</h3><p>{errorMessage}</p></div>
          ) : displayedMovies.length > 0 ? (
            <MovieList
              movies={displayedMovies}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              watchlist={watchlist}
              toggleWatchlist={toggleWatchlist}
            />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">{activePage === 'favorites' ? '♡' : activePage === 'watchlist' ? '＋' : '⌕'}</div>
              <h3>{activePage === 'favorites' ? 'Your favorites list is waiting' : activePage === 'watchlist' ? 'Your watchlist is looking a little empty' : 'No movies to show'}</h3>
              <p>{activePage === 'favorites' ? 'Head to Discover and tap the heart on a movie you love.' : activePage === 'watchlist' ? 'Save movies you want to watch and they will show up here.' : 'Try searching for a movie or series.'}</p>
              {activePage !== 'home' && <button onClick={() => setActivePage('home')}>Explore movies <span>→</span></button>}
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <span className="footer-brand">Cine<span>Scope</span></span>
        <p>Made for the love of movies.</p>
        <span className="footer-note">DISCOVER · SAVE · WATCH</span>
      </footer>
    </div>
  );
}

export default App;
