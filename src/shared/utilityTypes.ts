export type Maybe<T> = T | null
export type Dict<T> = Record<string, T>
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>
