import type { GetStaticProps } from "next"
import { Post, SerizalizePost } from "../lib/posts/post"

import { Normal } from "../components/layout"
import Title from "../components/layout/title"
import MdBody from "../components/markdown/body"

import { buildPost, loadSlugs } from "../lib/posts/file"

type Props = {
  changelog: SerizalizePost
}

const Changelog = ({ changelog }: Props) => {
  const post = Post.deserialize(changelog)
  return (
    <Normal title="changelog">
      <Title title="Changelog." />
      <MdBody>{post.process()}</MdBody>
    </Normal>
  )
}

export default Changelog

export const getStaticProps: GetStaticProps = async () => {
  const slug = loadSlugs("").find((v) => v.name === "CHANGELOG")
  const changelog = slug && buildPost(slug).serialize()
  return {
    props: {
      changelog,
    },
  }
}
