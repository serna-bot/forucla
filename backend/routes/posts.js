import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost, upvotePost, downvotePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.patch('/:id/upvotePost', upvotePost);
router.patch('/:id/downvotePost', downvotePost);

// POTENTIAL FUNCTIONALITY
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
