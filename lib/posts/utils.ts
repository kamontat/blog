export const getOrFalse = <T>(r: Record<string, any>, key: string): T | undefined => {
  if (r[key] === undefined || r[key] === null) {
    return undefined
  }
  return r[key] as T
}
export const getOrThrow = <T>(r: Record<string, any>, key: string): T => {
  const t = getOrFalse<T>(r, key)
  if (t === undefined) {
    throw new Error(`cannot found ${key} in ${JSON.stringify(r)} record`)
  }

  return t
}
export const getOrElse = <T>(r: Record<string, any>, key: string, def: T): T => {
  const t = getOrFalse<T>(r, key)
  if (t === undefined) {
    return def
  }

  return t
}
export const getKeyValue = (s: string): [boolean, string, string] => {
  const arr = s.split("=")
  if (arr.length !== 2) {
    return [false, "", ""]
  }

  const key = arr[0]
  const value = arr[1]
  return [true, key, value]
}
