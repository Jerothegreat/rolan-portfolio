import { ImageResponse } from "next/og";
import { P } from "@/components/logo-mark";

// Browser tab icon: the same pixel gold coin as the menu-bar logo, with literal colors
// (a favicon cannot read the page's CSS tokens). Rendered to PNG at build.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg width="32" height="32" viewBox="0 0 16 16" shapeRendering="crispEdges">
        <path d={P.rim} fill="#111111" />
        <path d={P.face} fill="#FFC940" />
        <path d={P.shine} fill="#FFE4A0" />
        <path d={P.glyph} fill="#111111" />
      </svg>
    ),
    size,
  );
}
