import Contact from "./resources/contact/contactModel";

export const database = { // skapar en databas som ska innehålla mina endpoints
  getContacts: async () => {
    try {
      const contacts = await Contact.find();
      return contacts;
    } catch (error) {
      console.error('MongoDB error:', error);
      throw new Error('Failed to fetch contacts');
    }
  },
};
