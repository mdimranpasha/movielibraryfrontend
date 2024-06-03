import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieList.css"; // Importing the CSS file

const MovieList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const token = localStorage.getItem("token");
      // console.log("token", token);
      const res = await axios.get("https://movielibrarybackend-jgu4.onrender.com/api/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("res", res);
      setLists(res.data);
    };
    fetchLists();
  }, []);

  const handleDelete = async (playlistId, imdbID) => {
    console.log("listid", playlistId, "movieid", imdbID);
    const token = localStorage.getItem("token");

    // Optimistically update the state
    const updatedLists = lists.map((list) =>
      list._id === playlistId
        ? {
            ...list,
            movies: list.movies.filter((movie) => movie.imdbID !== imdbID),
          }
        : list
    );
    setLists(updatedLists);

    try {
      await axios.delete(
        `https://movielibrarybackend-jgu4.onrender.com/api/movielist/${playlistId}/${imdbID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("Error deleting movie:", err);
      // Revert the state change if the API call fails
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === playlistId
            ? {
                ...list,
                movies: [
                  ...list.movies,
                  lists
                    .find((l) => l._id === playlistId)
                    .movies.find((m) => m.imdbID === imdbID),
                ],
              }
            : list
        )
      );
    }
  };

  return (
    <div className="movie-list-container">
      {lists.map((list) => (
        <div key={list._id} className="playlist">
          <h3>{list.name}</h3>
          <div className="movie-container">
            {list.movies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <h4>{movie.Title}</h4>
                <img src={movie.Poster} alt={movie.Title} />
                <button onClick={() => handleDelete(list._id, movie.imdbID)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
