export type Tag = {
  name: string
  bg?: string
  fg?: string
  t?: string
}

type KeyValue = {
  valid: boolean
  key: string
  value: string
}

const toKeyValue = (s: string): KeyValue => {
  const arr = s.split("=")
  if (arr.length !== 2) {
    return {
      valid: false,
      key: "",
      value: "",
    }
  }

  const key = arr[0]
  const value = arr[1]

  return {
    valid: true,
    key,
    value,
  }
}

export const parseTag = (str: string): Tag => {
  const arr = str.split(":")
  if (arr.length < 1) {
    return {
      name: str,
    }
  }

  const tag: Tag = {
    name: arr[0],
  }

  arr.slice(1).forEach((v) => {
    const kv = toKeyValue(v)
    if (kv.valid) {
      tag[kv.key as keyof Tag] = kv.value
    }
  })

  // handle t type
  if (tag.t) {
    tag.fg = `var(--color-${tag.t})`
    tag.bg = `var(--bgcolor-${tag.t})`
  }

  return tag
}
