/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // Formularul de ofertă: până la 5 poze de 5 MB, plus câmpurile text.
      // Ca pe Vercel (~4,5 MB pe cerere). Formularul ține atașamentele sub 4 MB (lib/cerere.js).
      bodySizeLimit: "4.5mb",
    },
  },
};

export default nextConfig;
