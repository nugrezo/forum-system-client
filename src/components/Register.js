import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Functional component representing the registration page of the 
forum application. */
const Register = () => {
  // Navigation hook to enable programmatic navigation.
  const navigate = useNavigate();
  // State variables to manage user input for registration.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* Function to handle user registration, sending a request to the server. */
  const signUp = (email, password, username) => {
    // Fetch to register a new user on the server.
    fetch("https://forum-system-server.onrender.com/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
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
      .then(() => {
        // Successful registration alert, navigate to the login page.
        alert("Account created successfully!");
        navigate("/");
      })
      .catch((error) => {
        // Handle registration errors, such as duplicate email.
        console.error("Error:", error);
        alert("Email already registered");
      });
  };
  // Event handler for form submission, triggers user registration.
  const handleSubmit = (e) => {
    // Log user input for debugging purposes.
    console.log(
      `email is ${email}, password is: ${password} username is:  ${username}`
    );
    e.preventDefault();
    // Call the registration function with user input.
    signUp(email, password, username);
    // Clear input fields after submission.
    setEmail("");
    setUsername("");
    setPassword("");
  };
  // JSX rendering of the Register component, including the registration form.
  return (
    <main className="register">
      <h1 className="registerTitle">Create an account</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        {/* Input field for username */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        {/* Button for submitting the registration form */}
        <button className="registerBtn">REGISTER</button>
        {/* Link to navigate to the login page */}
        <p>
          Have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
