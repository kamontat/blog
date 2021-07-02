import ErrorPage from "next/error"
import { useRouter } from "next/router"

import { Normal, Header } from "../../components/layout"
import PostHeader from "../../components/post/header"
import PostBody from "../../components/post/body"
import Container from "../../components/misc/container"

import { getPostBySlug, loadPPosts } from "../../lib/posts/apis"
import { mdToHtml } from "../../lib/markdown"
import { Post, RawPost } from "../../lib/posts/models"

type Props = {
  post: RawPost
  previous?: RawPost
  next?: RawPost
}

const PostPage = ({ post }: Props) => {
  const router = useRouter()
  if (!router.isFallback && (!post || post.slug === "")) {
    return <ErrorPage statusCode={404} />
  }

  const p = new Post(post)
  const meta = [
    {
      property: "og:image",
      content: p.coverImage ?? "",
    },
  ]
  return (
    <Normal title={p.title} meta={meta}>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader title={p.title} coverImage={p.coverImage} date={p.date} />
          <PostBody content={p.content} />
        </article>
      </Container>
    </Normal>
  )
}

export default PostPage

type Params = {
  params: {
    slug: string
    previous?: string
    next?: string
  }
}

const toPost = async (slug: string): Promise<RawPost> => {
  const raw = getPostBySlug(slug, Post.fullFields)
  const html = await mdToHtml(raw.content)
  return {
    ...raw,
    html,
  }
}

export async function getStaticProps({ params }: Params) {
  const props: Props = {
    post: await toPost(params.slug),
  }

  if (params.previous) {
    props.previous = await toPost(params.previous)
  }
  if (params.next) {
    props.next = await toPost(params.next)
  }

  return {
    props,
  }
}

export async function getStaticPaths() {
  const posts = loadPPosts(Post.slugFields)
  const size = posts.length

  return {
    paths: posts.map((post, i) => {
      const previous = i - 1 < 0 ? undefined : posts[i - 1].slug
      const next = i + 1 >= size ? undefined : posts[i + 1].slug

      return {
        params: {
          previous: previous,
          slug: post.slug,
          next: next,
        },
      }
    }),
    fallback: false,
  }
}
