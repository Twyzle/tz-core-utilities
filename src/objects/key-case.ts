import transform from 'lodash-es/transform'
import isArray from 'lodash-es/isArray'
import isObject from 'lodash-es/isObject'

/**
 * Converts object keys from snake_case to camelCase recursively.
 */
export const camelizeObject = (obj: any): any =>
  transform(obj, (acc: any, value: any, key: string | number, target: any) => {
    const camelKey = isArray(target)
      ? key
      : key.toString()
        .replace(/_([a-zA-Z])/g, (_, c) => c.toUpperCase())
        .replace(/_([0-9])/g, (_, d) => d)
    acc[camelKey] = isObject(value) ? camelizeObject(value) : value
  })

/**
 * Converts object keys to snake_case recursively.
 */
export const snakeizeObject = (obj: any): any =>
  transform(obj, (acc: any, value: any, key: string | number | symbol, target: any) => {
    const snakeKey = isArray(target)
      ? key
      : key.toString().replace(/(\d+)/g, '_$1').replace(/([A-Z])/g, '_$1').toLowerCase()
    acc[snakeKey] = isObject(value) ? snakeizeObject(value) : value
  })
