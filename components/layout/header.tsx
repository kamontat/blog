import Link from "next/link"
import json from "../../package.json"

export const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/">
        <a className="hover:underline">{json.display}</a>
      </Link>
      .
    </h2>
  )
}
