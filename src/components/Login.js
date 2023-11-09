import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const loginUser = (email, password) => {
    setLoading(true); // Set loading to true while waiting for the response
    fetch("https://forum-system-7877dc8bc5ee.herokuapp.com/api/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
          navigate("/dashboard");
          localStorage.setItem("_id", data.userId);
          localStorage.setItem("username", data.username);
          console.log("userId is ", data.userId); // Check the ID being set
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again later."); // Display a user-friendly error message
      })
      .finally(() => {
        setLoading(false); // Set loading back to false
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    loginUser(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <main className="login">
      <h1 className="loginTitle">Log into your account</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBtn" disabled={loading}>
          {loading ? "Signing in..." : "SIGN IN"}
        </button>
        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
