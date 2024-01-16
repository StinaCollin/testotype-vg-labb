import nock from "nock";
import { geocodeAddress } from "../src/geocoding";

// 4. I mitt femte test, vill jag testa att jag får tillbaka koordinater för en giltig adress och null vid ogiltig adress

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
