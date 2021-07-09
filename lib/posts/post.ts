import type React from "react"

import { Slug } from "./slug"
import { Metadata, SerizalizeMetadata } from "./metadata"

import { mdToHtml } from "../markdown"
import { calculateReadTime } from "./readtime"

import pjson from "../../package.json"

export interface SerizalizePost {
  id: number
  lang?: string
  slug: string
  isDraft: boolean
  metadata: SerizalizeMetadata

  readTimePerSecond: number
  content: string
}

export class Post {
  static build(slug: Slug, data: Record<string, any>, content: string): Post {
    return new Post(slug, Metadata.build(data), content, calculateReadTime(content))
  }

  static deserialize(s: SerizalizePost): Post {
    return new Post(
      new Slug(s.id, s.lang, s.slug, s.isDraft),
      Metadata.deserialize(s.metadata),
      s.content,
      s.readTimePerSecond
    )
  }

  constructor(
    public readonly slug: Slug,
    public readonly metadata: Metadata,
    public readonly content: string,
    public readonly readTimePerSecond: number = -1
  ) {}

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
      readTimePerSecond: this.readTimePerSecond,
    }

    if (this.slug.language) {
      base.lang = this.slug.language
    }

    return base
  }

  /**
   * return link for post
   * @returns link to github website
   */
  github(): string {
    return `${pjson.repository.url}/tree/main/_posts/${this.slug.toFilename()}`
  }
}
