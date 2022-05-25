import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as api from '../api/index.js';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      const post = await api.fetchPost(id);
      setPost(post.data);
    };
    getPost();
  }, [id]);

  if (!post) return null;
  else console.log(post);

  return (
    <div>
      <h1>post page</h1>
      <h1>{post.title}</h1>
    </div>
  );
};

export default Post;
