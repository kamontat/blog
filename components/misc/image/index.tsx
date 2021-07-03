import NextImage from "next/image"
import style from "./index.module.css"

type Props = {
  src?: string
  def: StaticImageData

  alt?: string
  width?: number
  height?: number
}

// possible:  no-width, no-height
//            width, auto-height
//            width, height
const Image = ({ src, def, alt, width, height }: Props) => {
  if (!src) {
    return (
      <div className={style.container}>
        <NextImage
          src={def}
          width={def.width}
          height={def.height}
          layout="responsive"
          className={style.image}
          alt={`Default Image for ${alt}`}
        />
      </div>
    )
  }

  if (width && height) {
    return (
      <div className={style.container}>
        <NextImage
          src={src}
          alt={alt}
          layout="responsive"
          width={width}
          height={height}
          className={style.image}
          objectFit="contain"
        />
      </div>
    )
  } else if (width && !height) {
    return (
      <div className={style.container} style={{ width: `${width}px` }}>
        <NextImage src={src} alt={alt} layout="fill" className={style.image} />
      </div>
    )
  } else {
    return (
      <div className={style.container}>
        <NextImage src={src} alt={alt} layout="fill" className={style.image} />
      </div>
    )
  }
}

export default Image
