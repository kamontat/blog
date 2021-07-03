import remark from "remark"
import remark2rehype from "remark-rehype"
import html from "rehype-stringify"
import slug from "rehype-slug"
import link from "rehype-autolink-headings"
import sanitize from "rehype-sanitize"
import gtm from "remark-gfm"
import highlight from "rehype-highlight"

export const mdToHtml = async (md: string): Promise<string> => {
  const processor = remark()
    .data("settings", { fragment: true })
    .use(gtm)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(highlight)
    .use(slug)
    .use(link)
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
        "*": ["id", "name", "className", "header", "href", "tabIndex", "ariaHidden", "align"],
      },
    })
    .process(md)
    .then((s) => s.toString("utf8"))
}
