import Head from "next/head"
import pjson from "../../package.json"

type Props = {
  title?: string
  meta?: Record<string, string>[]
  image?: string
}

const Meta = ({ title, meta, image }: Props) => {
  return (
    <Head>
      {title && <title>{title}</title>}

      <link rel="manifest" href="/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="title" content={title ?? pjson.name} />
      <meta name="description" content={pjson.description} />
      <meta name="version" content={pjson.version} />

      <meta property="og:site_name" content={title ?? pjson.name} />
      <meta property="og:title" content={title ?? pjson.name} />
      <meta property="og:description" content={pjson.description} />
      <meta property="og:locale" content="en-US" />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}

      {meta &&
        meta.map((m, i) => {
          return <meta key={i} {...m} />
        })}
    </Head>
  )
}

export default Meta
