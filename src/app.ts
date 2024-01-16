import express, { Request, Response, NextFunction } from 'express';
import  Contact  from '../resources/contact/contactModel';
import { geocodeAddress } from './geocoding';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {  // skriver en rotendpoint som skickar tillbaka status och ett meddelande och gör sedan mitt första test
  res.status(200).send('Welcome to my API!');
});

// I mitt andra test, POST, vill jag testa att jag får tillbaka statuskod 201 vid giltig input, och statuskod 400 vid ogiltig input
// 3. I mitt tredje test, POST/contacts, utökar jag mina tester för invalid input's för resterande fält, och förväntar mig att få tillbaka ett felmeddelande och statuskod 400
// så lägger in error meddelanden vid test för resterande fält
app.post('/contact', (req, res) => {
    const { firstname, lastname, email, personalnumber, address, zipCode, city, country } = req.body;
  
    if (!firstname) {
      return res.status(400).json([{ error: 'firstname is missing' }]);
    }
  
    if (!lastname) {
      return res.status(400).json([{ error: 'lastname is missing' }]);
    }

    if (!email) {
      return res.status(400).json([{ error: 'email is missing' }]);
    }
  
    if (!personalnumber) {
      return res.status(400).json([{ error: 'personalnumber is missing' }]);
    }

    if (!address) {
      return res.status(400).json([{ error: 'address is missing' }]);
    }
  
    if (!zipCode) {
      return res.status(400).json([{ error: 'zipCode is missing' }]);
    }

    if (!city) {
      return res.status(400).json([{ error: 'city is missing' }]);
    }
  
    if (!country) {
      return res.status(400).json([{ error: 'country is missing' }]);
    }

    res.status(201).json({}); 
  });
  
  app.use((req, res) => {  
    res.status(404).send('Not found');
  }); 

export default app;
  