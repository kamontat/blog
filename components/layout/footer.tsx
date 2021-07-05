import Link from "../misc/link"

import pjson from "../../package.json"

export const Footer = () => {
  return (
    <footer className="font-bold tracking-tight md:tracking-tighter leading-tight my-10 py-6 border-t">
      <span className="block text-small text-right">
        Made with 💖 using <Link href="https://nextjs.org" name="Next.js" underline="always" window={true} /> and{" "}
        <Link href="https://tailwindcss.com" name="Tailwindcss" underline="always" window={true} />.
      </span>
      <span className="block text-small text-right">
        Current version is `<Link href="/changelog" name={`v${pjson.version}`} underline="always" window={true} />` (
        <Link href="https://github.com/kamontat/blog" name={`source`} underline="always" window={true} />)
      </span>
    </footer>
  )
}
