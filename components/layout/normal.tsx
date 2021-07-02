import Meta from "../misc/meta"

type Props = {
  title?: string
  meta?: Record<string, string>[]
  image?: string
  children: React.ReactNode
}

export const Normal = ({ title, meta, children, image }: Props) => {
  return (
    <>
      <Meta title={title} meta={meta} image={image} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
}
