/**
 * Explicitly casts an unknown value to a specified type.
 */
export function cast<T>(val: unknown): T {
  return val as T
}
