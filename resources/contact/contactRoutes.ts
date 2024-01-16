import express from 'express';
import ContactController from './contactController';

const router = express.Router();
const contactController = new ContactController();

// Endpoint för att hämta alla kontakter
router.get('/', contactController.getAllContacts);

export default router;
