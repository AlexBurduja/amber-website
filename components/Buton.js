import Link from "next/link";
import styles from "./Buton.module.css";

// varianta: "principal" (galben), "ink" (negru, pentru fundal galben), "contur"
export default function Buton({ href, varianta = "principal", marime, children, className = "", ...rest }) {
  const clase = [styles.buton, styles[varianta], marime === "mic" ? styles.mic : "", className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const extern = /^(https?:|tel:|mailto:)/.test(href);
    if (extern) {
      return (
        <a href={href} className={clase} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={clase} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={clase} {...rest}>
      {children}
    </button>
  );
}
