export function chunk<T extends unknown>(array: T[], size: number): T[][] {
  const result = []
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    result[i] = array.slice(i * size, i * size + size)
  }

  return result
}
