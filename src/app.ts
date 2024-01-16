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

  app.post('/contact', async (req, res) => {
    const { firstname, lastname, email, personalnumber, address, zipCode, city, country } = req.body;

    if (!firstname || !lastname || !email || !personalnumber || !address || !zipCode || !city || !country) {
        return res.status(400).json([{ error: 'Invalid input. Please provide all required fields.' }]);
    }

    // Utför en geokodning för att få ut lat och lng för den adress som skickas in
    const coordinates = await geocodeAddress(address);

    if (!coordinates) {
        return res.status(500).json({ error: 'Error fetching coordinates' });
    }

    // Sparar sedan ner mina kontakter i min "databas" 
    const contact = await new Contact({
        firstname,
        lastname,
        email,
        personalnumber,
        address,
        zipCode,
        city,
        country,
        lat: coordinates.lat,
        lng: coordinates.lng,
    }).save();

    res.status(201).json(contact);
});

  
  app.use((req, res) => {  
    res.status(404).send('Not found');
  }); 

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // lägger in ett error middleware som fångar upp alla fel
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  

export default app;
  