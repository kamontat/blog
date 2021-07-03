import remark from "remark"
import remark2rehype from "remark-rehype"
import html from "rehype-stringify"
import slug from "rehype-slug"
import link from "rehype-autolink-headings"
import sanitize from "rehype-sanitize"

export const mdToHtml = async (md: string): Promise<string> => {
  const processor = remark()
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(slug)
    .use(link, {
      behavior: "before",
      properties: { ariaHidden: "true", tabIndex: "-1", name: "icon" },
      content: {
        type: "element",
        tagName: "span",
        properties: { name: "link" },
      },
      group: (node: Record<string, string>) => {
        console.log(node)
        return {
          type: "element",
          tagName: "div",
          properties: { name: "header-group", header: node.tagName },
        }
      },
    })
    .use(html, {
      quoteSmart: true,
      closeSelfClosing: true,
      collapseEmptyAttributes: false,
      allowDangerousHtml: true,
      allowDangerousCharacters: true,
    })

  return processor
    .use(sanitize, {
      clobber: [],
      attributes: {
        span: ["className"],
        "*": ["id", "name", "className", "header", "href", "tabIndex", "ariaHidden"],
      },
    })
    .process(md)
    .then((s) => s.toString("utf8"))
}
