export const toSnakeCase = (string: string) => string.replaceAll(/[A-Z]/g, match => `_${match.toLowerCase()}`);
