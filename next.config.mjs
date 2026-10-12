/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // Formularul de ofertă trimite poze și, opțional, un plan. Limita e cea de pe Vercel
      // (~4,5 MB pe cerere); formularul ține atașamentele sub 4 MB (lib/cerere.js).
      // Pe alt server, reverse proxy-ul trebuie să accepte cel puțin atât (vezi HOSTING.md).
      bodySizeLimit: "4.5mb",
    },
  },
};

export default nextConfig;
