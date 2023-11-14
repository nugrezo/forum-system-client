import React from "react";
import { useNavigate } from "react-router-dom";

/*
-This code defines a functional React component called Comments. 
-It receives two props, numberOfComments and threadId, as parameters. 
-These props are likely used to determine the number of comments associated with
 a specific thread.
-The purpose of this component is to display the number of comments for a given 
thread. The actual rendering and functionality are not provided in the provided
snippet, but based on the name and props, it's likely that this component is 
responsible for rendering and handling comments associated with a specific thread 
in a forum-like application. The details of how comments are displayed or 
interacted with would be implemented within the component logic.
*/
const Comments = ({ numberOfComments, threadId }) => {
  // useNavigate is a hook from React Router for navigation
  const navigate = useNavigate();
  /*
  - Function to handle adding a comment, navigates to the replies page for
  the specific thread
  - This is a function that is triggered when the user interacts with the comment 
  icon. It uses the navigate function from React Router to navigate to a specific 
  URL.
  - navigate(/${threadId}/replies): This line of code uses the navigate function 
  to redirect the user to a URL constructed based on the threadId. 
  It appends /replies to the end of the URL, indicating that the user is 
  navigating to the replies section of the specific thread.
*/
  const handleAddComment = () => {
    navigate(`/${threadId}/replies`);
  };
  /*
  The code returns a JSX structure representing a container for the comment 
  icon and the number of comments.
  */
  return (
    <div className="likes__container">
      {/*
        - The svg element contains the path data for an icon
        (comment icon in this case).
        - The onClick attribute is set to the handleAddComment function, 
        indicating that the handleAddComment function should be called when 
        the icon is clicked.
      */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 likesBtn"
        onClick={handleAddComment}
      >
        {/* 
        - SVG path representing the comment icon 
        */}
        <path
          fillRule="evenodd"
          d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
          clipRule="evenodd"
        />
      </svg>
      {/* 
      - Display the number of comments, or an empty string if there are none 
      - The p element displays the number of comments, or an empty string if there are none.
       The color is set to "#434242".
       - This is a ternary operator, a concise way to write an if-else statement in JavaScript.
       - It checks if numberOfComments is equal to 0.
        If true, an empty string is rendered ("").
        If false, the value of numberOfComments is rendered.
        So, the paragraph will display the number of comments (numberOfComments) 
        if it's greater than 0, and it won't display anything (an empty string)
         if there are no comments (when numberOfComments is 0). The text color of 
         the paragraph is set to #434242.
       */}
      <p style={{ color: "#434242" }}>
        {numberOfComments === 0 ? "" : numberOfComments}
      </p>
    </div>
  );
};

export default Comments;
