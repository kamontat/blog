import type React from "react"
import type { Node } from "unist"

import CoverImage from "../misc/cover"

type Props = {
  node: Node
  src?: string
  alt?: string
}

const Image = ({ src, alt }: Props) => {
  return <CoverImage src={src} slug={alt} height={620} width={1240} />
}

export default Image
