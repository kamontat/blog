import classNames from "classnames"
import { format, parseISO } from "date-fns"
import Image from "next/image"

import clock from "../../public/assets/icons/clock.png"

type Props = {
  date: string
  location?: "right" | "left"
}

const Time = ({ date, location }: Props) => {
  const datetime = parseISO(date)
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
      <time dateTime={datetime.toISOString()}>{format(datetime, "LLLL	d, yyyy")}</time>
    </div>
  )
}

export default Time
