import transform from 'lodash-es/transform'
import isArray from 'lodash-es/isArray'
import isObject from 'lodash-es/isObject'
import clone from 'lodash-es/clone'
import cloneDeep from 'lodash-es/cloneDeep'
import isPlainObject from 'lodash-es/isPlainObject'
import sortBy from 'lodash-es/sortBy'
import fromPairs from 'lodash-es/fromPairs'
import isEqual from 'lodash-es/isEqual'

export type PositiveInt = number & { __brand: 'PositiveInt' }

export function asPositiveInt(n: number): PositiveInt {
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error('Value must be an integer >= 1')
  }
  return n as PositiveInt
}

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

export function buildFormData(formData: any, data: any, parentKey?: string) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key: any) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else {
    const value = data == null ? '' : data

    formData.append(parentKey, value)
  }
}

export const camelizeObject = (obj: any) => transform(obj, (acc: any, value: any, key: string | number, target: any) => {
  const camelKey = isArray(target)
    ? key
    : key.toString().replace(/_([a-zA-Z])/g, (_, char) => char.toUpperCase())
      .replace(/_([0-9])/g, (_, char) => char)

  acc[camelKey] = isObject(value) ? camelizeObject(value) : value
})

/**
 * Utility function to explicitly cast unknown values with generic support.
 * Used to work around Vue's reactivity type limitations.
 */
export function cast<T>(val: unknown): T {
  return val as T
}

export const generateValidId = (input?: string): string => {
  if (!input) {
    input = `id-${Math.random().toString(36).substring(2, 10)}`
  }

  // Replace whitespace with hyphens
  input = input.replace(/\s+/g, '-')

  // Replace invalid characters with hyphens
  input = input.replace(/[^a-zA-Z0-9\-_:]/g, '-')

  // Collapse multiple hyphens into one
  input = input.replace(/-+/g, '-')

  // Trim leading and trailing hyphens
  input = input.replace(/^-+|-+$/g, '')

  // Prefix with 'id-' if it starts with a digit
  if (/^\d/.test(input)) {
    input = `id-${input}`
  }

  return input
}

export function getRandomItem<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

export function getTopLevelChanges<T extends Record<string, unknown>>(newBody: T, originalBody: T): Partial<T> {
  const result: Partial<T> = {}

  for (const key in newBody) {
    if (!isEqual(newBody[key], originalBody[key])) {
      result[key] = newBody[key]
    }
  }

  return result
}

export function isLast<T>(items: readonly T[], idx: number): boolean {
  return idx === items.length - 1
}

export function normalizeString(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD') // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
}

export function prependWithLimit(
  arr: string[],
  newItem: string | string[],
  maxLength: PositiveInt,
  mutate = false,
): string[] {
  const newItems = Array.isArray(newItem) ? [...new Set(newItem)] : [newItem]

  // Avoid adding new items that are prefixes of existing items or vice versa
  const filtered = arr.filter((existing) => {
    return !newItems.some(
      newVal =>
        existing.startsWith(newVal) || newVal.startsWith(existing),
    )
  })

  const combined = [...newItems, ...filtered].slice(0, maxLength)

  if (mutate) {
    arr.length = 0
    arr.push(...combined)
    return arr
  }

  return combined
}

export function prependNestedWithLimit(
  arr: string[][],
  newItems: string[][],
  maxLength: PositiveInt,
  mutate = false,
): string[][] {
  const stringify = (a: string[]) => JSON.stringify(a)

  const seen = new Set<string>()
  const dedupedNewItems = newItems.filter((item) => {
    const key = stringify(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const newItemKeys = new Set(dedupedNewItems.map(stringify))

  const filtered = arr.filter(item => !newItemKeys.has(stringify(item)))

  const combined = [...dedupedNewItems, ...filtered].slice(0, maxLength)

  if (mutate) {
    arr.length = 0
    arr.push(...combined)
    return arr
  }

  return combined
}

export const safeClone = <T>(v: T | undefined | null): T | null =>
  v !== undefined && v !== null ? clone(v) : null

export const safeCloneDeep = <T>(v: T | undefined | null): T | null =>
  v !== undefined && v !== null ? cloneDeep(v) : null

export async function safeImport(path: string) {
  try {
    return await import(
      /* @vite-ignore */
      path
      )
  } catch {
    return { default: {} }
  }
}

export function scrollToElementById(id: string, offset?: number) {
  if (typeof window === 'undefined') return
  const elem = document.getElementById(id)
  if (elem) {
    // noinspection GrazieInspection
    if (offset) {
      // Get the element's top position relative to the viewport
      const elemPos = elem.getBoundingClientRect().top
      // Get the current scroll position using scrollY
      const offsetPos = window.scrollY + elemPos + offset
      window.scrollTo({
        behavior: 'smooth',
        top: offsetPos,
      })
    } else {
      elem.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
}

export const snakeizeObject = (obj: any) => transform(obj, (acc: any, value: any, key: string | number | symbol, target: any) => {
  const snakeKey = isArray(target)
    ? key
    : key.toString().replace(/(\d+)/g, '_$1').replace(/([A-Z])/g, '_$1').toLowerCase()
  acc[snakeKey] = isObject(value) ? snakeizeObject(value) : value
})

export function sortKeysDeep(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortKeysDeep)
  }

  if (isPlainObject(obj)) {
    const sortedEntries = sortBy(Object.entries(obj), ([key]) => key)
    const transformed = sortedEntries.map(([key, value]) => [key, sortKeysDeep(value)])
    return fromPairs(transformed)
  }

  return obj
}

export function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys) // do not sort array indices
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((sorted: Record<string, any>, key: string) => {
        sorted[key] = sortObjectKeys((obj as Record<string, any>)[key])
        return sorted
      }, {})
  }
  return obj
}

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

export function swapElements(array: any[], index1: number, index2: number) {
  const temp = array[index1]
  array[index1] = array[index2]
  array[index2] = temp
}
