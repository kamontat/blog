import type { Metadata } from "../../lib/posts/metadata"

import CoverImage from "../misc/cover"
import Time from "../misc/time"
import PostTitle from "./title"

type Props = {
  metadata: Metadata
  draft: boolean
}

const PostHeader = ({ metadata, draft }: Props) => {
  return (
    <>
      <div className="mb-12">
        <PostTitle>
          {metadata.title} {draft && "[draft]"}
        </PostTitle>
        <div className="text-lg">{metadata.date && <Time date={metadata.date} location="left" />}</div>
      </div>

      <div className="mb-5 md:mb-12 sm:mx-0">
        <CoverImage src={metadata.coverImage} title={metadata.title} />
      </div>
    </>
  )
}

export default PostHeader
