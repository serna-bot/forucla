import { useEffect, useState } from 'react';
import './IndivPosts.scss';

function IndivPosts(props) {
  let timeString = "";
  let time = new Date(props.createdAt);
  let currTime = new Date();
  let ms = currTime.getTime() - time.getTime();
  let t;
  if (ms < 60*1000) {
    t = Math.floor(ms/1000);
    if (t === 1) {
      timeString = t + " second ago";
    }
    timeString = t + " seconds ago";
  }
  else if (ms < 60*60*1000) {
    t = Math.floor(ms/60/1000);
    if (t === 1) {
      timeString = t + " minute ago";
    }
    timeString = t + " minutes ago";
  }
  else if (ms < 24*60*60*1000) {
    t = Math.floor(ms/60/60/1000);
    if (t === 1) {
      timeString = t + " hour ago";
    }
    timeString = t + " hours ago";
  }
  else if (ms < 7*24*60*60*1000) {
    t = Math.floor(ms/24/60/60/1000);
    if (t === 1) {
      timeString = t + " day ago";
    }
    timeString = t + " days ago";
  }
  else if (ms < 4*7*24*60*60*1000) {
    t = Math.floor(ms/7/24/60/60/1000);
    if (t === 1) {
      timeString = t + " week ago";
    }
    timeString = t + " weeks ago";
  }
  else if (ms < 12*4*7*24*60*60*1000) {
    t = Math.floor(ms/4/7/24/60/60/1000);
    if (t === 1) {
      timeString = t + " month ago";
    }
    timeString = t + " months ago";
  }
  else {
    t = Math.floor(ms/12/4/7/24/60/60/1000);
    if (t === 1) {
      timeString = t + " year ago";
    }
    timeString = t + " years ago";
  }
  
  return (
    <div className='post-indiv-container'>
      <div>
        <div className='post-descript'>
          <div className='title-text-container'>
            <div id="post_header">
              <p> {props.channel}</p> <p> {props.creator} </p> <p> {timeString} </p>
            </div>
            <h2>{props.title}</h2>
            <p> {props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndivPosts;
