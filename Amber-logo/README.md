# Amber – kit de logo

Toate SVG-urile au textul transformat în contur, deci arată identic pe orice calculator, fără fontul instalat. PNG-urile au fundal transparent (cu excepția avatarurilor, iconițelor și a imaginii de share).

## Ce fișier folosești unde

| Unde | Fișier |
| --- | --- |
| Antet site, desktop (fundal deschis) | `01-site/amber-logo-color.svg`, la 28–32px înălțime |
| Antet site, mobil | același `amber-logo-color.svg`, la 20–24px înălțime |
| Site pe fundal închis (footer, hero) | `01-site/amber-logo-pe-inchis.svg` |
| Spațiu foarte mic (sub ~100px lățime) | `05-simbol/amber-simbol-color.svg` (doar cele trei sertare) |
| Încărcare site / intro / final de video | `01-site/amber-logo-animat.svg` (sertarul se deschide în buclă) |
| Imagine la distribuirea linkului (Facebook, WhatsApp) | `01-site/og-image.png` (1200×630) |
| Poză de profil TikTok, Instagram, Facebook | `02-social-media/avatar-social-galben.png` (1080×1080) |
| Alternativă poză de profil | `02-social-media/avatar-social-negru.png` |
| Favicon și iconițe aplicație | `03-favicon-si-iconite/` |
| Cărți de vizită, documente, prezentări | `04-cu-slogan-si-monocrom/amber-logo-tagline-color.svg` |
| Print alb-negru, gravură, ștampilă | `amber-logo-negru.svg` / `amber-logo-alb.svg` |

## Reguli

- **Spațiu liber** în jurul logo-ului: cel puțin înălțimea unui sertar × 3 pe fiecare parte.
- **Mărime minimă:** wordmark-ul la 80px lățime pe ecran (20mm la print). Sub asta, folosește simbolul.
- Nu schimba culorile, nu întinde, nu roti, nu adăuga umbre sau contururi.
- Pe fundal galben, sertarul din mijloc devine alb (ca la avatarul galben).
- Pe poze, pune logo-ul doar pe zone liniștite, sau pe o bandă albă/neagră.

## Culori

| Nume | Cod |
| --- | --- |
| Galben Amber | `#FFD100` |
| Negru | `#111111` |
| Gri slogan (pe deschis) | `#5E5A55` |
| Gri slogan (pe închis) | `#BDB6AC` |
| Alb cald (fundal) | `#FAF8F4` |

**Font:** Montserrat SemiBold (logo), Montserrat Medium (slogan).

## Next.js (App Router)

Copiază în `app/`:
- `favicon.ico` → `app/favicon.ico`
- `favicon.svg` → `app/icon.svg`
- `apple-touch-icon.png` → `app/apple-icon.png`
- `og-image.png` → `app/opengraph-image.png`

Iar `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` în `public/` și în `manifest`. Logo-urile din `01-site/` în `public/brand/`.
