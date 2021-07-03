import CoverImage from "../misc/cover"
import Tags from "../misc/tag"
import Time from "../misc/time"
import PostTitle from "./title"

type Props = {
  title?: string
  coverImage?: string
  date?: Date
}

const PostHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <div className="mb-12">
        <PostTitle>{title}</PostTitle>
        <div className="text-lg">{date && <Time date={date} location="left" />}</div>
      </div>

      <div className="mb-5 md:mb-12 sm:mx-0">
        <CoverImage src={coverImage} title={title} />
      </div>
    </>
  )
}

export default PostHeader
