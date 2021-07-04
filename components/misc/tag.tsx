import cn from "classnames"
import type { Tag } from "../../lib/posts/tag"
import { parseTag } from "../../lib/tags"

type TagProps = {
  tag: Tag
}

type TagsProps = {
  tags: Tag[]
}

const Badge = ({ tag }: TagProps) => {
  return (
    <div
      className={cn("px-6", "py-0.5", "rounded-md")}
      style={{
        color: tag.textColor,
        backgroundColor: tag.bgColor,
      }}
    >
      <small className="text-base font-mono">{tag.name}</small>
    </div>
  )
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => {
        return <Badge key={tag.name} tag={tag} />
      })}
    </div>
  )
}

export default Tags
