import style from "./body.module.css"

type Props = {
  content?: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="mx-auto">
      {content && <div className={style.markdown} dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  )
}

export default PostBody
