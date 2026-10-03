import PaginaCategorie, { metadataCategorie } from "@/components/PaginaCategorie";

export const metadata = metadataCategorie("dormitoare");

export default function Dormitoare() {
  return <PaginaCategorie slug="dormitoare" />;
}
