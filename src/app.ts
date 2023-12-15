import express from 'express';

const app = express();

app.use(express.json());


app.get('/', (req, res) => {  // skriver sedan en rotendpoint som skickar tillbaka status och ett meddelande och gör sedan mitt första test
  res.status(200).send('Welcome to my API!');
});

// I mitt andra test, POST, vill jag testa att jag får tillbaka statuskod 201 vid giltig input, och statuskod 400 vid ogiltig input
app.post('/contact', (req, res) => {
    const { firstname, lastname, email, personalnumber, address, zipCode, city, country } = req.body;
  
    if (!firstname) {
      return res.status(400).json([{ error: 'firstname is missing' }]);
    }
  
    if (!lastname) {
      return res.status(400).json([{ error: 'lastname is missing' }]);
    }
  
    res.status(201).json({});
  });

  
  app.use((req, res) => {
    res.status(404).send('Not found');
  }); 

export default app;
  