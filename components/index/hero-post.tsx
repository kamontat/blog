import Link from "next/link"
import { Post } from "../../lib/posts/models"
import CoverImage from "../misc/cover"
import Time from "../misc/time"

type Props = {
  post: Post
}

const HeroPost = ({ post }: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage src={post.coverImage} title={post.title} slug={post.slug} height={620} width={1240} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
              <a className="hover:underline">{post.title}</a>
            </Link>
          </h3>
          {post.date && (
            <div className="mb-4 md:mb-0 text-lg">
              <Time date={post.date} />
            </div>
          )}
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
