import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* Functional component representing the replies section for a specific
 thread in the forum. */
const Replies = () => {
  /*replyList is a state variable that holds and stores the list of replies. 
  It is initialized as an empty array, and setReplyList is the function 
  that allows to update the value of replyList. */
  const [replyList, setReplyList] = useState([]);
  /*reply is a state variable that holds the current reply input. 
  It is initialized as an empty string, and setReply is the function that 
  allows us to update the value of reply. 
  This is typically used in a form where the user can input text 
  for a new reply. */
  const [reply, setReply] = useState("");
  /* The `useNavigate` hook is from React Router and is used for 
  programmatic navigation.*/
  const navigate = useNavigate();
  /* The `useParams` hook is from React Router and is used to access 
 the parameters of the current route.xtracting the id parameter from 
 the current route's parameters. */
  const { id } = useParams();
  /* 
  useEffect hook to fetch replies for the current thread on component 
  mount.
  -useEffect is a React hook that runs side effects in function components. 
  It is used here to fetch replies when the component mounts or when the id 
  parameter changes.
  -The fetchReplies function is defined inside useEffect and is responsible for 
  making a POST request to the server's endpoint for fetching replies. It sends 
  the thread's id as part of the request body.
  -The useEffect hook runs the fetchReplies function when the component mounts or 
  when the id parameter changes. This ensures that the replies are fetched when
  the component is initially rendered and whenever the id parameter in the URL 
  changes.
  */
  useEffect(() => {
    // Function to fetch replies for the current thread from the server.
    const fetchReplies = () => {
      // Making a POST request to the server's endpoint for fetching replies.
      fetch("https://forum-system-server.onrender.com/api/thread/replies", {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Update the state (replyList) with the fetched replies.
          setReplyList(data.replies);
        })
        .catch((err) => console.error(err));
    };
    /* Call the fetchReplies function when the component mounts or
     when the 'id' parameter changes. */
    fetchReplies();
  }, [id]);
  /* 
  - Function to add a new reply to the current thread. 
  - The addReply function is responsible for sending a POST request to the 
 server's endpoint for creating a new reply. It includes the thread's id, 
 the user's userId retrieved from localStorage, and the text content of the 
 reply in the request body.
  - After making the request, it handles the server's response using the 
  then and catch methods. If successful, it displays an alert to the user with the 
  message from the server and navigates back to the dashboard. 
  If there's an error, it logs the error to the console. 
  */
  const addReply = () => {
    // Send a request to the server to create a new reply.
    fetch("https://forum-system-server.onrender.com/api/create/reply", {
      method: "POST",
      body: JSON.stringify({
        id, // The id of the current thread
        userId: localStorage.getItem("_id"), // The user id stored in localStorage
        reply, // The text content of the reply
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Display a message to the user based on the server response.
        alert(data.message);
        // Navigate back to the dashboard after successfully adding a reply.
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  /*
  - Event handler for submitting a new reply.
  - handleSubmitReply is an event handler function that 
  gets triggered when the form for submitting a reply is submitted.
  */
  const handleSubmitReply = (e) => {
    /* e.preventDefault() prevents the default form submission
     behavior, which would cause a page refresh. */
    e.preventDefault();
    console.log({ reply }); // Logging the reply content for debugging purposes
    // Call the addReply function to submit the new reply.
    addReply();
    // Clear the reply input field after submission.
    setReply("");
  };
  // Event handler for canceling the reply submission.
  const handleCancel = (e) => {
    /* e.preventDefault() prevents the default form submission
     behavior, which would cause a page refresh. */
    e.preventDefault();
    // Clear the reply input field.
    setReply("");
    /*navigate("/dashboard") is used to navigate the user back to the 
    dashboard after canceling the reply submission. */
    navigate("/dashboard");
  };

  /*
  - JSX rendering of the Replies component.
  - The JSX structure represents the layout of the Replies component. 
  It includes a form for submitting new replies and a container to display 
  existing replies.
  */
  return (
    <main className="replies">
      {/* Form for submitting a new reply */}
      <form className="modal__content" onSubmit={handleSubmitReply}>
        <label htmlFor="reply">Reply to the thread</label>
        {/* Textarea for entering the reply content */}
        <textarea
          rows={5}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          type="text"
          name="reply"
          className="modalInput"
        />
        {/* Button to submit the reply */}
        <button className="modalBtn">SEND</button>
        {/* Button to cancel the reply submission */}
        <button className="modalBtn" onClick={handleCancel}>
          CANCEL
        </button>
      </form>
      {/* Display container for the list of replies */}
      <div className="thread__container">
        {/*
        Mapping over the replyList to display individual reply items
        The replyList is mapped over to display individual reply items in the
        designated container, showing the text content of each reply along with 
        the author's name with reduced opacity.      
        */}
        {replyList.map((reply) => (
          <div className="thread__item">
            {/* Displaying the text content of the reply */}
            <p>{reply.text}</p>
            <div className="react__container">
              {/* Displaying the author of the reply with reduced opacity */}
              <p style={{ opacity: "0.5" }}>by {reply.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Replies;
