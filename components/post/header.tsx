import type { Metadata } from "../../lib/posts/metadata"

import CoverImage from "../misc/cover"
import Link from "../misc/link"
import Time from "../misc/time"
import PostTitle from "./title"

type Props = {
  metadata: Metadata
  readtime: number
  draft: boolean
  github: string
}

const PostHeader = ({ metadata, draft, readtime, github }: Props) => {
  return (
    <>
      <div className="mb-12">
        <PostTitle>
          {metadata.title} {draft && "[draft]"}
        </PostTitle>
        <div className="flex justify-between text-lg">
          {metadata.date && <Time date={metadata.date} duration={readtime} location="left" />}
          <Link href={github} name="Edit" window={true} underline={"hover"} />
        </div>
      </div>

      <div className="mb-5 md:mb-12 sm:mx-0">
        <CoverImage src={metadata.coverImage} title={metadata.title} />
      </div>
    </>
  )
}

export default PostHeader
