import type { Plugin, Transformer } from "unified"
import type { Node } from "unist"

import visit from "unist-util-visit"

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

const transform: Transformer = (node) => {
  visit(node, ["textDirective", "leafDirective", "containerDirective"], onDirective)
}

const plugin: Plugin = () => transform
export default plugin
