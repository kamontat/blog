import Head from "next/head"
import pjson from "../../package.json"

type Props = {
  meta?: Record<string, string>[]
}

const Meta = ({ meta }: Props) => {
  return (
    <Head>
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="title" content={pjson.name} />
      <meta name="description" content={pjson.description} />
      <meta name="version" content={pjson.version} />

      {meta &&
        meta.map((m, i) => {
          return <meta key={i} {...m} />
        })}
    </Head>
  )
}

export default Meta
