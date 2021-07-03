import TagManager from "../../misc/gtm"
import Container from "../../misc/container"
import Meta from "../../misc/meta"
import { Footer } from "../footer"

import style from "./index.module.css"

type Props = {
  title?: string
  description?: string
  meta?: Record<string, string>[]
  image?: string
  children: React.ReactNode
  gtm?: boolean
}

export const Normal = ({ title, description, meta, children, image, gtm }: Props) => {
  return (
    <>
      <Meta title={title} description={description} meta={meta} image={image} />
      <TagManager enabled={gtm} />
      <Container>
        <main className={style.main}>{children}</main>
        <Footer />
      </Container>
    </>
  )
}
