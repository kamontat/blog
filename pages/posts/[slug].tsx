import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next"
import type { ParsedUrlQuery } from "querystring"

import ErrorPage from "next/error"
import { useRouter } from "next/router"

import { Normal, Header } from "../../components/layout"
import PostHeader from "../../components/post/header"
import PostBody from "../../components/post/body"
import Paginator from "../../components/post/paginator"
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
  return (
    <Normal title={`${p.title} | KC`} description={p.excerpt} image={p.coverImage}>
      <Header />
      <article className="mb-32">
        <PostHeader title={p.title} coverImage={p.coverImage} date={p.date} />
        <PostBody content={p.content} />

        <footer>
          {p.tags && <Tags tags={p.tags} />}
          <Paginator previous={previous} next={next} />
        </footer>
      </article>
    </Normal>
  )
}

export default PostPage

interface Params extends ParsedUrlQuery {
  slug: string
  previous?: string
  next?: string
}

const toPost = async (slug: string): Promise<RawPost> => {
  const raw = getPostBySlug(slug, Post.fullFields)
  const html = await mdToHtml(raw.content)
  return {
    ...raw,
    html,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params, locale, defaultLocale }) => {
  if (!params) {
    return {
      redirect: {
        permanent: true,
        destination: "/?error=true&msg=paramnotfound",
      },
    }
  }

  const props: Props = {
    post: await toPost(`${locale ?? defaultLocale}/${params.slug}`),
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

export const getStaticPaths: GetStaticPaths<Params> = async ({ locales, defaultLocale }) => {
  const _locales: string[] = (locales ?? [defaultLocale]).filter((v) => v !== undefined) as string[]

  const paths: GetStaticPathsResult<Params>["paths"] = []
  _locales.forEach((locale) => {
    const posts = loadPPosts(locale, Post.slugFields)
    posts.forEach((post) => {
      paths.push({
        params: {
          slug: post.slug,
        },
        locale: locale,
      })
    })
  })

  return {
    paths,
    fallback: false,
  }
}
