import { RawPost } from "../../lib/posts/models"

type Props = {
  previous?: RawPost
  next?: RawPost
}

const Paginator = ({ previous, next }: Props) => {
  return (
    <div className="flex flex-row flex-nowrap justify-between">
      {previous && <div>{previous}</div>}
      {next && <div>{next}</div>}
    </div>
  )
}

export default Paginator
