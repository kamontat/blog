import type { RawPost } from "../../lib/posts/models"

import Tags from "../misc/tag"
import Paginator from "./paginator"

type Props = {
  tags?: string[]
  previous?: RawPost
  next?: RawPost
}

const Footer = ({ tags, previous, next }: Props) => {
  const toTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
  }

  return (
    <footer className="mt-4">
      <div className="flex flex-row justify-between">
        {tags && <Tags tags={tags} />}
        <a className="text-base font-mono hover:underline hover:text-primary cursor-pointer" onClick={toTop}>
          UP
        </a>
      </div>
      <Paginator previous={previous} next={next} />
    </footer>
  )
}

export default Footer
