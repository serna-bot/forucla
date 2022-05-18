import express from 'express';

import { login, handleGoogleRedirect, getValidToken } from '../controllers/login.js';

const router = express.Router();

router.post('/', login);
router.get('/handleGoogleRedirect', handleGoogleRedirect);
router.post('/getValidToken', getValidToken);

export default router;
