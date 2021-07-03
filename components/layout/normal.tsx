import Container from "../misc/container"
import Meta from "../misc/meta"
import { Footer } from "./footer"

import style from "./normal.module.css"

type Props = {
  title?: string
  description?: string
  meta?: Record<string, string>[]
  image?: string
  children: React.ReactNode
}

export const Normal = ({ title, description, meta, children, image }: Props) => {
  return (
    <>
      <Meta title={title} description={description} meta={meta} image={image} />
      <Container>
        <main className={style.main}>{children}</main>
        <Footer />
      </Container>
    </>
  )
}
