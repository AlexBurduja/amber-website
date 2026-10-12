/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site static: `npm run build` scrie totul în out/, care se urcă pe hosting (vezi DEPLOY-DATAHOST.md).
  output: "export",
  // Fiecare pagină e un folder cu index.html, deci adresele se termină în „/” și serverul
  // le servește fără reguli de rescriere.
  trailingSlash: true,
  images: {
    // Variantele (AVIF, WebP) sunt generate după build de scripts/dupa-build.mjs, în out/imagini/.
    // Lățimile de aici trebuie să fie aceleași cu cele din lib/imagini.js.
    loader: "custom",
    loaderFile: "./lib/incarcator-imagini.js",
    deviceSizes: [640, 960, 1280, 1920, 2400],
    imageSizes: [256, 384],
  },
};

export default nextConfig;
