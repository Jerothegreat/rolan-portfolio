// The 1mil.dev mark: a pixel gold coin with a $ (the money toward 1,000,000), drawn on a
// 16x16 grid and set like a tilted sticker. Pixels are computed once at module load.
const SIZE = 16;
const C = (SIZE - 1) / 2;

// "$" glyph, 5 wide x 9 tall, placed at column 5, row 3.
const DOLLAR = ["..#..", ".####", "#.#..", "#.#..", ".###.", "..#.#", "..#.#", "####.", "..#.."];

function pixels() {
  const rim: string[] = [];
  const face: string[] = [];
  const shine: string[] = [];
  const glyph: string[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const d = Math.hypot(x - C, y - C);
      if (d > 7.6) continue;
      const cell = `M${x} ${y}h1v1h-1z`;
      const gx = x - 5;
      const gy = y - 3;
      if (DOLLAR[gy]?.[gx] === "#") glyph.push(cell);
      else if (d > 6.4) rim.push(cell);
      else if (d > 5.2 && x + y < 13) shine.push(cell);
      else face.push(cell);
    }
  }
  return { rim: rim.join(""), face: face.join(""), shine: shine.join(""), glyph: glyph.join("") };
}

/** The coin's pixel paths; the tab icon (`app/icon.tsx`) draws the same coin. */
export const P = pixels();

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-1 -1 18 18" shapeRendering="crispEdges" aria-hidden="true" className={`-rotate-6 drop-shadow-[2px_2px_0_var(--ink)] ${className}`}>
      <circle cx="8" cy="8" r="8.6" fill="var(--surface)" />
      <path d={P.rim} fill="#111111" />
      <path d={P.face} fill="var(--gold)" />
      <path d={P.shine} fill="color-mix(in srgb, var(--gold) 45%, #ffffff)" />
      <path d={P.glyph} fill="#111111" />
    </svg>
  );
}
