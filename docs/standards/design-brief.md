# Design Brief: Retro-OS Neobrutalism

**Source:** design brief section of "1mil.dev — PRD, TRD and design brief" (2026-10-07), revised 2026-10-09 by Plan 02a (`docs/adr/0004-retro-os-neobrutal-design.md`). The approved reference board is palette A, "Cream OS multicolor". These values are the only allowed design tokens; UI skills must follow them over their own defaults.

The site is a retro desktop built from neobrutal windows. Each window has a 3px ink border, a hard offset shadow, square corners, an old-app title bar in a pixel font, and a flat accent fill. Windows tilt a little and overlap like papers on a desk, on a dithered cream canvas.

**Personality:** playful, honest, builder, warm. **Never:** chaotic, corporate, glassy.

**No AI-slop styling:** no glows, neon, gradient fills, pulsing dots, blurred halos, or animated text. Two repeating-pattern backgrounds are allowed because they read as texture, not as gradient fills: the desktop dither dots and the title-bar stripes. Status badges (`live`, `building`, `archived`) are flat pills: solid fill, ink border, ink text.

## Colors

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | #FFF8EC cream | #141414 | desktop canvas (with ink dither) |
| `--surface` | #FFFFFF | #1F1F1F | window bodies, menu and status bars |
| `--ink` | #111111 | #F5F0E6 | text, borders, shadows |
| `--ink-muted` | #5C5C5C | #B5B0A6 | secondary text |
| `--gold` | #FFC940 | #FFC940 | the 1mil goal and wins only; primary button |
| `--lilac` | #B9A7FF | #8F7BEA | anything AI (Ask my AI, terminal, skills panel) |
| `--mint` | #7EE0B5 | #4CC495 | live / shipped, projects |
| `--coral` | #FF7A59 | #FF8A6C | competitions, stamps, hover highlight, errors |
| `--sky` | #7CC8FF | #4BA8E8 | about / info windows, education |
| `--pink` | #FF9ECD | #E87DB0 | notes, stickers, contact |

Rules:
- Every window gets one flat title-bar color, and neighboring windows never share one.
- Gold is only for the 1mil goal, wins, and the primary button.
- Lilac marks anything AI.
- Text on any accent is always `#111111` (`--on-accent`).

## Fonts (Google Fonts)

| Role | Font | Weights | Sizes (desktop / mobile) |
| --- | --- | --- | --- |
| Display / headings | Bricolage Grotesque | 600, 800 | H1 56/36 (hero name up to 80), H2 36/28, H3 24/20 |
| Body | Inter | 400, 500 | 18/16, line-height 1.6 |
| Mono (tags, counter, code, terminal) | JetBrains Mono | 400, 700 | 14/13 |
| Pixel (chrome only) | Silkscreen | 400, 700 | 11–15 |

Silkscreen is only for title bars, the menu bar, the status bar, stamps, and icon labels. Headings and body text stay Bricolage and Inter for readability. Fallbacks are `system-ui, sans-serif` and `ui-monospace, monospace`. Blog body max width is 68ch.

## Pixel Icons

Icons come from `pixelarticons` (MIT, 24×24 grid, `fill="currentColor"`), imported per icon from `pixelarticons/react/<Name>`. Icons are decorative (`aria-hidden`) next to visible text. There is at most one mascot, made as a pixel sprite on a locked palette.

## Spacing And Layout

- 4 px base; scale 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Container max 1120 px; side padding 24 px (16 on mobile).
- Section gap 96 px desktop, 64 mobile; window gap 24–32 px.
- Grid: 12 columns desktop, 1 column mobile.
- Breakpoints: 640 / 1024 / 1280 px. The menu-bar links show from 1024; below that, the bottom-sheet menu.

## The Toolkit

| Move | Rule |
| --- | --- |
| Tilt | Windows and notes rotate within ±2°. Neighbors never share an angle. Hover or keyboard focus straightens a window and brings it to the front. |
| Misalign | Siblings get staggered offsets and different widths; no shared left edge in a pile. |
| Overlap | On ≥1024 px, windows cover 24–64 px of a neighbor (CSS grid shared rows plus negative margins). Below 1024 px they stack. |
| Stamps | Rotated rubber stamps (`CHAMPION`, `TOP 10`, `building`) sit on window edges; Silkscreen, ink border, flat fill. |
| Big type | The hero name is the largest type on the page and stays inside its window. |

Overlap, tilt, and offsets are visual only. DOM order is reading order and tab order.

## Shape

| Token | Value |
| --- | --- |
| Border | 3px solid `--ink` on windows and primary buttons; 2px on secondary buttons, chips, and pills |
| Radius | 0 everywhere; pills stay 999px |
| Shadow rest | windows `6px 6px 0 var(--ink)`; buttons `4px 4px 0 var(--ink)` |
| Shadow hover | windows `8px 8px 0` + straighten; buttons `6px 6px 0` + `translate(-2px, -2px)` |
| Shadow pressed | `0 0 0` + `translate(4px, 4px)` |

## Components

- **Window:** title bar (pixel icon, filename-style title, stripes, decorative `_ □ ×`), optional menu row, body. Real controls replace the decorative ones only where the window does something (the road's maximize).
- **Home order:** hero pile, experience + tech stack, projects carousel, road, In the news + blog, GitHub, contact.
- **Scrollbars:** square gold thumb with a 3px ink border on a dithered track (WebKit/Chromium); gold on surface in Firefox.
- **Menu bar** (sticky nav, above every window): logo, links (Experience, Projects, Road, Blog, Contact), the 1mil tray readout, `Ask my AI` (lilac), and a pixel sun/moon theme toggle, all as compact pixel chips. There is no separate terminal button: the terminal opens from the desktop icon or `~`, and the `~` hint lives only in the status bar. **Status bar** (footer): links, terminal hint, tracker total.
- **Hero:** `about.txt` (name, role, badge, tagline, CTAs), `me.jpg` (the real profile photo, taped), `1mil.exe`, `spotlight.exe`, and a column of desktop icons. Nothing in the hero covers a CTA.
- **1mil.exe:** the tracker as an installer progress dialog: a block meter, a mono counter, and a link to the road.
- **road_to_1M.map:** milestones on a winding S-curve path, each stop a small tilted window with month, label, points, and running total. Home shows `highlight: true` stops; □ maximizes into a dialog with every stop and its summary. The finished road is solid; the road ahead is dashed toward `next?` and the gold 1,000,000 goal.
- **C:\projects:** every listed project as a scroll-snap carousel with pixel prev/next arrows and tag filters (All / AI / Full-stack / Hackathon). Each card is a small window with a media slot, period, status pill, and a **Details** button. Details maximizes into a popup (the shared `WindowDialog`) with the full write-up: media, pills, the hackathon result, the body text, role, team, skills, and links. Inside the popup a C:\projects list, prev/next buttons, and the arrow keys switch items. The Projects icon and "See my work" open it.
- **blog.txt:** the 3 newest published posts, or a labelled empty state until the first post exists.
- **Ticker:** a gold marquee under the menu bar (stimmie.dev-style). It loops `siteConfig.tickerWords`, last updated (the latest commit date at build), yearly GitHub contributions, the 1mil total, and "you are visitor #000123" ("#------" until the counter store answers). It pauses on hover and focus and is still under reduced motion.
- **Logo:** a pixel gold coin with a $ (money toward 1,000,000), set as a tilted sticker (`LogoMark`). The browser tab uses the same coin (`app/icon.tsx`, 32 px PNG) and titles "1mil | Home", "1mil | Blog", "1mil | <post title>". On Home the title follows the section being read ("1mil | Projects"), via `SectionTitle`.
- **Stickers:** a mint starburst on `about.txt` shows `siteConfig.status` ("open to work!").
- **experience.log:** internships and jobs from milestones (period, company, summary). □ or "What I did there" maximizes it into every role's `details` lines.
- **github.exe:** a GitHub-style contribution heatmap in pixel squares (mint levels; newest weeks first on phones), an active badge, the last push, and recent actions. Refreshed hourly; hidden if GitHub cannot be reached.
- **mail.app:** one contact window: copy email, GitHub, LinkedIn, resume.
- **C:\projects (hackathons):** the Hackathon filter (and All) also lists every hackathon from the road as a card: date, placement (gold for top results), what was built, and the demo link. A hackathon with a `project` link has no card of its own: its result shows on that project's card (eGovPH → eHanda).
- **Blog:** `/blog` is a `C:\blog` window: tag filter chips and a bordered file list (date, tag, title, summary). `/blog/[slug]` is a `<slug>.txt · Notepad` window with a 68ch column; `.post` prose styles use tokens only (ink rules, square code blocks with a hard shadow).
- **Under construction:** an unfinished feature shows a gold sign on hazard tape (`.hazard`, hard-stop gold and ink stripes). The terminal shows it while the AI chat is unbuilt.
- **Maximize:** the road, experience, and project windows share one popup (`components/window-dialog.tsx`). It grows out of its window in `steps(6)`, and _, ▣, ×, Esc, or a backdrop click restore it, with focus returned to the opener.
- Buttons: primary (gold), secondary (surface), AI (lilac), ghost (underline), and compact pixel chips for the menu bar. All press into their shadow.
- Pills/badges: tag, placement (gold for wins), status (mint for live).
- Chat: floating lilac button; panel with suggested-question chips; source chips under answers.
- Demo badge: small pill `by 1mil.dev ↗` fixed bottom-right on every demo.

## Motion

| Element | Motion | Duration |
| --- | --- | --- |
| Buttons, windows | lift on hover, press on click; windows straighten | 120 ms, ease-out |
| 1mil.exe meter | blocks fill one by one, once on load | 70 ms per block |
| Road | path draws top to bottom in steps; stops pop in as it reaches them, once on first view | 1.6 s, `steps(24)` |
| Road maximize | window grows into the dialog and shrinks back | 260 ms, `steps(6)` |
| Ticker | marquee loop, pauses on hover/focus | 40 s loop |
| Sections | fade + 12px rise on scroll into view | 300 ms once |
| Tool cards | flip to show "used it for…" | 400 ms |
| Email pill | copy + tiny confetti | 600 ms |

There is no text animation: the role line and the counter are static. All motion is off under `prefers-reduced-motion`, and content is visible without JavaScript. There is no parallax, no scroll-jacking, and no 3D.

## Imagery And Voice

- Imagery: 1 real photo of Rolan (`public/profileimg.jpg`, in `me.jpg`), demo gifs/videos, hackathon photos, pixel icons, at most one pixel mascot. No stock images. Until a project, the spotlight, or a highlight has real media, it shows a labelled pixel placeholder of the same size (`MediaSlot`: dithered box, pixel icon, "screenshot soon" / "demo video soon" / "photo soon"), so the layout does not change when media arrives.
- Voice: first person, short, a bit cheeky. Example hero line: "I build AI apps, win hackathons, and write about what broke."
