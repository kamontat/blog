import Script from "next/script"

type Props = {
  enabled?: boolean
}

const TagManager = ({ enabled }: Props) => {
  if (enabled) {
    return <Script src="/scripts/gtm.js" id="gtm" />
  }
  return <span aria-details="you disabled google tag manager" />
}

export default TagManager
