import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import welcomeImage from "../../assets/welcome-image.png";

const Home = () => {
  return (
    <div className="home-container">
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />
      <h1 className="welcome-message">WELCOME TO MOVIE LIBRARY</h1>
      <div className="button-container">
        <Link className="button" to="/register">
          Register
        </Link>
        <Link className="button" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
