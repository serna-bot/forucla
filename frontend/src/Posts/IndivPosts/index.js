import { useEffect, useState } from 'react';
import './IndivPosts.scss';

function IndivPosts(props) {
  return (
    <div className='post-indiv-container'>
      <div>
        <div className='post-descript'>
          <div className='title-text-container'>
            <div>
              This is a post:
              <h2>{props.title}</h2>
            </div>
            <p> {props.message}</p>
            <p> {props.channel}</p>
            <p> {props.creator} </p>
            <p> {props.createdAt} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndivPosts;
