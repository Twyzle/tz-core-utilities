/**
 * Normalizes a string to lowercase and removes accents/diacritics.
 */
export function normalizeString(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Generates a valid HTML-safe ID string from an optional input.
 */
export const generateValidId = (input?: string): string => {
  if (!input) {
    input = `id-${Math.random().toString(36).substring(2, 10)}`
  }

  input = input.replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\-_:]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (/^\d/.test(input)) {
    input = `id-${input}`
  }

  return input
}
