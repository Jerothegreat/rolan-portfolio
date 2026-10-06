# Design Brief: Soft Neobrutalism

**Source:** design brief section of "1mil.dev — PRD, TRD and design brief" (2026-10-07). These values are the only allowed design tokens; UI skills must follow them over their own defaults.

Thick ink borders and hard offset shadows like classic neobrutalism, softened with rounded corners, a cream canvas, and one gold accent that stands for the 1mil dream.

**Personality:** playful, honest, builder, warm. **Never:** chaotic, corporate, glassy.

**No AI-slop styling:** no glows, neon, gradients, pulsing dots, or blurred halos. Status badges (`live`, `building`, `archived`) are flat pills: solid fill, ink border, ink text.

## Colors

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | #FFF8EC cream | #141414 | page canvas |
| `--surface` | #FFFFFF | #1F1F1F | cards |
| `--ink` | #111111 | #F5F0E6 | text, borders, shadows |
| `--ink-muted` | #5C5C5C | #B5B0A6 | secondary text |
| `--gold` (primary accent) | #FFC940 | #FFC940 | 1mil tracker, primary button, wins |
| `--lilac` (support) | #B9A7FF | #8F7BEA | AI items, chat, tags |
| `--mint` (status) | #7EE0B5 | #4CC495 | live demo, shipped |
| `--coral` (sparingly) | #FF7A59 | #FF8A6C | hover highlight, errors |

Rules:
- One gold thing per section.
- Lilac marks anything AI.
- Never more than 2 accents on screen at once.
- Text on gold, mint, or lilac is always `#111111`.

## Fonts (Google Fonts)

| Role | Font | Weights | Sizes (desktop / mobile) |
| --- | --- | --- | --- |
| Display / headings | Bricolage Grotesque | 600, 800 | H1 56/36, H2 36/28, H3 24/20 |
| Body | Inter | 400, 500 | 18/16, line-height 1.6 |
| Mono (tags, counter, code, terminal) | JetBrains Mono | 400, 700 | 14/13 |

Fallbacks: `system-ui, sans-serif` / `ui-monospace, monospace`. Blog body max width 68ch.

## Spacing And Layout

- 4 px base; scale 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Container max 1120 px; side padding 24 px (16 on mobile).
- Section gap 96 px desktop, 64 mobile; card gap 24 px.
- Grid: 12 columns desktop, 4 mobile; project cards 3-up, 2-up, 1-up.
- Breakpoints: 640 / 1024 / 1280 px.

## Shape

| Token | Value |
| --- | --- |
| Border | 2px solid `--ink` (3px on primary buttons) |
| Radius | cards 16px, buttons 12px, inputs 10px, pills 999px |
| Shadow rest | `4px 4px 0 var(--ink)` |
| Shadow hover | `6px 6px 0 var(--ink)` + `translate(-2px, -2px)` |
| Shadow pressed | `0 0 0` + `translate(4px, 4px)` |

## Components

- Buttons: primary (gold fill), secondary (surface fill), ghost (text + underline); all press into their shadow.
- Cards: project, hackathon, post, tool (flip), skill group.
- Pills/badges: tag, placement (gold for wins), status (mint for live).
- Tracker: mono counter + rounded progress bar + milestone dots.
- Chat: floating lilac button; panel with suggested-question chips; source chips under answers.
- Demo badge: small pill `by 1mil.dev ↗` fixed bottom-right on every demo.
- Nav: sticky; logo left; 4 links + gold `Ask my AI` button; mobile = bottom-sheet menu.

## Motion

| Element | Motion | Duration |
| --- | --- | --- |
| Buttons, cards | lift on hover, press on click | 120 ms, ease-out |
| Hero role line | typing loop: AI engineer / builder / hackathon goblin | 60 ms per char |
| 1mil counter | odometer roll on first view | 1.2 s once |
| Sections | fade + 12px rise on scroll into view | 300 ms once |
| Hackathon strip | slow ticker, pauses on hover | 30 s loop |
| Tool cards | flip to show "used it for…" | 400 ms |
| Email pill | copy + tiny confetti | 600 ms |

All motion is off under `prefers-reduced-motion`. No parallax, no scroll-jacking, no 3D.

## Imagery And Voice

- Imagery: 1 real photo of Rolan, demo gifs/videos, hand-drawn doodle stickers (one mascot max), hackathon photos. No stock images.
- Voice: first person, short, a bit cheeky. Example hero line: "I build AI apps, win hackathons, and write about what broke."
