import request from 'supertest';
import app from '../src/app';

// I mitt första test GET, vill jag testa att jag får tillbaka statuskod 200 och ett meddelande, från mitt API
describe('GET /', () => {
  it('should return status code 200 and a welcome message', async () => {  // Test för rotendpointen
    const response = await request(app).get('/');

    expect(response.status).toBe(200);  // Förväntar mig att få tillbaka statuskod 200
    expect(response.text).toBe('Welcome to my API!');  // Förväntar mig att få tillbaka mitt meddelande
  });

   
});

