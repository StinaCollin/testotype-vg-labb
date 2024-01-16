import {
    validateEmail,
    validateZipCode,
    validatePersonalNumber,
    validateText,
  } from '../src/validation';
  
    // Fjärde testet, blir en ny fil för test validering, här testas att jag får tillbaka true för en giltig email, zip, pers.nr & text och false för en ogiltig email/zip/pers.nr/text

  describe('Validation Functions', () => {  // skriver sedan ett test för att se att jag får tillbaka true för en giltig email
    describe('validateEmail', () => {
      it('should return true for a valid email', () => {
        const result = validateEmail('test@example.com');
        expect(result).toBe(true);
      });
  
      it('should return false for an invalid email', () => {  // Returnerar false för en ogiltig email, och samma nedan för de olika testerna
        const result = validateEmail('invalid-email');
        expect(result).toBe(false);
      });
    });
  
    describe('validateZipCode', () => {
      it('should return true for a valid zip code', () => {
        const result = validateZipCode('12345');
        expect(result).toBe(true);
      });
  
      it('should return false for an invalid zip code', () => {
        const result = validateZipCode('invalid-zip-code');
        expect(result).toBe(false);
      });
    });
  
    describe('validatePersonalNumber', () => {
      it('should return true for a valid personal number', () => {
        const result = validatePersonalNumber('550713-1405');
        expect(result).toBe(true);
      });
  
      it('should return false for an invalid personal number', () => {
        const result = validatePersonalNumber('invalid-personal-number');
        expect(result).toBe(false);
      });
    });
  
    describe('validateText', () => {
      it('should return true for valid text', () => {
        const result = validateText('Valid Text 123');
        expect(result).toBe(true);
      });
  
      it('should return false for invalid text', () => { 
        const result = validateText('!@#$%^&*()');
        expect(result).toBe(false);
      });
    });
  });
  