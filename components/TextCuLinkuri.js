import Link from "next/link";
import { bucatiLinkuri } from "@/lib/text";

// Text cu linkuri interne scrise ca [text](/cale/).
export default function TextCuLinkuri({ text }) {
  return bucatiLinkuri(text).map((b, i) =>
    typeof b === "string" ? (
      b
    ) : (
      <Link key={i} href={b.href} className="link">
        {b.text}
      </Link>
    ),
  );
}
