# 🎬 CineScope — Movie & TV Show Discovery App

**CineScope** is a movie and TV show discovery application where users can search for movies and series, save their favorites, and build a personal watchlist. It uses the OMDb API to fetch movie information and MongoDB to persist users' saved content.

## ✨ Features

- 🔍 **Search Movies & TV Shows** — Search for movies and TV series using the OMDb API.
- ❤️ **Favorites** — Add movies or TV shows to favorites and remove them anytime.
- 📺 **Watchlist** — Save movies and series you want to watch later.
- 💾 **Persistent Storage** — Favorites and watchlist items are stored in MongoDB.
- 🗂️ **Dedicated Sections** — Browse your searched movies, favorites, and watchlist separately.
- 🎨 **Responsive UI** — A modern, dark, cinematic interface designed for an enjoyable browsing experience.

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### API
- [OMDb API](https://www.omdbapi.com/) — Movie and TV show data.

## 📸 Features Overview

- Search for movies and TV shows.
- Add or remove items from Favorites.
- Add or remove items from your Watchlist.
- Retrieve saved content from the database.
- Navigate between Home, Favorites, and Watchlist.

## 📁 Project Structure

```text
CineScope/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieList.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── ...
│   └── ...
│
├── backend/
│   ├── controllers/
│   │   ├── favoritesControllers.js
│   │   └── watchlistControllers.js
│   ├── routes/
│   │   ├── favoritesRoutes.js
│   │   └── watchlistRoutes.js
│   ├── models/
│   │   └── Movies.js
│   ├── db.js
│   ├── app.js
│   └── ...
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CineScope.git
cd CineScope
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_Movie_API=https://www.omdbapi.com/?apikey=YOUR_OMDB_API_KEY
```

Replace `YOUR_OMDB_API_KEY` with your actual OMDb API key.

Start the frontend:

```bash
npm run dev
```

## 🔑 API Configuration

CineScope uses the [OMDb API](https://www.omdbapi.com/) to retrieve movie and TV show data.

1. Visit [OMDb API](https://www.omdbapi.com/).
2. Request an API key.
3. Add the key to your frontend `.env` file.

## 🔗 Backend API Endpoints

### Favorites

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/favorites` | Get all favorite movies and series |
| POST | `/api/favorites` | Add a movie or series to favorites |
| DELETE | `/api/favorites/:movieId` | Remove an item from favorites |

### Watchlist

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/watchlist` | Get all watchlist items |
| POST | `/api/watchlist` | Add a movie or series to watchlist |
| DELETE | `/api/watchlist/:movieId` | Remove an item from watchlist |

## 🗄️ Database

CineScope uses MongoDB with Mongoose to store saved movies and TV shows.

Each saved item contains:

- `movieId` — IMDb ID of the movie or series.
- `mediaType` — Type of content (`movie` or `tv`).
- `title` — Movie or series title.
- `posterPath` — Poster image URL.
- `isFavorite` — Indicates whether the item is a favorite.
- `isInWatchlist` — Indicates whether the item is in the watchlist.

## 🚀 Future Improvements

- User authentication and personalized accounts.
- Movie details page with cast, plot and ratings.
- Genre-based filtering.
- Pagination for search results.
- Recommendation system.
- Improved loading animations and UI interactions.

## 👨‍💻 Author

Developed as a full-stack project to explore React, Node.js, Express, MongoDB, REST APIs, and frontend-backend integration.

---

⭐ If you like this project, consider giving it a star!
