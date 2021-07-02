import Link from "next/link"
import { Post } from "../../lib/posts/models"
import CoverImage from "../misc/cover"
import Time from "../misc/time"

type Props = {
  post: Post
}

const PostPreview = ({ post }: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={post.slug} title={post.title} src={post.coverImage} height={278} width={556} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
          <a className="hover:underline">{post.title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">{post.date && <Time date={post.date} />}</div>
      <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
    </div>
  )
}

export default PostPreview
