import axios from "axios";

type GeocodingResponseType = { // skapar en type för att kunna använda den i min funktion
  lat: number;
  lng: number;
};

export const geocodeAddress = async (address: string): Promise<GeocodingResponseType | null> => { // skapar en funktion som tar in en adress och returnerar lat och lng
  try {
    const { data } = await axios.get<GeocodingResponseType>( // använder axios för att göra ett anrop till geocoding API:et
      `https://api.api-ninjas.com/api/geocoding?address=${encodeURIComponent(address)}`
    );
    return data;
  } catch (error) { // om det blir något fel så loggar jag ut det och returnerar null
    console.error("Geocoding error:", error);
    return null;
  }
};
