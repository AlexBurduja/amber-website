import PaginaCategorie, { metadataCategorie } from "@/components/PaginaCategorie";

export const metadata = metadataCategorie("comercial");

export default function Comercial() {
  return <PaginaCategorie slug="comercial" />;
}
