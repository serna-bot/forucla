import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).jsoon({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const upvotePost = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  if (user === '') {
    return res.json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const upvoteIndex = post.upvoteCount.findIndex((id) => id === user);
  const downvoteIndex = post.downvoteCount.findIndex((id) => id === user);

  if (upvoteIndex === -1) {
    post.upvoteCount.push(user);
    if (downvoteIndex !== -1) {
      post.downvoteCount = post.downvoteCount.filter((id) => id !== user);
    }
  } else {
    post.upvoteCount = post.upvoteCount.filter((id) => id !== user);
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.status(200).json(updatedPost);
};

export const downvotePost = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  if (user === '') {
    return res.json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const upvoteIndex = post.upvoteCount.findIndex((id) => id === user);
  const downvoteIndex = post.downvoteCount.findIndex((id) => id === user);

  if (downvoteIndex === -1) {
    post.downvoteCount.push(user);
    if (upvoteIndex !== -1) {
      post.upvoteCount = post.upvoteCount.filter((id) => id !== user);
    }
  } else {
    post.downvoteCount = post.downvoteCount.filter((id) => id !== user);
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.unshift(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
};

// POTENTIAL FUNCTIONALITY

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Invalid post id');
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Invalid post id');
  }
  await PostMessage.findByIdAndRemove(_id);
  res.json({ message: 'Post deleted successfully' });
};
