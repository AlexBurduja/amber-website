import { getImageProps } from "next/image";
import { incarcator } from "@/lib/imagini";

const avif = incarcator("avif");
const webp = incarcator("webp");

// Înlocuiește next/image pe un site static: <picture> cu AVIF și WebP generate la build,
// plus JPEG-ul original ca rezervă. Primește aceleași proprietăți ca next/image.
export default function Imagine({ alt, onLoad, ...rest }) {
  const a = getImageProps({ alt, ...rest, loader: avif }).props;
  const w = getImageProps({ alt, ...rest, loader: webp }).props;
  const { srcSet, src, ...img } = a;

  return (
    <picture>
      <source type="image/avif" srcSet={a.srcSet} sizes={a.sizes} />
      <source type="image/webp" srcSet={w.srcSet} sizes={w.sizes} />
      <img {...img} src={rest.src} alt={alt} onLoad={onLoad} />
    </picture>
  );
}
