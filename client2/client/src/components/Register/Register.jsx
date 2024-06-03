import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://movielibrarybackend-jgu4.onrender.com/api/register", {
        name,
        email,
        password,
      });

      console.log("Registered successfully:");

      if (res.request.status == 200) {
        alert("Registration Successful");
        navigate("/login");
      }
       
    } catch (err) {
      console.error("Error registering:", err.response.data.message);
    }
  };

  return (
    <>
      <div className="form-container">
        <h3> Register Here</h3>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
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
          <button type="submit">Register</button>
          <p>
            Are you an existing user? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
