import CoverImage from "../misc/cover"
import Tags from "../misc/tag"
import Time from "../misc/time"
import Link from "../misc/link"

import type { Post } from "../../lib/posts/models"

type Props = {
  post: Post
}

const PostPreview = ({ post }: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={post.slug} title={post.title} src={post.coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${post.slug}`} href="/posts/[slug]" name={post.title} />
      </h3>
      <div className="text-lg mb-4">{post.date && <Time date={post.date} />}</div>
      <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
      {post.tags && <Tags tags={post.tags} />}
    </div>
  )
}

export default PostPreview
