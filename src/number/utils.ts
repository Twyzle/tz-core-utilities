export function getRandomInt(a: number, b: number): number {
  if (a === b) return a
  const min = Math.ceil(Math.min(a, b))
  const max = Math.floor(Math.max(a, b))
  return Math.floor(Math.random() * (max - min + 1)) + min
}
