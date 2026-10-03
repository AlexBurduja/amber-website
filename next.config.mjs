/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // Formularul de ofertă: până la 5 poze de 5 MB, plus câmpurile text.
      bodySizeLimit: "26mb",
    },
  },
};

export default nextConfig;
