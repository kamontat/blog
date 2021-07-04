import { readdirSync, readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"

import base from "../logger"
import { Post } from "./post"
import { Slug } from "./slug"

const log = base.extend("post").extend("file")

const postsDirectory = join(process.cwd(), "_posts")
export const loadSlugs = (lang: string): Slug[] => {
  const posts = join(postsDirectory, lang)
  const slugs = readdirSync(posts)
    .filter((v) => v.endsWith(".md"))
    .map((v) => Slug.parseFilename(lang, v))

  log("all posts: %o", slugs)
  return slugs
}

/**
 * return post without fullcontent data
 * @param slug post slug
 * @returns post without content
 */
export const buildPostMeta = (slug: Slug): Post => {
  const filepath = join(postsDirectory, slug.toFilename())
  const fileContents = readFileSync(filepath, "utf8")
  const { data } = matter(fileContents)

  const post = Post.build(slug, data, "")
  log("post meta: %o", post)
  return post
}

export const buildPost = (slug: Slug): Post => {
  const filepath = join(postsDirectory, slug.toFilename())
  const fileContents = readFileSync(filepath, "utf8")
  const { data, content } = matter(fileContents)

  const post = Post.build(slug, data, content)
  log("post meta: %o", post)
  return post
}
