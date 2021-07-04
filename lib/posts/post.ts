import type React from "react"

import { Slug } from "./slug"
import { Metadata, SerizalizeMetadata } from "./metadata"

import { mdToHtml } from "../markdown"

export interface SerizalizePost {
  id: number
  lang?: string
  slug: string
  isDraft: boolean
  metadata: SerizalizeMetadata

  content: string
}

export class Post {
  static build(slug: Slug, data: Record<string, any>, content: string): Post {
    return new Post(slug, Metadata.build(data), content)
  }

  static deserialize(s: SerizalizePost): Post {
    return new Post(new Slug(s.id, s.lang, s.slug, s.isDraft), Metadata.deserialize(s.metadata), s.content)
  }

  constructor(public readonly slug: Slug, public readonly metadata: Metadata, public readonly content: string) {}

  process(): React.ReactElement {
    return mdToHtml(this.content)
  }

  serialize(): SerizalizePost {
    const base: SerizalizePost = {
      id: this.slug.id,
      slug: this.slug.name,
      isDraft: this.slug.isDraft,
      metadata: this.metadata.serialize(),
      content: this.content,
    }

    if (this.slug.language) {
      base.lang = this.slug.language
    }

    return base
  }
}
