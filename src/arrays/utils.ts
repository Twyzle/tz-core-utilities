import type { PositiveInt } from '@/types/positive-int'

/**
 * Returns true if the index is the last item in the array.
 */
export function isLast<T>(items: readonly T[], idx: number): boolean {
  return idx === items.length - 1
}

/**
 * Returns a random item from an array.
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Swaps two elements in an array by their indices.
 */
export function swapElements(array: any[], index1: number, index2: number): void {
  const temp = array[index1]
  array[index1] = array[index2]
  array[index2] = temp
}

/**
 * Prepends unique item(s) to an array up to a maximum length, removing similar prefixes.
 */
export function prependWithLimit(
  arr: string[],
  newItem: string | string[],
  maxLength: PositiveInt,
  mutate = false,
): string[] {
  const newItems = Array.isArray(newItem) ? [...new Set(newItem)] : [newItem]
  const filtered = arr.filter(existing =>
    !newItems.some(newVal =>
      existing.startsWith(newVal) || newVal.startsWith(existing)
    )
  )
  const combined = [...newItems, ...filtered].slice(0, maxLength)
  if (mutate) {
    arr.length = 0
    arr.push(...combined)
    return arr
  }
  return combined
}

/**
 * Prepends unique nested arrays with limit, avoiding duplicates.
 */
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
