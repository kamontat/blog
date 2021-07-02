import cn from "classnames"
import Image from "next/image"
import Link from "next/link"

import defaultImage from "../../public/assets/posts/default.jpeg"

type Props = {
  title?: string
  src?: string
  height: number
  width: number
  slug?: string
}

const CoverImage = ({ title, src, slug, height, width }: Props) => {
  const isDefault = src === undefined || src === null || src === ""

  var image: JSX.Element | undefined = undefined
  if (isDefault) {
    image = (
      <Image
        src={defaultImage}
        alt={`Default Image for ${title ?? slug}`}
        layout="responsive"
        height={height}
        width={width}
        className={cn("shadow-small", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
      />
    )
  } else {
    image = (
      <Image
        src={src ?? ""}
        alt={`Cover Image for ${title ?? slug}`}
        layout="responsive"
        height={height}
        width={width}
        className={cn("shadow-small", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
      />
    )
  }

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
