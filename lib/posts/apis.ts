import { readdirSync, readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"

const postsDirectory = join(process.cwd(), "_posts")
const loadPostSlugs = (lang: string): string[] => {
  const posts = join(postsDirectory, lang)
  return readdirSync(posts)
    .filter((v) => v.endsWith("md"))
    .map((v) => `${lang}/${v}`)
}

const getLangFromSlug = (s: string): [string | undefined, string] => {
  const arr = s.split("/")
  if (arr.length !== 2) {
    return [undefined, s]
  }

  return [arr[0], arr[1]]
}

const getPostBySlug = <F extends string>(_slug: string, fields: readonly F[] = []): Record<F, any> => {
  const [language, __slug] = getLangFromSlug(_slug)
  const slug = __slug.replace(/\.md$/, "")
  const filepath = join(postsDirectory, language ?? "", slug.concat(".md"))
  const fileContents = readFileSync(filepath, "utf8")
  const { data, content } = matter(fileContents)

  const items: Record<string, string> = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug
    } else if (field === "lang" && language) {
      items[field] = language
    } else if (field === "content") {
      items[field] = content
    } else if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

const loadPPosts = <K extends string>(lang: string, fields: readonly K[]): Record<K, any>[] => {
  return loadPostSlugs(lang).map((slug) => getPostBySlug(slug, fields))
}

const loadPosts = <K extends string>(lang: string, fields: readonly K[]): Record<K, any>[] => {
  return loadPostSlugs(lang).map((slug) => getPostBySlug(slug, fields))
}

export { loadPosts, loadPPosts, getPostBySlug }
