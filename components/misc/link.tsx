type Props = {
  url: string
  name?: string
}

const Link = ({ url, name }: Props) => {
  var sname = name ?? url
  return (
    <a href={url} className="underline hover:text-primary duration-200 transition-colors">
      {sname}
    </a>
  )
}

export default Link
