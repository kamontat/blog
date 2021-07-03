import CoverImage from "../misc/cover"
import Time from "../misc/time"
import Tags from "../misc/tag"
import Link from "../misc/link"

import type { Post } from "../../lib/posts/models"

type Props = {
  post: Post
}

const HeroPost = ({ post }: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage src={post.coverImage} title={post.title} slug={post.slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${post.slug}`} href="/posts/[slug]" name={post.title} />
          </h3>
          {post.date && (
            <div className="mb-4 md:mb-0 text-lg">
              <Time date={post.date} />
            </div>
          )}
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
          {post.tags && <Tags tags={post.tags} />}
        </div>
      </div>
    </section>
  )
}

export default HeroPost
