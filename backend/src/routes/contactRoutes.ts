// Modules imports
import express from 'express';

// Controllers imports
import {
  searchContacts,
  addContact,
  getContacts,
} from '../Controllers/contactController';
import { verifyToken } from '../Controllers/authController';

const router = express.Router();

router.use(verifyToken);

router.get('/list-of-contacts', searchContacts);
router.post('/add-contact', addContact);
router.get('/all-contacts', getContacts);

export default router;
