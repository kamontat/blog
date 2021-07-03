import type React from "react"
import type { Node } from "unist"

import CImage from "../misc/image"

type Props = {
  node: Node
  src?: string
  alt?: string
}

const Image = ({ src, alt }: Props) => {
  return <CImage src={src} alt={alt} />
}

export default Image
