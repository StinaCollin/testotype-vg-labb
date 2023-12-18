

export function validateEmail(email: string): boolean {
    // En enkel validering av e-postadressen, tillåter bara bokstäver, siffror, bindestreck, understreck, en @ och en punkt
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  export function validateZipCode(zipCode: string): boolean {
    // En enkel validering av postnummer, tillåter bara 5 siffror
    const zipCodeRegex = /^\d{5}$/;
    return zipCodeRegex.test(zipCode);
  }
  
  export function validatePersonalNumber(personalNumber: string): boolean {
    // En enkel validering av personnummer, tillåter bara 12 siffror och ett bindestreck
    const personalNumberRegex = /^\d{6}-\d{4}$/;
    return personalNumberRegex.test(personalNumber);
  }
  
  export function validateText(text: string): boolean {
    // En enkel validering av text (tillåter bokstäver och siffror)
    const textRegex = /^[a-zA-Z0-9\s]+$/;
    return textRegex.test(text);
  }
  