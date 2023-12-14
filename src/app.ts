import express from 'express';

const app = express();

app.get('/', (req, res) => { // skriver sedan en rotendpoint som skickar tillbaka status och ett meddelande och gör sedan mitt första test
  res.status(200).send('Welcome to my API!');
});

export default app;