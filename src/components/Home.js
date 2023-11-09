import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";

const Home = () => {
  const [thread, setThread] = useState("");
  const [threadList, setThreadList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        fetch("https://forum-system-7877dc8bc5ee.herokuapp.com/api/all/threads") // Updated route
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

  const createThread = () => {
    const userId = localStorage.getItem("_id");
    const username = localStorage.getItem("username"); // Get the username from localStorage
    console.log(`Username from LocalStorage: ${username}`);
    console.log(`CreateThread user id is ${userId}`);
    if (!userId) {
      alert("User is not authenticated.");
      return;
    }
    fetch("https://forum-system-7877dc8bc5ee.herokuapp.com/api/create/thread", {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createThread();
    setThread(""); // Clear the input field after creating a thread
  };

  return (
    <>
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

        <div className="thread__container">
          {threadList.length === 0 ? (
            <p>No threads available.</p>
          ) : (
            threadList.map((thread) => (
              <div className="thread__item" key={thread.id}>
                <p>{thread.title}</p>
                <p>Created by: {thread.username}</p>
                <div className="react__container">
                  <Likes
                    numberOfLikes={thread.likes.length}
                    threadId={thread.id}
                  />
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
