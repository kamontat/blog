import CoverImage from "../misc/cover"
import Tags from "../misc/tag"
import Time from "../misc/time"
import Link from "../misc/link"

import type { Post } from "../../lib/posts/post"

type Props = {
  post: Post
}

const PostPreview = ({ post }: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={post.slug.name} title={post.metadata.title} src={post.metadata.coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${post.slug.name}`} href="/posts/[slug]" name={post.metadata.title} />
      </h3>
      <div className="text-lg mb-4">
        {post.metadata.date && <Time date={post.metadata.date} duration={post.readTimePerSecond} />}
      </div>
      <p className="text-lg leading-relaxed mb-4">{post.metadata.excerpt}</p>
      {post.metadata.tags && <Tags tags={post.metadata.tags} />}
    </div>
  )
}

export default PostPreview
