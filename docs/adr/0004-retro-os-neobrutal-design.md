# ADR 0004: Retro-OS Neobrutal Design Replaces Soft Neobrutalism

**Status:** Accepted (2026-10-09)

## Context

The Plan 01 "soft neobrutal" look had rounded cards in one centered column, mostly gold, with a typing animation in the hero. Rolan found it too basic and asked for a design that commits to neobrutalism: overlapping UI, old-software windows, pixel art, more than one accent color, no text animation, and a visible road from the start of the journey to 1,000,000. He chose palette A ("Cream OS multicolor"), subtle tilt, and smooth curved road lines on a reference board.

## Decision

- Every surface is a window: square corners, 3px ink border, hard 6px shadow, and a pixel-font title bar in a flat accent. Windows tilt within ±2° and overlap on large screens.
- The palette keeps cream, ink, gold, lilac, mint, and coral, and adds sky and pink. Gold is reserved for the 1mil goal and wins.
- Pixel art comes from established sets, not hand-drawn assets: `pixelarticons` (MIT) for icons and Silkscreen (OFL) for chrome text.
- The hero typing loop is removed. Motion is limited to the tracker meter fill, the road draw-in, the maximize grow, and hover/press, all disabled under reduced motion.
- The 1mil tracker (SF-02) moves into this plan as `1mil.exe` and `road_to_1M.map`. Milestones gain `highlight`, `summary`, and `stamp`, plus an `education` type. Points follow a level × result table, so the total reflects real progress (195,000 at adoption).

## Consequences

- `docs/standards/design-brief.md` is rewritten; components use the `Window` component and the new tokens.
- Remaining Plan 02 pages (/work, /hackathons, highlights) and Plan 03 pages are built in this system from the start.
- The two decorative backgrounds (dither dots, title stripes) use CSS gradient functions as patterns. The brief's no-gradient rule applies to fills, not to these patterns.
- One new runtime dependency (`pixelarticons@2.4.1`, pinned) adds per-icon SVG components only.
