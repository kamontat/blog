type Props = {
  title: string
  children: React.ReactNode
}

const Header = ({ title, children }: Props) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">{title}</h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">{children}</h4>
    </section>
  )
}

export default Header
