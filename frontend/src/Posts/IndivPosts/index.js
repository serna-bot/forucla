import { useEffect, useState } from 'react';
import './IndivPosts.scss';

import { useNavigate } from 'react-router-dom';
import { getLogo } from '../../shared/getLogo';

function IndivPosts(props) {
  let navigate = useNavigate();

  let timeString = '';
  let time = new Date(props.createdAt);
  let currTime = new Date();
  let ms = currTime.getTime() - time.getTime();
  let t;
  if (ms < 60 * 1000) {
    t = Math.floor(ms / 1000);
    if (t === 1) {
      timeString = t + ' second ago';
    } else {
      timeString = t + ' seconds ago';
    }
  } else if (ms < 60 * 60 * 1000) {
    t = Math.floor(ms / 60 / 1000);
    if (t === 1) {
      timeString = t + ' minute ago';
    } else {
      timeString = t + ' minutes ago';
    }
  } else if (ms < 24 * 60 * 60 * 1000) {
    t = Math.floor(ms / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' hour ago';
    } else {
      timeString = t + ' hours ago';
    }
  } else if (ms < 7 * 24 * 60 * 60 * 1000) {
    t = Math.floor(ms / 24 / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' day ago';
    } else {
      timeString = t + ' days ago';
    }
  } else if (ms < 4 * 7 * 24 * 60 * 60 * 1000) {
    t = Math.floor(ms / 7 / 24 / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' week ago';
    } else {
      timeString = t + ' weeks ago';
    }
  } else if (ms < 12 * 4 * 7 * 24 * 60 * 60 * 1000) {
    t = Math.floor(ms / 4 / 7 / 24 / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' month ago';
    } else {
      timeString = t + ' months ago';
    }
  } else {
    t = Math.floor(ms / 12 / 4 / 7 / 24 / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' year ago';
    } else {
      timeString = t + ' years ago';
    }
  }

  const openPost = () => {
    navigate(`/posts/${props._id}`);
  };

  return (
    <div>
      <div className='post-updown-container'>
        <div className='up-down-buttons'>
          <img></img>
          <img></img>
        </div>
        <div className='post-indiv-container' onClick={openPost}>
          <div>
            <div className='title-text-container'>
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
