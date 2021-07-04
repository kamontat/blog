import { Tag } from "./tag"
import { getOrElse, getOrFalse, getOrThrow } from "./utils"

export interface SerizalizeMetadata {
  title: string
  excerpt: string
  coverImage?: string
  date?: string
  tags: string[]
}

export class Metadata {
  static build(data: Record<string, any>): Metadata {
    const title = getOrThrow<string>(data, "title")
    const excerpt = getOrElse<string>(data, "excerpt", title)
    const coverImage = getOrFalse<string>(data, "coverImage")
    const date = getOrFalse<string>(data, "date")
    const tags = getOrElse<string[]>(data, "tags", [])

    return new Metadata(
      title,
      excerpt,
      coverImage,
      date,
      tags.map((tag) => Tag.build(tag))
    )
  }

  static deserialize(s: SerizalizeMetadata): Metadata {
    return Metadata.build(s)
  }

  constructor(
    public readonly title: string,
    public readonly excerpt: string,
    public readonly coverImage: string | undefined,
    public readonly date: string | undefined,
    public readonly tags: Tag[]
  ) {}

  serialize(): SerizalizeMetadata {
    const base: SerizalizeMetadata = {
      title: this.title,
      excerpt: this.excerpt,
      tags: this.tags.map((tag) => tag.serialize()),
    }

    if (this.coverImage) {
      base.coverImage = this.coverImage
    }
    if (this.date) {
      base.date = this.date
    }

    return base
  }
}
