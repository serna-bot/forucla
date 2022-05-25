import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../shared/Header'
import IndivPosts from '../Posts/IndivPosts';

import * as api from '../api/index.js';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

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

  if (!post) return null;
  else console.log(post);

  return (
    <div>
      <Header/>
      <h1>post page</h1>
      <IndivPosts _id={post._id} title={post.title} message={post.message} channel={post.channel} creator={post.creator} createdAt={post.createdAt} />
    </div>
  );
};

export default Post;
