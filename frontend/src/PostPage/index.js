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
import IndivPosts from '../Posts/IndivPosts';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  let timeString;

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
        <IndivPosts post={post} styling='postPage' />
        <CommentSection post={post} />
      </div>
    </div>
  );
};

export default Post;
