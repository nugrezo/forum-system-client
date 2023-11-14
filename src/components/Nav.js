import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  // useNavigate is a hook from React Router for navigation
  const navigate = useNavigate();
  // Function to handle user sign-out
  const signOut = () => {
    /* 
    Remove user ID from local storage 
    This function handles the sign-out process. It removes the user ID from 
    local storage, navigates the user to the home page ("/"), and displays an 
    alert to notify the user about the sign-out.
    */
    localStorage.removeItem("_id");
    // Navigate to the home page
    navigate("/");
    // Display an alert notifying the user about the sign-out
    alert("User signed out!");
  };

  /*
  - JSX rendering of the navigation bar
  - JSX structure: The component renders a navigation bar (<nav>) with 
  the title "Threadify" (<h2>) and a right-aligned section 
  (<div className="navbarRight">) containing a "Sign out" button 
  (<button onClick={signOut}>Sign out</button>).
  */
  return (
    <nav className="navbar">
      <h2>Threadify</h2>
      <div className="navbarRight">
        {/* Button to trigger the signOut function */}
        <button onClick={signOut}>Sign out</button>
      </div>
    </nav>
  );
};

export default Nav;
