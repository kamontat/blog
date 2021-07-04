import type React from "react"
import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next"
import type { ParsedUrlQuery } from "querystring"
import { Post, SerizalizePost } from "../../lib/posts/post"

import ErrorPage from "next/error"
import { useRouter } from "next/router"

import { Normal, Header } from "../../components/layout"
import PostHeader from "../../components/post/header"
import PostBody from "../../components/post/body"
import Footer from "../../components/post/footer"

import { buildPost, loadSlugs } from "../../lib/posts/file"

type Props = {
  post: SerizalizePost
  previous?: SerizalizePost
  next?: SerizalizePost
}

const PostPage = ({ post, previous, next }: Props) => {
  const router = useRouter()
  if (!router.isFallback && (!post || post.slug === "")) {
    return <ErrorPage statusCode={404} />
  }

  const p = Post.deserialize(post)
  return (
    <Normal
      title={p.metadata.title}
      description={p.metadata.excerpt}
      image={p.metadata.coverImage}
      meta={[
        {
          property: "article:id",
          content: p.slug.id.toString(),
        },
        {
          property: "article:published_time",
          content: p.metadata.date ?? "",
        },
      ].concat(p.metadata.tags.map((tag) => ({ property: "article:tag", content: tag.name })))}
    >
      <Header />
      <article className="mb-8">
        <PostHeader metadata={p.metadata} draft={p.slug.isDraft} readtime={p.readTimePerSecond} />
        <PostBody>{p.process()}</PostBody>
      </article>
      <Footer tags={p.metadata.tags} previous={previous} next={next} />
    </Normal>
  )
}

export default PostPage

interface Params extends ParsedUrlQuery {
  slug: string
  previous?: string
  next?: string
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

  const lang = locale ?? defaultLocale ?? ""
  const slugs = loadSlugs(lang)

  const slugIndex = slugs.findIndex((v) => v.name === params.slug)
  if (slugIndex < 0) {
    throw new Error(`cannot found slug from name: ${params.slug}`)
  }

  const max = slugs.length - 1
  const min = 0

  const props: Props = {
    post: buildPost(slugs[slugIndex]).serialize(),
  }

  if (slugIndex > min) {
    props.previous = buildPost(slugs[slugIndex - 1]).serialize()
  } else {
    props.previous = buildPost(slugs[max]).serialize()
  }

  if (slugIndex < max) {
    props.next = buildPost(slugs[slugIndex + 1]).serialize()
  } else {
    props.next = buildPost(slugs[min]).serialize()
  }

  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async ({ locales, defaultLocale }) => {
  const _locales: string[] = (locales ?? [defaultLocale]).filter((v) => v !== undefined) as string[]

  const paths: GetStaticPathsResult<Params>["paths"] = []
  _locales.forEach((locale) => {
    const slugs = loadSlugs(locale)
    slugs.forEach((slug) => {
      paths.push({
        params: {
          slug: slug.name,
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
