import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";

// Functional component representing the Home page of the forum application.
const Home = () => {
  // State variables to manage the thread input, list of threads, and navigation.
  // - 'thread': Manages the input value for creating a new thread.
  const [thread, setThread] = useState("");
  // - 'threadList': Stores the list of threads fetched from the server.
  const [threadList, setThreadList] = useState([]);
  /*- 'navigate': Provides a navigation function from React Router 
  for redirecting users. */
  const navigate = useNavigate();
  /* useEffect hook to check user authentication and fetch the list of threads 
  on component mount.*/
  /*useEffect to perform side effects in the component.
    Checks user authentication using local storage and redirects to the 
    login page if not authenticated.
    Fetches the list of threads from the server and updates the threadList state. */
  useEffect(() => {
    const checkUser = () => {
      // Redirect to the login page if the user is not authenticated.
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        // Fetch the list of threads from the server.
        fetch("https://forum-system-server.onrender.com/api/all/threads") // Updated route
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => setThreadList(data.threads))
          .catch((err) => console.error(err));
        console.log("Authenticated");
      }
    };
    checkUser();
  }, [navigate]);
  // Function to create a new thread and update the list of threads.
  /* Defines a function createThread to handle the creation of a new thread.
    Retrieves user information from local storage.
    Performs a fetch request to create a new thread on the server. */
  const createThread = () => {
    const userId = localStorage.getItem("_id");
    const username = localStorage.getItem("username"); // Get the username from localStorage
    console.log(`Username from LocalStorage: ${username}`);
    console.log(`CreateThread user id is ${userId}`);
    if (!userId) {
      alert("User is not authenticated.");
      return;
    }
    // Fetch to create a new thread on the server.
    fetch("https://forum-system-server.onrender.com/api/create/thread", {
      method: "POST",
      body: JSON.stringify({
        thread,
        userId: localStorage.getItem("_id"),
        username: localStorage.getItem("username"),
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
        alert(data.message);
        setThreadList(data.threads);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while creating the thread.");
      });
  };

  /* Event handler for form submission, triggers thread creation 
  and input field reset. 
     Defines handleSubmit as an event handler for form submission.
     Calls createThread to create a new thread.
     Clears the thread input field after thread creation.*/
  const handleSubmit = (e) => {
    e.preventDefault();
    createThread();
    setThread(""); // Clear the input field after creating a thread
  };
  /* JSX rendering of the Home component, including the form for thread creation 
  and the list of threads.
     Returns JSX to render the Home component.
     Includes the navigation component (<Nav />), a form for thread creation, 
     and a container for displaying the list of threads. 
     Utilizes conditional rendering to display a message if no threads are available.
     Maps through the threadList to render individual thread items. Each item includes
     thread information and components for handling likes and comments.
  */
  return (
    <>
      {/* Navigation component */}
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Create a Thread</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home__container">
            <label htmlFor="thread">Title / Description</label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <button className="homeBtn">CREATE THREAD</button>
        </form>
        {/* Display container for the list of threads */}
        <div className="thread__container">
          {threadList.length === 0 ? (
            <p>No threads available.</p>
          ) : (
            /*
              This is a JavaScript map function used to iterate over each thread 
              in the threadList array and return a set of React elements.
              <div className="thread__item" key={thread.id}>: Each thread is 
              wrapped in a div with the class name "thread__item," and each thread 
              is assigned a unique key based on its id.
              */
            threadList.map((thread) => (
              <div className="thread__item" key={thread.id}>
                <p>{thread.title}</p>
                <p>Created by: {thread.username}</p>
                {/* 
                These components (Likes and Comments) are likely responsible for 
                rendering the user interactions related to liking and commenting 
                on the specific thread. The structure suggests modularity, allowing 
                for the reusability of these components throughout the application.               
                */}
                <div className="react__container">
                  {/* 
                  - Likes component 
                  - Likes component that takes two props: numberOfLikes and threadId. 
                  numberOfLikes is the length of the likes array associated with 
                  the thread, and threadId is the unique identifier of the thread.       
                  */}
                  <Likes
                    numberOfLikes={thread.likes.length}
                    threadId={thread.id}
                  />
                  {/* 
                  - Comments component
                  - This is a Comments component that takes three props: 
                  numberOfComments, threadId, and title. numberOfComments is the 
                  length of the replies array associated with the thread, 
                  threadId is the unique identifier of the thread, and title is 
                  the title of the thread.
                  */}
                  <Comments
                    numberOfComments={thread.replies.length}
                    threadId={thread.id}
                    title={thread.title}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
