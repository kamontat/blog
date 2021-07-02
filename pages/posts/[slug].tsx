import ErrorPage from "next/error"
import { useRouter } from "next/router"

import { Normal, Header } from "../../components/layout"
import PostHeader from "../../components/post/header"
import PostBody from "../../components/post/body"
import Paginator from "../../components/post/paginator"
import Container from "../../components/misc/container"
import Tags from "../../components/misc/tag"

import { getPostBySlug, loadPPosts } from "../../lib/posts/apis"
import { mdToHtml } from "../../lib/markdown"
import { Post, RawPost } from "../../lib/posts/models"

type Props = {
  post: RawPost
  previous?: RawPost
  next?: RawPost
}

const PostPage = ({ post, previous, next }: Props) => {
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
    <Normal title={p.title} meta={meta} image={p.coverImage}>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader title={p.title} coverImage={p.coverImage} date={p.date} />
          <PostBody content={p.content} />

          <footer>
            {p.tags && <Tags tags={p.tags} />}
            <Paginator previous={previous} next={next} />
          </footer>
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
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
