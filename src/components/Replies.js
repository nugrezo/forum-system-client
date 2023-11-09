import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Replies = () => {
  const [replyList, setReplyList] = useState([]);
  const [reply, setReply] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchReplies = () => {
      fetch(
        "https://forum-system-7877dc8bc5ee.herokuapp.com/api/thread/replies",
        {
          method: "POST",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setReplyList(data.replies);
        })
        .catch((err) => console.error(err));
    };
    fetchReplies();
  }, [id]);

  const addReply = () => {
    fetch("https://forum-system-7877dc8bc5ee.herokuapp.com/api/create/reply", {
      method: "POST",
      body: JSON.stringify({
        id,
        userId: localStorage.getItem("_id"),
        reply,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    console.log({ reply });
    addReply();
    setReply("");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setReply("");
    navigate("/dashboard");
  };

  return (
    <main className="replies">
      <form className="modal__content" onSubmit={handleSubmitReply}>
        <label htmlFor="reply">Reply to the thread</label>
        <textarea
          rows={5}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          type="text"
          name="reply"
          className="modalInput"
        />
        <button className="modalBtn">SEND</button>
        <button className="modalBtn" onClick={handleCancel}>
          CANCEL
        </button>
      </form>

      <div className="thread__container">
        {replyList.map((reply) => (
          <div className="thread__item">
            <p>{reply.text}</p>
            <div className="react__container">
              <p style={{ opacity: "0.5" }}>by {reply.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Replies;
