type Props = {
  children: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="container block mx-auto px-5 md:px-10 max-w-5xl">{children}</div>
}

export default Container
