import PaginaCategorie, { metadataCategorie } from "@/components/PaginaCategorie";

export const metadata = metadataCategorie("bucatarii");

export default function Bucatarii() {
  return <PaginaCategorie slug="bucatarii" />;
}
