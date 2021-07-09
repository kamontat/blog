import type { Tag } from "../../lib/posts/tag"
import type { SerizalizePost } from "../../lib/posts/post"

import Link from "../misc/link"
import Tags from "../misc/tag"
import Paginator from "./paginator"

type Props = {
  github: string
  tags?: Tag[]
  previous?: SerizalizePost
  next?: SerizalizePost
}

const Footer = ({ github, tags, previous, next }: Props) => {
  const toTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
  }

  return (
    <footer className="mt-4">
      <div className="flex flex-row justify-between border-b pb-5 mb-12">
        {tags && <Tags tags={tags} />}
        <div className="flex gap-3 justify-center">
          <Link href={github} name="Edit" window={true} underline={"hover"} />
          <a className="font-mono hover:underline hover:text-primary cursor-pointer" onClick={toTop}>
            UP
          </a>
        </div>
      </div>
      <Paginator previous={previous} next={next} />
    </footer>
  )
}

export default Footer
