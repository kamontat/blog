import cn from "classnames"
import { parseTag } from "../../lib/tags"

type TagProps = {
  name: string
}

type TagsProps = {
  tags: string[]
}

const Tag = ({ name }: TagProps) => {
  const tag = parseTag(name)
  const bg = tag.bg ? tag.bg : "#CDD6E6"
  const fg = tag.fg ? tag.fg : "#505050"

  return (
    <div
      className={cn("px-6", "py-0.5", "rounded-md")}
      style={{
        color: fg,
        backgroundColor: bg,
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
        return <Tag key={tag} name={tag} />
      })}
    </div>
  )
}

export default Tags
