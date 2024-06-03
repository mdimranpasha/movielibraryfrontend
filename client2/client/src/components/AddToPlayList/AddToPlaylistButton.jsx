import React, { useState } from "react";
import axios from "axios";

const AddToPlaylistButton = ({ movieList, onAddToPlaylist }) => {
  const [name, setName] = useState("");
  // State for success message
  const [successMessage, setSuccessMessage] = useState("");
  // const [isPublic, setIsPublic] = useState(false);

  const handleAddToPlaylist = async () => {
    const token = localStorage.getItem("token");
    // console.log("token", token);
    try {
      const res = await axios.post(
        "https://movielibrarybackend-jgu4.onrender.com/api/save",
        {
          name: name,
          movies: movieList, // Assuming movieList is an array of movie objects
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("Playlist created:", res.data);
      setSuccessMessage("Successfully added to the playlist!");

      if (onAddToPlaylist) {
        onAddToPlaylist();
      }
    } catch (err) {
      console.error("Error creating playlist:", err.response.data.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Playlist Name"
        required
      />
      <button onClick={handleAddToPlaylist}>Add to Playlist</button>
      {successMessage && <p>{successMessage}</p>}
      {/* Render success message */}
    </div>
  );
};

export default AddToPlaylistButton;
