import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost, upvotePost, downvotePost, commentPost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.patch('/:id/upvotePost', upvotePost);
router.patch('/:id/downvotePost', downvotePost);
router.post('/:id/commentPost', commentPost);

// POTENTIAL FUNCTIONALITY
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
