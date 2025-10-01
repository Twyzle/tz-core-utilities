import transform from 'lodash-es/transform'

export interface SnakeizeOptions {
  splitAcronyms?: boolean
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  Object.prototype.toString.call(v) === '[object Object]'

/**
 * Converts object keys from `snake_case` to camelCase recursively.
 */
export function camelizeObject<T>(obj: T): T {
  return transform(
    obj as any,
    (acc: any, value: any, key: string | number, target: any) => {
      const camelKey = Array.isArray(target) ? key : camelizeString(String(key))
      acc[camelKey] =
        (value && (Array.isArray(value) || isPlainObject(value)))
          ? camelizeObject(value)
          : value
    }
  ) as T
}


/**
 * Converts a string to camelCase.
 */
export const camelizeString = (input?: string): string => {
  if (!input) return ''

  const s = input
    .toLowerCase()
    .replace(/[-_]+/g, '_')
    .replace(/^_+|_+$/g, '')

  const camel = s
    .replace(/_([a-z])/g, (_, c: string) => c.toUpperCase())
    .replace(/_([0-9])/g, (_, d: string) => d)

  return camel.charAt(0).toLowerCase() + camel.slice(1)
}

/**
 * Converts object keys to `snake_case` recursively.
 */
export function snakeizeObject<T>(obj: T, options?: SnakeizeOptions): T {
  return transform(
    obj as any,
    (acc: any, value: any, key: string | number, target: any) => {
      const snakeKey = Array.isArray(target)
        ? key
        : snakeizeString(String(key), options)

      acc[snakeKey] =
        (value && (Array.isArray(value) || isPlainObject(value)))
          ? snakeizeObject(value, options)
          : value
    }
  ) as T
}
/**
 * Converts a string to `snake_case`.
 */
export const snakeizeString = (input?: string, options: SnakeizeOptions = {}): string => {
  if (!input) return ''
  const { splitAcronyms = false } = options

  const normalized = input
    .replace(/-/g, '_')
    .replace(/(\d+)/g, '_$1')

  let withUnderscores: string
  if (splitAcronyms) {
    withUnderscores = normalized.replace(/([A-Z])/g, '_$1')
  } else {
    withUnderscores = normalized.replace(
      /([a-z0-9])([A-Z])/g,
      '$1_$2'
    )
  }

  return withUnderscores
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()
}