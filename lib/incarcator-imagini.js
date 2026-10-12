import { incarcator } from "./imagini";

// Încărcătorul implicit pentru next/image (next.config.mjs). Componenta Imagine îl folosește
// pe acesta pentru AVIF și unul separat pentru WebP.
export default incarcator("avif");
