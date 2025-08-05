/**
 * Removes all functions from an object or array.
 */
export function stripFunctions<T>(input: T): T {
  if (typeof input === 'function') {
    return undefined as unknown as T
  }

  if (Array.isArray(input)) {
    return input
      .map(item => stripFunctions(item))
      .filter(item => item !== undefined) as unknown as T
  }

  if (input !== null && typeof input === 'object') {
    const result: any = Array.isArray(input) ? [] : {}
    for (const key of Object.keys(input)) {
      const value = (input as any)[key]
      const strippedValue = stripFunctions(value)
      if (strippedValue !== undefined) {
        result[key] = strippedValue
      }
    }
    return result
  }

  return input
}