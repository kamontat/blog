type Props = {
  children: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="container block mx-auto px-7 md:px-12 max-w-5xl">{children}</div>
}

export default Container
