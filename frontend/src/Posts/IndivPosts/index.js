import { useEffect, useState } from 'react';
import './IndivPosts.scss';
import upvote from '../../assets/upvote.png';
import downvote from '../../assets/downvote.png'
import downvoteclicked from '../../assets/downvoteclicked.png';
import upvoteclicked from '../../assets/upvoteclicked.png'

import { useNavigate } from 'react-router-dom';
import { getLogo } from '../../shared/getLogo';
import { handleTime } from '../../shared/handleTime';

function IndivPosts(props) {
  let navigate = useNavigate();
  let timeString = handleTime(props.createdAt);

  const openPost = () => {
    navigate(`/posts/${props._id}`);
  };

  let [dvImg, setDvImg] = useState(downvote);
  let [upImg, setUpImg] = useState(upvote);
  let [upCount, setUpCount] = useState(1);
  //awiat and get the upvote count
  const handleUpvote = () => {
    if (dvImg === downvoteclicked) {
      setUpCount(++upCount);
      console.log("removing downvote", upCount);
      setDvImg(downvote);
    }
    if (upImg === upvote) {
      setUpCount(++upCount);
      console.log("upvoting", upCount);
      setUpImg(upvoteclicked);
    }
    else {
      setUpCount(--upCount);
      setUpImg(upvote);
    }
  };

  const handleDownvote = () => {
    if (upImg === upvoteclicked) {
      setUpCount(--upCount);
      setUpImg(upvote);
    }
    if (dvImg === downvote) {
      setUpCount(--upCount);
      setDvImg(downvoteclicked);
    }
    else {
      setUpCount(++upCount);
      setDvImg(downvote);
    }
  };

  return (
    <div>
      <div className='post-updown-container'>
        <div className='up-down-buttons'>
          <button onClick={handleUpvote}><img src={upImg}></img></button>
          {(() => {
            if (upImg === upvoteclicked) return <p id='upvoted-text'>{upCount}</p>;
            else if (dvImg === downvoteclicked) return <p id='downvoted-text'>{upCount}</p>;
            else
              return <p>{upCount}</p>;
          })()}
          <button onClick={handleDownvote}><img src={dvImg}></img></button>
        </div>
        <div className='post-indiv-container'>
          <div>
            <div className='title-text-container' onClick={openPost}>
              <div id="post_header">
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
