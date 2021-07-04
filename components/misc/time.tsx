import classNames from "classnames"
import { format, parseISO, formatDistance } from "date-fns"
import Image from "next/image"

import clock from "../../public/assets/icons/clock.png"

type Props = {
  date: string
  duration: number

  location?: "right" | "left"
}

const Time = ({ date, location, duration }: Props) => {
  const datetime = parseISO(date)
  const distance = duration > 0 && formatDistance(0, duration * 1000, { includeSeconds: true, addSuffix: false })
  const cn = classNames(
    "flex",
    "flex-row",
    "items-center",
    "gap-2",
    location === "right" ? "justify-end" : "justify-start"
  )
  return (
    <div className={cn}>
      <Image src={clock} alt="clock icon for publish time" width={25} height={25} />
      <span>
        <time dateTime={datetime.toISOString()}>{format(datetime, "LLLL	d, yyyy")}</time>
        {duration > 0 && <span> · </span>}
        {duration > 0 && <time>{distance}</time>}
      </span>
    </div>
  )
}

export default Time
