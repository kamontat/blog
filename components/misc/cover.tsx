import cn from "classnames"
import Link from "next/link"
import Image from "../../components/misc/image"

import defaultImage from "../../public/assets/posts/default.jpeg"

type ChildProps = {
  children: React.ReactNode
}

type Props = {
  title?: string
  src?: string
  height?: number
  width?: number
  slug?: string
}

const CoverImage = ({ title, src, slug, height, width }: Props) => {
  const image = (
    <Image src={src} def={defaultImage} alt={`${title ?? slug} cover image`} width={width} height={height} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
