import express from 'express';

import { singUp } from '../Controllers/authController';

const router = express.Router();

router.post('/sign-up', singUp);

export default router;
