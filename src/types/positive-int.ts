export type PositiveInt = number & { __brand: 'PositiveInt' }

/**
 * Ensures a number is a positive integer and returns it as a branded type.
 * Throws if the number is not >= 1.
 */
export function asPositiveInt(n: number): PositiveInt {
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error('Value must be an integer >= 1')
  }
  return n as PositiveInt
}