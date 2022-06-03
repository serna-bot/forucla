import { useEffect, useState, useTransition } from 'react';
import './IndivPosts.scss';
import upvote from '../../assets/upvote.png';
import downvote from '../../assets/downvote.png';
import downvoteclicked from '../../assets/downvoteclicked.png';
import upvoteclicked from '../../assets/upvoteclicked.png';

import { useNavigate } from 'react-router-dom';
import { getLogo } from '../../shared/getLogo';
import { handleTime } from '../../shared/handleTime';

import * as api from '../../api/index.js';

function IndivPosts(props) {
  let navigate = useNavigate();
  let timeString = handleTime(props.createdAt);

  const openPost = () => {
    navigate(`/posts/${props._id}`);
  };

  const user = sessionStorage.getItem('username');
  const likeCount = props.upvoteCount.length - props.downvoteCount.length;

  let [isUpvoted, setIsUpvoted] = useState(props.upvoteCount.includes(user));
  let [isDownvoted, setIsDownvoted] = useState(props.downvoteCount.includes(user));
  let [count, setCount] = useState(likeCount);

  // useEffect(() => {
  //   setCount(likeCount + isUpvoted - isDownvoted);
  // }, [isUpvoted, isDownvoted]);

  //await and get the upvote count
  const handleUpvote = async () => {
    if (user === '') {
      return;
    }

    try {
      const { data } = await api.upvotePost(user, props._id);
      console.log('Upvote Clicked!');
      setIsUpvoted(!isUpvoted);
      if (isDownvoted) setIsDownvoted(false);
      setCount(data.upvoteCount.length - data.downvoteCount.length);
      console.log(props.upvoteCount);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDownvote = async () => {
    if (user === '') {
      return;
    }

    try {
      const { data } = await api.downvotePost(user, props._id);
      console.log('Downvote Clicked!');
      setIsDownvoted(!isDownvoted);
      if (isUpvoted) setIsUpvoted(false);
      setCount(data.upvoteCount.length - data.downvoteCount.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className='post-updown-container'>
        <div className='up-down-buttons'>
          <button onClick={handleUpvote}>
            <img src={isUpvoted ? upvoteclicked : upvote} alt=''></img>
          </button>
          {(() => {
            if (isUpvoted) return <p id='upvoted-text'>{count}</p>;
            else if (isDownvoted) return <p id='downvoted-text'>{count}</p>;
            else return <p>{count}</p>;
          })()}
          <button onClick={handleDownvote}>
            <img src={isDownvoted ? downvoteclicked : downvote} alt=''></img>
          </button>
        </div>
        <div className='post-indiv-container'>
          <div>
            <div className='title-text-container' onClick={openPost}>
              <div id='post_header'>
                <img src={getLogo(props.channel)} alt='logo'></img>
                <p id='channel'> {props.channel}</p> <span id='dot'></span> <p> Posted by: {props.creator} </p> <span id='dot'></span> <p> {timeString} </p>
              </div>
              <div className='post-descript'>
                <h4>{props.title}</h4>
                <div id='message'>
                  <p> {props.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndivPosts;
