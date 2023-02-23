// modules import
import express from 'express';

// controllers import
import { verifyToken } from '../Controllers/authController';
import {
  getMessages,
  addMessage,
  getContactLastMessages,
} from '../Controllers/messageController';

// utils import

const router = express.Router();

router.use(verifyToken);

router.post('/add-message', addMessage);
router.get('/:userId', getMessages);
router.get('/last-message/:contactId', getContactLastMessages);

export default router;
