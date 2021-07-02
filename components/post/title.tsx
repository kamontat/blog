import cn from "classnames"

type Props = {
  children: React.ReactNode
}

const PostTitle = ({ children }: Props) => {
  const classnames = cn(
    "text-5xl md:text-6xl lg:text-7xl",
    "font-bold",
    "tracking-tighter",
    "leading-tight md:leading-none",
    "text-center md:text-left",
    "mb-12"
  )

  return <h1 className={classnames}>{children}</h1>
}

export default PostTitle
