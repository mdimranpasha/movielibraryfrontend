import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddToPlaylistButton from "./components/AddToPlayList/AddToPlaylistButton";
import Home from "./components/Home/Home"; // Assume you have a Home component
import MovieSearch from "./components/MovieSearch/MovieSearch";
import MovieList from "./components/MovieList/MovieList";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Private routes */}
        <Route
          path="/add-to-playlist"
          element={<PrivateRoute element={AddToPlaylistButton} />}
        />
        <Route
          path="/MovieSearch"
          element={<PrivateRoute element={MovieSearch} />}
        />
        <Route
          path="/MovieList"
          element={<PrivateRoute element={MovieList} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
