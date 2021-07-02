import remark from "remark"
import html from "remark-html"

export const mdToHtml = async (md: string): Promise<string> => {
  const file = await remark().use(html).process(md)
  return file.toString("utf8")
}
