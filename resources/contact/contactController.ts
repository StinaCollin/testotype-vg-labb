import { Request, Response } from 'express';
import Contact from './contactModel';

class ContactController { // skapar en klass som heter ContactController som ska innehålla mina endpoints
  async getAllContacts(req: Request, res: Response): Promise<void> {
    try {
      console.log('Before fetching contacts from MongoDB');
      const contacts = await Contact.find();
      console.log('After fetching contacts from MongoDB');
      res.status(200).json(contacts);
    } catch (error) {
      console.error('MongoDB error:', error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ContactController;
