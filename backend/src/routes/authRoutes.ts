import express from 'express';

import {
  singUp,
  logIn,
  forgotPassword,
  resetPassword,
} from '../Controllers/authController';

const router = express.Router();

router.post('/sign-up', singUp);
router.post('/login', logIn);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

export default router;
