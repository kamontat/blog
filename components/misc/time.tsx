import classNames from "classnames"
import { format } from "date-fns"
import Image from "next/image"

import clock from "../../public/assets/icons/clock.png"

type Props = {
  date: Date
  location?: "right" | "left"
}

const Time = ({ date, location }: Props) => {
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
      <time dateTime={date.toISOString()}>{format(date, "LLLL	d, yyyy")}</time>
    </div>
  )
}

export default Time
