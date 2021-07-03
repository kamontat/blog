type Props = {
  content?: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="mx-auto">
      {content && (
        <article
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-blue"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  )
}

export default PostBody
