import type { GetStaticProps } from "next"
import { Post, SerizalizePost } from "../lib/posts/post"

import { Normal } from "../components/layout"
import Header from "../components/index/header"
import HeroPost from "../components/index/hero-post"
import Posts from "../components/index/posts"

import { buildPostMeta, loadSlugs } from "../lib/posts/file"

import pjson from "../package.json"

type Props = {
  first: SerizalizePost
  nexts: SerizalizePost[]
}

const Index = ({ first, nexts }: Props) => {
  const post = Post.deserialize(first)
  const next = nexts.map((n) => Post.deserialize(n))
  return (
    <Normal title={pjson.display} image={post.metadata.coverImage}>
      <Header title={`${pjson.display}.`}>{pjson.description}.</Header>
      {post && <HeroPost post={post} />}
      {next && next.length > 0 && <Posts posts={next} />}
    </Normal>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  const posts = loadSlugs(locale ?? defaultLocale ?? "")
    .filter((v) => !v.isDraft)
    .sort((a, b) => {
      return b.id - a.id
    })
    .map((slug) => buildPostMeta(slug).serialize())

  const first = posts[0]
  const nexts = posts.slice(1)
  return {
    props: {
      first: first ?? null,
      nexts,
    },
  }
}
