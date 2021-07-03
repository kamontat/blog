import cn, { Argument } from "classnames"
import NextLink, { LinkProps } from "next/link"

interface Props extends LinkProps {
  name?: string
  underline?: "hover" | "always"
  window?: boolean
}

const Link = (props: Props) => {
  var sname = props.name ?? props.as ?? props.href
  const classnames: Argument[] = ["hover:text-primary", "transition-colors", "duration-200"]
  props.underline === "hover" && classnames.push("hover:underline")
  props.underline === "always" && classnames.push("underline")

  const target = props.window ? "_blank" : "_self"
  return (
    <NextLink
      passHref
      as={props.as}
      href={props.href}
      locale={props.locale}
      prefetch={props.prefetch}
      replace={props.replace}
      shallow={props.shallow}
      scroll={props.scroll}
    >
      <a className={cn(classnames)} target={target}>
        {sname}
      </a>
    </NextLink>
  )
}

export default Link
