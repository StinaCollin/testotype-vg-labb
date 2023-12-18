import request from 'supertest';
import nock from 'nock'; 
import app from '../src/app';

// I mitt femte test, GET/contacts, vill jag testa Testa att hämta kontakter och koordinater från databasen.
// Mocka Geocoding API-anropet för att returnera önskade koordinater.
// Se till att kontakter i svaret har de förväntade koordinaterna.
// Öka testtäckningen och förbättra testens robusthet.
// så att jag får tillbaka statuskod 200 och en lista med kontakter och koordinater


describe('GET /contact', () => {
  it('should return contacts with coordinates', async () => {
    nock('https://api-ninjas.com')
      .get('/api/geocoding')
      .query({ address: 'Utvecklargatan 12' })
      .reply(200, { lat: 59.3251172, lng: 18.0710935 });

    // Simulera att databasen innehåller kontakter med koordinater
    const contactsWithCoordinates = [
      {
        id: '638cfd06f84b41a7be61ebad',
        firstname: 'Anna',
        lastname: 'Andersson',
        email: 'anna.andersson@gmail.com',
        personalnumber: '550713-1405',
        address: 'Utvecklargatan 12',
        zipCode: '111 22',
        city: 'Stockholm',
        country: 'Sweden',
        lat: 59.3251172,
        lng: 18.0710935,
      },
      {
        "id": "638cfd06f84b41a7be61eadb",
        "firstname": "Erik",
        "lastname": "Eriksson",
        "email": "erik.eriksson@gmail.com",
        "personalnumber": "740301-1405",
        "address": "Utvecklargatan 12",
        "zipCode": "111 22",
        "city": "Stockholm",
        "country": "Sweden",
        "lat": 59.3251172,
        "lng": 18.0710935
      },
    ];

    // Mocka anropet till databasen, använd mockResolvedValue för att returnera ett värde samt jest.spyOn för att kunna hålla koll på funktionen
    jest.spyOn(database, 'getContacts').mockResolvedValue(contactsWithCoordinates);

    const response = await request(app).get('/contact');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(contactsWithCoordinates);
  });

  it('should return 404 if contact not found', async () => {
    nock('https://api-ninjas.com')
      .get('/api/geocoding')
      .query({ address: 'Unknown Address' }) // Simulera en okänd adress
      .reply(404);

    // Mocka anropet till databasen för att returnera INGEN kontakt
    jest.spyOn(database, 'getContacts').mockResolvedValue([]);

    const response = await request(app).get('/contact');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Contacts not found' });
  });

  it('should handle Geocoding API error', async () => {
    // Mocka Geocoding API-anropet för att returnera ett FEL
    nock('https://api-ninjas.com')
      .get('/api/geocoding')
      .query({ address: 'Utvecklargatan 12' })
      .reply(500, { error: 'Geocoding API error' });

    // Mocka anropet till databasen för att returnera kontakter med koordinater
    jest.spyOn(database, 'getContacts').mockResolvedValue([
        {
            id: '638cfd06f84b41a7be61ebad',
            firstname: 'Anna',
            lastname: 'Andersson',
            email: 'anna.andersson@gmail.com',
            personalnumber: '550713-1405',
            address: 'Utvecklargatan 12',
            zipCode: '111 22',
            city: 'Stockholm',
            country: 'Sweden',
        },
    ]);

    const response = await request(app).get('/contact');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Geocoding API error' });
  });
});
