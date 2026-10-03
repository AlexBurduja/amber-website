// Micșorarea imaginilor în browser, înainte de trimitere (doar în client).
// Reîncodarea prin canvas șterge și metadatele (EXIF, inclusiv coordonatele GPS ale locuinței).
// Dacă browserul nu poate decoda imaginea (ex. HEIC în Chrome), se păstrează fișierul original.

export async function micsoreazaImagine(fisier, laturaMaxima, calitate = 0.82) {
  if (!fisier.type.startsWith("image/") || fisier.type === "image/gif") return fisier;

  let imagine;
  try {
    imagine = await createImageBitmap(fisier, { imageOrientation: "from-image" });
  } catch {
    return fisier;
  }

  const scara = Math.min(1, laturaMaxima / Math.max(imagine.width, imagine.height));
  const latime = Math.round(imagine.width * scara);
  const inaltime = Math.round(imagine.height * scara);
  const canvas = document.createElement("canvas");
  canvas.width = latime;
  canvas.height = inaltime;
  const ctx = canvas.getContext("2d");
  // Fundal alb pentru PNG-urile transparente (planuri exportate din programe de desen).
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, latime, inaltime);
  ctx.drawImage(imagine, 0, 0, latime, inaltime);
  imagine.close?.();

  const blob = await new Promise((rezolva) => canvas.toBlob(rezolva, "image/jpeg", calitate));
  if (!blob) return fisier;
  const nume = `${fisier.name.replace(/\.[^.]+$/, "") || "imagine"}.jpg`;
  return new File([blob], nume, { type: "image/jpeg", lastModified: Date.now() });
}

// Înlocuiește fișierele dintr-un <input type="file">, ca formularul să le trimită pe cele micșorate.
export function puneFisiere(input, fisiere) {
  const dt = new DataTransfer();
  fisiere.forEach((f) => dt.items.add(f));
  input.files = dt.files;
}
