import React from 'react';
import './PostPage.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../shared/Header';

import * as api from '../api/index.js';

import upvote from '../assets/upvote.png';
import downvote from '../assets/downvote.png';
import downvoteclicked from '../assets/downvoteclicked.png';
import upvoteclicked from '../assets/upvoteclicked.png';

import { getLogo } from '../shared/getLogo.js';
import { handleTime } from '../shared/handleTime.js';

import CommentSection from './CommentSection';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  let timeString;
  let [dvImg, setDvImg] = useState(downvote);
  let [upImg, setUpImg] = useState(upvote);
  let [upCount, setUpCount] = useState(1);
  //awiat and get the upvote count
  const handleUpvote = () => {
    if (dvImg === downvoteclicked) {
      setUpCount(++upCount);
      console.log('removing downvote', upCount);
      setDvImg(downvote);
    }
    if (upImg === upvote) {
      setUpCount(++upCount);
      console.log('upvoting', upCount);
      setUpImg(upvoteclicked);
    } else {
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
    } else {
      setUpCount(++upCount);
      setDvImg(downvote);
    }
  };
  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await api.fetchPost(id);
        setPost(post.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPost();
  }, [id]);

  if (post === undefined) return null;
  else {
    timeString = handleTime(post.createdAt);
    console.log(post);
  }

  return (
    <div>
      <Header />
      <div className='post-comments-container'>
        <div className='whole-main-post-container'>
          <div className='up-down-buttons'>
            <button onClick={handleUpvote}>
              <img src={upImg}></img>
            </button>
            {(() => {
              if (upImg === upvoteclicked) return <p id='upvoted-text'>{upCount}</p>;
              else if (dvImg === downvoteclicked) return <p id='downvoted-text'>{upCount}</p>;
              else return <p>{upCount}</p>;
            })()}
            <button onClick={handleDownvote}>
              <img src={dvImg}></img>
            </button>
          </div>
          <div className='main-post-container'>
            <div>
              <div>
                <div id='main-post-header'>
                  <img src={getLogo(post.channel)} alt='logo'></img>
                  <p id='channel'> {post.channel}</p> <span id='dot'></span> <p> Posted by: {post.creator} </p> <span id='dot'></span> <p> {timeString} </p>
                </div>
                <div className='post-text'>
                  <h4>{post.title}</h4>
                  <div id='message'>
                    <p> {post.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommentSection post={post} />
      </div>
    </div>
  );
};

export default Post;
