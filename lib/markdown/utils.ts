import type { Plugin, Transformer } from "unified"
import type { Node } from "unist"

import React from "react"
import Image from "../../components/markdown/image"
import Gist from "../../components/misc/gist"

import visit from "unist-util-visit"

import remark from "remark"
import gfm from "remark-gfm"
import image from "remark-images"
import slug from "remark-slug"
import toc from "remark-toc"
import external from "remark-external-links"
import directive from "remark-directive"
import remark2rehype from "remark-rehype"

import link from "rehype-autolink-headings"
import sanitize from "rehype-sanitize"
import highlight from "rehype-highlight"
import rehype2react from "rehype-react"

const directiveHandler: Plugin = () => {
  const transform: Transformer = (node) => {
    visit(node, ["textDirective", "leafDirective", "containerDirective"], onDirective)
  }
  const onDirective: visit.Visitor<Node> = (node, _, parent) => {
    if (parent) {
      parent.data = {}
      parent.children = []
      if (!parent.data) parent.data = {}
      parent.data.hName = node.name
      parent.data.hProperties = node.attributes

      return visit.SKIP
    }

    if (!node.data) node.data = {}
    node.data.hName = node.name
    node.data.hProperties = node.attributes
  }

  return transform
}

export const mdToHtml = (md: string): React.ReactElement => {
  const processor = remark()
    .data("settings", { fragment: true })
    .use(gfm)
    .use(image)
    .use(slug)
    .use(toc)
    .use(external, { target: "_blank" })
    .use(directive)
    .use(directiveHandler)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(highlight)
    .use(link, { behavior: "wrap", properties: { ariaHidden: true, tabIndex: -1 } })
    .use(rehype2react, {
      createElement: React.createElement,
      Fragment: React.Fragment,
      // passNode: true,
      components: {
        img: Image,
        gist: Gist,
      },
    })

  return (
    processor
      // .use(sanitize, {
      //   clobber: [],
      //   attributes: {
      //     span: ["className"],
      //     gist: ["id", "username", "file"],
      //     iframe: ["title", "width", "height"],
      //     "*": [
      //       "id",
      //       "name",
      //       "className",
      //       "header",
      //       "href",
      //       "src",
      //       "target",
      //       "tabIndex",
      //       "ariaHidden",
      //       "align",
      //       "width",
      //       "height",
      //     ],
      //   },
      //   allowComments: false,
      //   allowDoctypes: true,
      //   strip: [],
      // })
      .processSync(md).result as React.ReactElement
  )
}
