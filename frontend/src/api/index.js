import axios from 'axios';

const url = 'http://localhost:4000/posts';

export const fetchPost = (id) => axios.get(`${url}/${id}`);
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const upvotePost = (user, id) => axios.patch(`${url}/${id}/upvotePost`, { user });
export const downvotePost = (user, id) => axios.patch(`${url}/${id}/downvotePost`, { user });
export const comment = (value, id) => axios.post(`${url}/${id}/commentPost`, { value });

// POTENTIAL FUNCTIONALITY
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
