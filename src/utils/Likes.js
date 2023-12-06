import React, { useState, useEffect } from "react";

/*
Likes is a React functional component that takes two props: 
initialNumberOfLikes and threadId. This is a destructuring syntax for function
arguments in JavaScript. It's equivalent to writing:
const Likes = (props) => {
  const { initialNumberOfLikes, threadId } = props;
};
Here's what these props represent:
initialNumberOfLikes: It's the initial number of likes for a thread. 
This is optional, and if not provided, it defaults to 0. It's used to initialize 
the state for the number of likes in the component.
threadId: It represents the identifier of the thread for which likes are being 
handled. This is necessary to fetch and update the likes for the specific thread.
In React functional components, props (short for properties) are used to pass data
from a parent component to a child component. The destructuring syntax makes it
convenient to extract specific props directly in the function signature.
Inside the component, you would typically use these props to implement the 
component's behavior, such as fetching and displaying the number of likes for a 
given thread (threadId).
*/
const Likes = ({ initialNumberOfLikes, threadId }) => {
  /*
     - State to manage the number of likes
     - Initializes the numberOfLikes state with the provided initialNumberOfLikes
       or 0 if not provided.
  */
  const [numberOfLikes, setNumberOfLikes] = useState(initialNumberOfLikes || 0);

  /*
  The useEffect hook is used to perform side effects in functional components. 
  It runs after the component has been rendered. In this specific case:
  */
  useEffect(() => {
    /*
     Fetch the number of likes for the thread
     It fetches the number of likes for a specific thread from the server.
     The fetch function is used to make an HTTP request to the specified URL, 
     which includes the threadId as part of the URL to identify the thread.
     The response is converted to JSON using res.json().
    */
    fetch(
      `https://forum-system-server.onrender.com/api/thread/likes/${threadId}`
    )
      .then((res) => res.json())
      .then((data) => {
        /*
       The number of likes is extracted from the response data and set using the 
       setNumberOfLikes function. This assumes that setNumberOfLikes is a
       state-setting function provided by the useState hook earlier in the component.
        */
        setNumberOfLikes(data.likes);
      })
      /*Any errors that occur during the fetch operation are caught and 
      logged to the console. 
      */
      .catch((err) => console.error(err));
    /*
    The [threadId] dependency array at the end of the useEffect hook ensures that 
    this effect is re-run whenever the threadId prop changes. 
    This is helpful to re-fetch the number of likes when the component is 
    dealing with a different thread. The useEffect hook helps manage the 
    lifecycle of asynchronous operations in React components.
    */
  }, [threadId]);

  /*
    -This function, handleLikeFunction, is responsible for handling the user's 
    interaction when they want to like a specific thread. 
    -this function facilitates the process of liking a thread. 
    It interacts with the server, updates the state to reflect the new 
    number of likes, and provides feedback to the user through alerts.
  */
  const handleLikeFunction = () => {
    /*
    It logs the threadId to the console. This is likely for debugging purposes to
    check that the correct thread ID is being processed. 
    */
    console.log(` threadId is ${threadId}`);
    /* 
      It sends a POST request to the specified URL 
      (https://forum-system-7877dc8bc5ee.herokuapp.com/api/thread/like).
      The body of the request includes the threadId and userId obtained from
      localStorage. This assumes that the user is authenticated, as it uses the user 
      ID stored in the local storage.    
    */
    fetch("https://forum-system-server.onrender.com/api/thread/like", {
      method: "POST",
      body: JSON.stringify({
        threadId,
        userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      /*
      -Handling the Response
      -It checks if the response from the server is okay (status code 200-299). 
      If not, it throws an error indicating that the user has already liked the 
      thread. This is a form of client-side validation. 
      */
      .then((res) => {
        if (!res.ok) {
          throw new Error("You have already liked the thread");
        }
        return res.json();
      })
      /*
      - Updating the Number of Likes and Displaying Alerts:
      - If there is no error message in the response data, 
      it updates the number of likes by incrementing the current count 
      by one (setNumberOfLikes(numberOfLikes + 1)) and displays an alert 
      with the message from the server.
      */
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          setNumberOfLikes(numberOfLikes + 1);
          alert(data.message);
        }
      })
      /*
      - Error Handling:
      - Any errors during the process (e.g., network issues) are caught and 
      logged to the console.
      */
      .catch((err) => console.error(err));
  };
  /* 
      This block of code represents the JSX (React components) that will be rendered 
      for displaying the "Likes" functionality. Let's break it down:
      */
  return (
    <div className="likes__container">
      {/* 
       - Heart Icon (<svg>):
      The <svg> element includes an inline SVG image of a heart. 
      This is a common symbol for representing "likes" on many platforms.
      The onClick attribute is set to the handleLikeFunction function, 
      which is triggered when the user clicks on the heart icon.
      when a user clicks on the heart icon, the handleLikeFunction will be invoked, 
      and the number of likes will be updated accordingly. The updated number 
      will be displayed next to the heart icon. If there are no likes, an empty 
      string is displayed.
      */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 likesBtn"
        onClick={handleLikeFunction}
      >
        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
      </svg>

      {/* 
        Number of Likes (<p>):
        The <p> element displays the number of likes.
        The style attribute sets the text color to #434242.
        The content inside the <p> element is a conditional expression 
        ({numberOfLikes === 0 ? "" : numberOfLikes}). It checks if numberOfLikes
        is zero.If true, it renders an empty string; otherwise, it renders the 
        actual number of likes.    
      */}
      <p style={{ color: "#434242" }}>
        {numberOfLikes === 0 ? "" : numberOfLikes}
      </p>
    </div>
  );
};

export default Likes;
