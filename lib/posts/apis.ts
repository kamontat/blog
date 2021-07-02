import { readdirSync, readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"

const postsDirectory = join(process.cwd(), "_posts")
const loadPostSlugs = (): string[] => {
  return readdirSync(postsDirectory)
}

const getPostBySlug = <F extends string>(_slug: string, fields: readonly F[] = []): Record<F, string> => {
  const slug = _slug.replace(/\.md$/, "")
  const filepath = join(postsDirectory, slug.concat(".md"))
  const fileContents = readFileSync(filepath, "utf8")
  const { data, content } = matter(fileContents)

  const items: Record<string, string> = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug
    } else if (field === "content") {
      items[field] = content
    } else if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

const loadPPosts = <K extends string>(fields: readonly K[]): Record<K, string>[] => {
  return loadPostSlugs().map((slug) => getPostBySlug(slug, fields))
}

const loadPosts = <K extends string>(fields: readonly K[]): Record<K, string>[] => {
  return loadPostSlugs().map((slug) => getPostBySlug(slug, fields))
}

export { loadPosts, loadPPosts, getPostBySlug }
