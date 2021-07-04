import { getKeyValue } from "./utils"

export class Tag {
  static defaultBackgroundColor: string = "#CDD6E6"
  static defaultTextColor: string = "#505050"

  static build(format: string): Tag {
    const arr = format.split(":")
    if (arr.length < 1) {
      return new Tag(format, Tag.defaultBackgroundColor, Tag.defaultTextColor, format)
    }

    const tags: Record<string, string> = {}
    arr.slice(1).forEach((v) => {
      const [valid, key, value] = getKeyValue(v)
      if (valid) {
        tags[key] = value
      }
    })

    // handle t type
    if (tags.t) {
      tags.bg = `var(--bgcolor-${tags.t})`
      tags.tg = `var(--color-${tags.t})`
    }

    return new Tag(arr[0], tags["bg"] ?? Tag.defaultBackgroundColor, tags["tg"] ?? Tag.defaultTextColor, format)
  }

  constructor(
    public readonly name: string,
    public readonly bgColor: string,
    public readonly textColor: string,
    private raw: string
  ) {}

  serialize(): string {
    return this.raw
  }
}
