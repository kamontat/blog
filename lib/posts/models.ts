import { parseISO } from "date-fns"

export enum PostType {
  UNKNOWN = -1,
  SLUG_ONLY = 0,
  MINI_INFO = 1,
  FULL_INFO = 2,
}

export type RawPost = {
  [K in typeof Post.fullFields[number] | "html"]: any
}

export class Post {
  static slugFields = ["slug", "lang"] as const
  static minimialFields = ["slug", "lang", "title", "excerpt", "date", "coverImage", "tags"] as const
  static fullFields = ["slug", "lang", "title", "excerpt", "date", "coverImage", "tags", "content"] as const

  readonly type: PostType
  readonly url: string
  readonly slug: string
  readonly lang?: string
  readonly title?: string
  readonly excerpt?: string
  readonly date?: Date
  readonly coverImage?: string
  readonly tags?: string[]
  readonly content?: string
  constructor(json: RawPost) {
    if (!json) {
      this.type = PostType.UNKNOWN
      this.slug = ""
      this.url = `/?error=notfound&msg=slugmissing`
    } else {
      this.slug = json["slug"] ?? undefined
      this.lang = json["lang"] ?? undefined
      if (this.slug && this.lang) this.url = `${this.lang}/posts/${this.slug}`
      else if (this.slug) this.url = `/posts/${this.slug}`
      else this.url = `/?error=notfound&msg=${this.slug}`
      this.title = json["title"] ?? undefined
      this.excerpt = json["excerpt"] ?? undefined
      if (json["date"]) this.date = parseISO(json["date"])
      else this.date = undefined
      this.coverImage = json["coverImage"] ?? undefined
      this.tags = json["tags"] ?? undefined
      this.content = json["html"] ?? json["content"] ?? undefined

      const size = Object.keys(json).length
      if (size === Post.slugFields.length) {
        this.type = PostType.SLUG_ONLY
      } else if (size <= Post.minimialFields.length) {
        this.type = PostType.MINI_INFO
      } else if (size <= Post.fullFields.length) {
        this.type = PostType.FULL_INFO
      } else {
        this.type = PostType.UNKNOWN
      }
    }
  }

  isError(): boolean {
    return this.type === PostType.UNKNOWN
  }

  isExist(): boolean {
    return this.type !== PostType.UNKNOWN
  }
}
