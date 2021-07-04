import type { Post } from "../../lib/posts/post"

import CoverImage from "../misc/cover"
import Time from "../misc/time"
import Tags from "../misc/tag"
import Link from "../misc/link"

type Props = {
  post: Post
}

const HeroPost = ({ post }: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage src={post.metadata.coverImage} title={post.metadata.title} slug={post.slug.name} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${post.slug.name}`} href="/posts/[slug]" name={post.metadata.title} />
          </h3>
          {post.metadata.date && (
            <div className="mb-4 md:mb-0 text-lg">
              <Time date={post.metadata.date} duration={post.readTimePerSecond} />
            </div>
          )}
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{post.metadata.excerpt}</p>
          {post.metadata.tags && <Tags tags={post.metadata.tags} />}
        </div>
      </div>
    </section>
  )
}

export default HeroPost
