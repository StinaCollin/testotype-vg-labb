import axios from 'axios';

export async function makeHttpRequest(url: string, params: any): Promise<any> {  // skapar en funktion som tar in en url och params och returnerar ett promise
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw new Error('HTTP request failed');
  }
}