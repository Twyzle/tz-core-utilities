import isPlainObject from 'lodash-es/isPlainObject'
import sortBy from 'lodash-es/sortBy'
import fromPairs from 'lodash-es/fromPairs'
import isEqual from 'lodash-es/isEqual'
import clone from 'lodash-es/clone'
import cloneDeep from 'lodash-es/cloneDeep'

/**
 * Shallow clones a value if not null/undefined.
 */
export const safeClone = <T>(v: T | undefined | null): T | null =>
  v !== undefined && v !== null ? clone(v) : null

/**
 * Deep clones a value if not null/undefined.
 */
export const safeCloneDeep = <T>(v: T | undefined | null): T | null =>
  v !== undefined && v !== null ? cloneDeep(v) : null

/**
 * Sorts object keys recursively in lexicographic order.
 */
export function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObjectKeys)
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((sorted: any, key) => {
      sorted[key] = sortObjectKeys((obj as any)[key])
      return sorted
    }, {})
  }
  return obj
}

/**
 * Recursively sorts keys in an object.
 */
export function sortKeysDeep(obj: any): any {
  if (Array.isArray(obj)) return obj.map(sortKeysDeep)

  if (isPlainObject(obj)) {
    const sortedEntries = sortBy(Object.entries(obj), ([key]) => key)
    return fromPairs(sortedEntries.map(([key, val]) => [key, sortKeysDeep(val)]))
  }

  return obj
}

/**
 * Returns a shallow object of top-level changed keys between newBody and originalBody.
 */
export function getTopLevelChanges<T extends Record<string, unknown>>(newBody: T, originalBody: T): Partial<T> {
  const result: Partial<T> = {}
  for (const key in newBody) {
    if (!isEqual(newBody[key], originalBody[key])) {
      result[key] = newBody[key]
    }
  }
  return result
}

/**
 * Assigns values from source or defaults to target, with deep cloning for objects/arrays.
 */
export function assignDefaults<T extends object>(
  target: Partial<T>,
  source: Partial<T>,
  defaults: Partial<T>,
) {
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    const value = source[key] ?? defaults[key]
    if (Array.isArray(value)) {
      target[key] = [...value] as T[typeof key]
    } else if (typeof value === 'object' && value !== null) {
      target[key] = structuredClone(value) as T[typeof key]
    } else {
      target[key] = value as T[typeof key]
    }
  }
}