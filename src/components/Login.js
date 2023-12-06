import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Functional component representing the login page of the forum application.*/
const Login = () => {
  // State variables to manage user input, loading state, and navigation.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  // Function to handle user login, sending a request to the server.
  const loginUser = (email, password) => {
    // Set loading to true while waiting for the response
    setLoading(true);
    fetch("https://forum-system-server.onrender.com/api/", {
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
        // Handle the response data from the server
        if (data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
          navigate("/dashboard");
          // Set user information in local storage
          localStorage.setItem("_id", data.userId);
          localStorage.setItem("username", data.username);
          console.log("userId is ", data.userId); // Check the ID being set
        }
      })
      .catch((err) => {
        // Handle errors during the fetch request
        console.error(err);
        alert("An error occurred. Please try again later."); // Display a user-friendly error message
      })
      .finally(() => {
        // Set loading back to false regardless of success or failure
        setLoading(false);
      });
  };
  // Event handler for form submission, triggers user login.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Client-side validation
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }
    // Call the login function(loginUser) with user input
    loginUser(email, password);
    // Clear input fields after submission
    setEmail("");
    setPassword("");
  };
  // JSX rendering of the Login component, including the login form.
  return (
    <main className="login">
      <h1 className="loginTitle">Log into your account</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        {/* Input field for email address */}
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Input field for password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Button for submitting the login form, with loading state handling */}
        <button className="loginBtn" disabled={loading}>
          {loading ? "Signing in..." : "SIGN IN"}
        </button>
        {/* Link to navigate to the registration page */}
        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
