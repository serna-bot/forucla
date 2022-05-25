import { useEffect, useState } from 'react';
import './IndivPosts.scss';
import clubreclogo from '../../assets/clubreclogo.png';
import conflogo from '../../assets/conflogo.png';
import memelogo from '../../assets/memelogo.png';
import relationshiplogo from '../../assets/relationshiplogo.png';
import schooladvicelogo from '../../assets/schooladvicelogo.png';
import sportslogo from '../../assets/sportslogo.png';

import { useNavigate } from 'react-router-dom';

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

  let image;
  let altImage;
  let channel = props.channel;
  if (channel === 'Memes') {
    image = memelogo;
    altImage = 'memeLogo';
  } else if (channel === 'School Advice') {
    image = schooladvicelogo;
    altImage = 'saLogo';
  } else if (channel === 'Confessions') {
    image = conflogo;
    altImage = 'confLogo';
  } else if (channel === 'Relationships') {
    image = relationshiplogo;
    altImage = 'relaLogo';
  } else if (channel === 'Club Recruitment') {
    image = clubreclogo;
    altImage = 'crLogo';
  } else if (channel === 'Sports') {
    image = sportslogo;
    altImage = 'sportsLogo';
  }

  const openPost = () => {
    navigate(`/posts/${props._id}`);
  };

  return (
    <div className='post-indiv-container' onClick={openPost}>
      <div className='title-text-container'>
        <div id='post_header'>
          <img src={image} alt={altImage}></img>
          <p id='channel'> {props.channel}</p> <span id='dot'></span> <p> Posted by: {props.creator} </p> <span id='dot'></span> <p> {timeString} </p>
        </div>
        <div className='post-descript'>
          <h4>{props.title}</h4>
          <p> {props.message}</p>
        </div>
      </div>
    </div>
  );
}

export default IndivPosts;
