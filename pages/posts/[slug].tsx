import type React from "react"
import type { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next"
import type { ParsedUrlQuery } from "querystring"
import type { Slug } from "../../lib/posts/slug"

import ErrorPage from "next/error"
import { useRouter } from "next/router"

import { Normal, Header } from "../../components/layout"
import PostHeader from "../../components/post/header"
import Footer from "../../components/post/footer"
import Body from "../../components/markdown/body"

import { buildPost, loadSlugs } from "../../lib/posts/file"
import { Post, SerizalizePost } from "../../lib/posts/post"

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
        <Body>{p.process()}</Body>
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

const findSlug = (slugs: Slug[], index: number, shift: 1 | -1): Slug | undefined => {
  const limit = slugs.length
  for (let i = index + shift, c = 0; c < limit; i += shift, c++) {
    if (i < 0) i = limit - 1
    else if (i >= limit) i = 0
    const s = slugs[i]
    if (!s.isDraft && index !== i) {
      return s
    }
  }

  return undefined
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

  const props: Props = {
    post: buildPost(slugs[slugIndex]).serialize(),
  }

  const previous = findSlug(slugs, slugIndex, -1)
  const next = findSlug(slugs, slugIndex, 1)

  if (previous && next && previous.equal(next)) {
    props.next = buildPost(next).serialize()
  } else {
    if (previous) {
      props.previous = buildPost(previous).serialize()
    }
    if (next) {
      props.next = buildPost(next).serialize()
    }
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
