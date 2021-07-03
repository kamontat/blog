import React from "react"
import Image from "../../components/markdown/image"

import remark from "remark"
import gfm from "remark-gfm"
import image from "remark-images"
import remark2rehype from "remark-rehype"
import slug from "rehype-slug"
import link from "rehype-autolink-headings"
import sanitize from "rehype-sanitize"
import highlight from "rehype-highlight"
import rehype2react from "rehype-react"

export const mdToHtml = (md: string): React.ReactElement => {
  const processor = remark()
    .data("settings", { fragment: true })
    .use(gfm)
    .use(image)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(highlight)
    .use(slug)
    .use(link)
    .use(rehype2react, {
      createElement: React.createElement,
      Fragment: React.Fragment,
      passNode: true,
      components: {
        img: Image,
      },
    })

  return (
    processor
      // .use(sanitize, {
      //   clobber: [],
      //   attributes: {
      //     span: ["className"],
      //     "*": ["id", "name", "className", "header", "href", "src", "target", "tabIndex", "ariaHidden", "align"],
      //   },
      // })
      .processSync(md).result as unknown as React.ReactElement
  )
}
