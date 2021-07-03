import PostPreview from "./post"

import type { Post } from "../../lib/posts/models"

type Props = {
  posts: Post[]
}

const Posts = ({ posts }: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">More Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 gap-y-14 md:gap-y-18 mb-32">
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}

export default Posts
