import PaginaCategorie, { metadataCategorie } from "@/components/PaginaCategorie";

export const metadata = metadataCategorie("living");

export default function Living() {
  return <PaginaCategorie slug="living" />;
}
