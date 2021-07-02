import CoverImage from "../misc/cover"
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
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage src={coverImage} title={title} height={620} width={1240} />
      </div>
      <div className="mx-auto">
        <div className="mb-6 text-lg">{date && <Time date={date} location="right" />}</div>
      </div>
    </>
  )
}

export default PostHeader
