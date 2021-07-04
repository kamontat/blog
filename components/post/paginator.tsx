import Posts from "../index/posts"
import type { SerizalizePost } from "../../lib/posts/post"
import { Post } from "../../lib/posts/post"

type Props = {
  previous?: SerizalizePost
  next?: SerizalizePost
}

const Paginator = ({ previous, next }: Props) => {
  const posts: Post[] = []
  if (previous) {
    posts.push(Post.deserialize(previous))
  }
  if (next) {
    posts.push(Post.deserialize(next))
  }

  return <Posts posts={posts} />
}

export default Paginator
