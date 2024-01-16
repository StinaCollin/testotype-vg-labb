import mongoose, { Document } from 'mongoose';

interface IContact extends Document {
  firstname: string;
  lastname: string;
  email: string;
  personalnumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  personalnumber: String,
  address: String,
  zipCode: String,
  city: String,
  country: String,
});

const Contact = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;
