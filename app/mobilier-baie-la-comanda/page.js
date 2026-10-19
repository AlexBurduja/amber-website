import PaginaCategorie, { metadataCategorie } from "@/components/PaginaCategorie";

export const metadata = metadataCategorie("baie");

export default function MobilierBaie() {
  return <PaginaCategorie slug="baie" />;
}
