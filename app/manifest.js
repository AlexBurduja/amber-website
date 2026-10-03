export default function manifest() {
  return {
    name: "Amber, mobilă la comandă",
    short_name: "Amber",
    description: "Producător de mobilier la comandă, cu fabrică proprie în București. Lucrăm în toată țara.",
    lang: "ro",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F4",
    theme_color: "#111111",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
