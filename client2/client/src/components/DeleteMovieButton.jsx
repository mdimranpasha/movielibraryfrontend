import React from 'react';
import axios from 'axios';

const DeleteMovieButton = ({ listId, movieId, onMovieDeleted }) => {
    const handleDeleteMovie = async () => {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
        try {
            const res = await axios.delete(`http://localhost:5000/api/movielist/${listId}/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Movie deleted:', res.data);
            if (onMovieDeleted) onMovieDeleted(movieId);
        } catch (err) {
            console.error('Error deleting movie:', err.response.data.message);
        }
    };

    return (
        <button onClick={handleDeleteMovie}>Delete Movie</button>
    );
};

export default DeleteMovieButton;
