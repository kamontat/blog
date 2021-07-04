import type React from "react"
// import type { Node } from "unist"

import CImage from "../misc/image"
import defaultImage from "../../public/assets/posts/default.jpeg"

type Props = {
  // node: Node
  src?: string
  alt?: string
}

const Image = ({ src, alt }: Props) => {
  return <CImage src={src} def={defaultImage} alt={alt} />
}

export default Image
