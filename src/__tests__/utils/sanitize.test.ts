import { sanitizeInput } from "../../utils/sanitize";

// Example test cases to test utility input sanitization

describe('sanitizeInput', () => {
    it('should remove special characters', () => {
        const raw = 'Hello@#!';
        expect(sanitizeInput(raw)).toBe('Hello');
    });

    it('should keep letters and spaces', () => {
        const raw = 'This is a test';
        expect(sanitizeInput(raw)).toBe('This is a test');
    });
});

