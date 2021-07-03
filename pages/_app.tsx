import type { AppProps } from "next/app"

import "../styles/global.css"
import "../styles/variable.css"

// import "highlight.js/styles/github-gist.css"
// import "highlight.js/styles/github.css"
import "highlight.js/styles/dark.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
