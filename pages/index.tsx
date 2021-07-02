import { Normal } from "../components/layout"
import Header from "../components/index/header"
import HeroPost from "../components/index/hero-post"
import Posts from "../components/index/posts"
import Container from "../components/misc/container"
import Link from "../components/misc/link"

import { loadPosts } from "../lib/posts/apis"
import { RawPost, Post } from "../lib/posts/models"

import pjson from "../package.json"

type Props = {
  first: RawPost
  nexts: RawPost[]
}

const Index = ({ first, nexts }: Props) => {
  const post = new Post(first)
  const next = nexts.map((n) => new Post(n))

  return (
    <Normal title={`${pjson.display} | Kamontat Chantrachirathumrong`}>
      <Container>
        <Header title={`${pjson.display}.`}>
          Personal blogs for collect and share purpose using <Link url="https://nextjs.org/" name="Next.js" />.
        </Header>
        {post && post.isExist() && <HeroPost post={post} />}
        <p>{next && next.length > 0 && <Posts posts={next} />}</p>
      </Container>
    </Normal>
  )
}

export default Index

export const getStaticProps = async () => {
  const posts = loadPosts(Post.minimialFields)

  const first = posts[0]
  const nexts = posts.slice(1)
  return {
    props: {
      first: first ?? null,
      nexts,
    },
  }
}
