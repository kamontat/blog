type Props = {
  children?: React.ReactElement
}

const PostBody = ({ children }: Props) => {
  return (
    <div className="mx-auto">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-blue">{children}</article>
    </div>
  )
}

export default PostBody
