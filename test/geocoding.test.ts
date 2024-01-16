import nock from "nock";
import { geocodeAddress } from "../src/geocoding";

// I mitt femte test, vill jag testa att jag får tillbaka koordinater för en giltig adress och null vid ogiltig adress
// I mitt femte test, GET/contacts, vill jag testa Testa att hämta kontakter och koordinater från databasen.
// Mocka Geocoding API-anropet för att returnera önskade koordinater.
// Se till att kontakter i svaret har de förväntade koordinaterna.
// Öka testtäckningen och förbättra testens robusthet.
// så att jag får tillbaka statuskod 200 och en lista med kontakter och koordinater
describe("Geocoding API", () => {
  beforeAll(() => { // innan alla test så mockar jag ut en endpoint som jag sedan kan använda i mina tester
    nock("https://api.api-ninjas.com")
      .get("/api/geocoding")
      .query({ address: "Utvecklargatan 12, 111 22 Stockholm, Sweden" })
      .reply(200, { lat: 59.3251172, lng: 18.0710935 });
  });

  it("should return coordinates for a valid address", async () => { // skriver sedan ett test för att se att jag får tillbaka koordinater för en giltig adress
    const coordinates = await geocodeAddress("Utvecklargatan 12, 111 22 Stockholm, Sweden");
    expect(coordinates).toEqual({ lat: 59.3251172, lng: 18.0710935 });
  });

  it("should handle errors gracefully", async () => {
    nock.cleanAll(); // Tar bort alla tidigare nock intercepts, så att vi kan skapa en ny
    nock("https://api.api-ninjas.com")
      .get("/api/geocoding")
      .query({ address: "InvalidAddress" })
      .reply(500);

    const coordinates = await geocodeAddress("InvalidAddress"); // skriver sedan ett test för att se att jag får tillbaka null vid ogiltig adress
    expect(coordinates).toBeNull();
  });
});
