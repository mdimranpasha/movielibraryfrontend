import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Importing the external CSS file
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://movielibrarybackend-jgu4.onrender.com/api/login", {
        email,
        password,
      });
      // console.log("res", res);
      const { jwtToken } = res.data;
      // console.log("token", jwtToken);
      localStorage.setItem("token", jwtToken);
      console.log("Logged in successfully");
      const isAuthenticated = !!localStorage.getItem("token");
      if (isAuthenticated) {
        navigate("/MovieSearch"); // Redirect to a protected route if already authenticated
      }  
      else {
        alert("Invalid crediantials");
      }
    } catch (err) {
      console.error("Error logging in:", err.response.data.message);
    }
  };

  return (
    <div className="form-container2">
      <h3>Login Here</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Are you new user? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
