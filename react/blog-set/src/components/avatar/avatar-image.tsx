import Image, { ImageProps } from "next/image";

type AvatarImageProps = ImageProps;

export function AvatarImage({ src, alt, width = 40, height = 40, ...rest }: AvatarImageProps) {
  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}