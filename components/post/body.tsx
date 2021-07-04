type Props = {
  children?: React.ReactElement
}

const PostBody = ({ children }: Props) => {
  return (
    <div className="mx-auto">
      <article className="prose prose-lg lg:prose-xl">{children}</article>
    </div>
  )
}

export default PostBody
