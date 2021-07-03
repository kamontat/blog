import Link from "../misc/link"

export const Footer = () => {
  return (
    <div className="font-bold tracking-tight md:tracking-tighter leading-tight my-10 py-6 border-t">
      <span className="block text-small text-right">
        Made with 💖 using{" "}
        <Link href="https://github.com/kamontat/blog" name="Github" underline="always" window={true} /> and{" "}
        <Link href="https://nextjs.org" name="Next.js" underline="always" window={true} />.
      </span>
    </div>
  )
}
