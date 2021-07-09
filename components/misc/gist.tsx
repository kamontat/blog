import { useState } from "react"

interface Props {
  username?: string
  id?: string
  filename?: string

  width?: number | string
  maxWidth?: number

  height?: number | string
  maxHeight?: number
}

const toSize = (base?: number | string, maximum?: number): string => {
  if (typeof base === "string") return base
  else if (maximum && !base) return `${maximum}px`
  else if (base && !maximum) return `${base}px`
  else if (base && maximum) return `${Math.min(base, maximum)}px`
  else return "100%"
}

const Gist = ({ username, id, filename, width, maxWidth, height, maxHeight }: Props) => {
  const [autoWidth, _setWidth] = useState(toSize(width, maxWidth))
  const [autoHeight, setHeight] = useState(height)

  // default username is kamontat
  const user = username ? username : "kamontat"

  const title = `Gist id ${id}`
  var gist = `https://gist.github.com/${user}/${id}.js`
  if (filename) gist = gist + `?file=${filename}`

  const handler: React.ReactEventHandler<HTMLIFrameElement> = (obj) => {
    const height = obj.currentTarget.contentDocument?.body.scrollHeight
    setHeight(height && height + 30)
  }

  return (
    <div className="w-full h-full">
      <iframe
        title={title}
        width={autoWidth}
        height={autoHeight}
        srcDoc={`<!DOCTYPE html><html><style type="text/css">.gist-data {max-width: ${autoWidth};max-height: ${toSize(
          autoHeight,
          maxHeight ?? 600
        )}}</style><head></head><body><script src="${gist}"></script></body></html>`}
        onLoad={handler}
      ></iframe>
    </div>
  )
}

export default Gist
