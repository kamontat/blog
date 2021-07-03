import Link from "../misc/link"

type Props = {
  title: string
  children: React.ReactNode
}

const Header = ({ title, children }: Props) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 mb-3">{title}</h1>
          <div className="flex flex-row flex-nowrap gap-2 mb-5">
            <Link href="/" locale={"en"} name="EN" underline="hover" />
            <Link href="/" locale={"th"} name="TH" underline="hover" />
          </div>
        </div>
        <h4 className="text-center md:text-left text-lg">{children}</h4>
      </div>
    </section>
  )
}

export default Header
