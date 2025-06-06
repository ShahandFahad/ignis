// Clean input utility
export const sanitizeInput = (input: string): string => {
    return input.replace(/[^\w\s]/gi, '');
}
