import React, { useState } from "react";
import axios from "axios";
import "./MovieSearch.css";
import MovieImg from "../../assets/movie.png";
import AddToPlaylistButton from "../AddToPlayList/AddToPlaylistButton";
import { useNavigate } from "react-router-dom";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddButton, setShowAddButton] = useState(true);
  const navigate = useNavigate();

  const OMDB_API_KEY = "406f01d1";  

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://movielibrarybackend-jgu4.onrender.com/api/search?query=${query.toLowerCase()}`
      );
      if (res.data.Response === "True") {
        setResults(res.data.Search);
        setError(null); // Clear any previous errors
        setSelectedMovie(null); // Clear the selected movie
      } else {
        setResults([]); // Clear previous results
        setError(res.data.Error); // Set the error message
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching. Please try again.");
    }
  };

  const handleMovieClick = async (imdbID) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`
      );
      if (res.data.Response === "True") {
        setSelectedMovie(res.data);
        setError(null); // Clear any previous errors
      } else {
        setSelectedMovie(null); // Clear previous selected movie
        setError(res.data.Error); // Set the error message
      }
    } catch (err) {
      console.error(err);
      setError(
        "An error occurred while fetching movie details. Please try again."
      );
    }
  };

  const handleWatchListClick = () => {
    navigate("/MovieList");
  };

  const handleAddToPlaylist = () => {
    alert("Movie added to playlist!");
    setShowAddButton(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <header className="header">
        <h2>Search for movies</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            required
          />
          <button type="submit">Search</button>
        </form>
        <button className="watch-list-button" onClick={handleWatchListClick}>
          Watch List
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      {error && <div className="error-message">{error}</div>}
      <div className="main-content">
        {results.length === 0 && !error && !selectedMovie && (
          <div className="placeholder-container">
            <img
              src={MovieImg}
              alt="Search for movies"
              className="placeholder-image"
            />
          </div>
        )}
        {!selectedMovie && (
          <div className="movie-results">
            {results.map((movie) => (
              <div
                key={movie.imdbID}
                className="movie-card"
                onClick={() => handleMovieClick(movie.imdbID)}
              >
                <h3>{movie.Title}</h3>
                <img src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
          </div>
        )}
        {selectedMovie && (
          <div className="movie-details">
            {showAddButton && (
              <button onClick={() => setShowAddButton(false)}>
                Add To WatchList
              </button>
            )}
            <h2>{selectedMovie.Title}</h2>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <div className="detail-item">
              <strong>Year:</strong>
              <span>{selectedMovie.Year}</span>
            </div>
            <div className="detail-item">
              <strong>Genre:</strong>
              <span>{selectedMovie.Genre}</span>
            </div>
            <div className="detail-item">
              <strong>Director:</strong>
              <span>{selectedMovie.Director}</span>
            </div>
            <div className="detail-item">
              <strong>Actors:</strong>
              <span>{selectedMovie.Actors}</span>
            </div>
            <div className="detail-item">
              <strong>Plot:</strong>
              <span>{selectedMovie.Plot}</span>
            </div>
            {!showAddButton && (
              <AddToPlaylistButton
                movieList={[selectedMovie]}
                onAddToPlaylist={handleAddToPlaylist}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
