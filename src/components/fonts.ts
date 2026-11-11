import type { CSSProperties } from "react";

// The site's two typefaces, applied inline (tailwind.config.js isn't loaded by Tailwind v4).
export const displayFont: CSSProperties = {
  fontFamily: 'var(--font-archivo-black), "Archivo Black", sans-serif',
  fontWeight: 900,
};

export const bodyFont: CSSProperties = {
  fontFamily: "Helvetica, Arial, sans-serif",
};
