// Variantele de imagine generate la build (scripts/dupa-build.mjs) și adresele lor.
// Lățimile trebuie să fie aceleași cu deviceSizes + imageSizes din next.config.mjs.
export const latimi = [256, 384, 640, 960, 1280, 1920, 2400];
export const formate = ["avif", "webp"];

// /proiecte/x/x-01.jpg, 960, "avif" → /imagini/proiecte/x/x-01-960.avif
export function adresaVarianta(src, latime, format) {
  return `/imagini${src.replace(/\.[a-z]+$/i, "")}-${latime}.${format}`;
}

// În dezvoltare variantele nu există: se servește originalul din public/.
const dezvoltare = process.env.NODE_ENV !== "production";

export function incarcator(format) {
  return ({ src, width }) => (dezvoltare || !/\.jpe?g$/i.test(src) ? src : adresaVarianta(src, width, format));
}
