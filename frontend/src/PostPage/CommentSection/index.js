import React, { useState, useRef } from 'react';
import * as api from '../../api/index.js';
import "./CommentSection.scss"
import speech_bubble from "../../assets/speech_bubble.png"

const CommentSection = ({ post }) => {
  console.log(post);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = sessionStorage.getItem('username');
  let submitStringPlaceholder = "Submit a comment"
  if (sessionStorage.getItem('username') === "") {
    submitStringPlaceholder = "You must be logged in to comment."
  }
  
  const handleClick = async () => {
    const finalComment = `${user}: ${comment}`;
    try {
      const { data } = await api.comment(finalComment, post._id);
      console.log('Commented!');
      console.log(data);
      setComments(data.comments);
      setComment('');
      document.getElementById('comment_input').value = '';
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div id='submit-comment'>
        <textarea id='comment_input' placeholder={submitStringPlaceholder} onChange={(e) => setComment(e.target.value)}></textarea>
        {sessionStorage.getItem('username') !== "" && 
          <button onClick={handleClick}>Submit</button>
        }
      </div>
      <div id='comment-container'>
        {comments.map((c, i) => (
          <div id='comment'>
            <img src={speech_bubble} alt="speech_bubble"></img>
            <p key={i}>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
