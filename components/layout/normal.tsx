import Meta from "../misc/meta"

type Props = {
  title?: string
  meta?: Record<string, string>[]
  children: React.ReactNode
}

export const Normal = ({ title, meta, children }: Props) => {
  return (
    <>
      <Meta meta={meta} />
      <div className="min-h-screen">
        {title && <title>{title}</title>}
        <main>{children}</main>
      </div>
    </>
  )
}
