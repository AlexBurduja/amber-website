import PaginaCategorie, { metadataCategorie } from "@/components/PaginaCategorie";

export const metadata = metadataCategorie("hol");

export default function MobilierHol() {
  return <PaginaCategorie slug="hol" />;
}
