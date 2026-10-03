import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import JsonLd from "./JsonLd";
import { schemaBreadcrumb } from "@/lib/schema";
import styles from "./Breadcrumb.module.css";

// pasi: [{ nume, href }], ultimul e pagina curentă.
export default function Breadcrumb({ pasi }) {
  const toti = [{ nume: "Acasă", href: "/" }, ...pasi];
  return (
    <>
      <nav aria-label="Breadcrumb" className={styles.nav}>
        <ol className={styles.lista}>
          {toti.map((pas, i) => {
            const ultimul = i === toti.length - 1;
            return (
              <li key={pas.href} className={styles.pas}>
                {ultimul ? (
                  <span aria-current="page">{pas.nume}</span>
                ) : (
                  <>
                    <Link href={pas.href}>{pas.nume}</Link>
                    <CaretRight size={12} weight="bold" aria-hidden="true" className={styles.sep} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd date={schemaBreadcrumb(toti)} />
    </>
  );
}
