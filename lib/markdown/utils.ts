import remark from "remark"
import remark2rehype from "remark-rehype"

export const mdToHtml = async (md: string): Promise<string> => {
  const processor = remark().use(remark2rehype)
  return processor.process(md).then((s) => s.toString("utf8"))
}
