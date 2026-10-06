# Frontend Content Manifest

## Source

All data populated from `content/RESUME-ROLAN JERO PINTON.pdf` (the canonical resume) plus `content/*.md` source files. Phone number intentionally excluded — contact surface is email + GitHub + LinkedIn only.

## Pulled from Real Content (`content/*.md` + resume PDF)

The following data was auto-populated from source files. Nothing below was invented.

### profile.ts
- **name** — "Rolan Jero Pinton"
- **title** — "AI Engineer & Full-Stack Developer"
- **bio** — UMak CS student, competition wins, Sofi AI internship (3 sentences)
- **availability** — "open"
- **location** — "Makati, NCR" ✅ DONE
- **email** — `rolanjerorarelapinton@gmail.com` ✅ DONE
- **github** — `https://github.com/Jerothegreat` ✅ DONE
- **resume** — `/resume.pdf` (file copied to `public/resume.pdf` from resume PDF) ✅ DONE
- **education** — added to Profile interface and data: UMak, BS CS App Dev, expected 2027, 8 coursework items ✅ DONE

### skills.ts
- **ai**: Python, LangChain, RAG, Prompt Engineering, LLM Integration, Agentic Coding (Codex, Claude), Vector Search / Qdrant, Guardrails
- **fullstack**: TypeScript, JavaScript, Java, C#, Kotlin, PHP, SQL, React, React + Capacitor, Flutter, Node.js, Express.js, NestJS, REST APIs
- **infra**: Docker, Docker Compose, Firebase / Firestore, PostgreSQL, MySQL, Git, GitHub, Postman, Vercel, VS Code

### experience.ts
- **AI & QA Intern @ Sofi AI Tech Solution Inc.** — May 2025 – Present ✅ DONE
- 3 bullets from resume: Policy Bot (LangChain/Telegram), client-onboarding site (AI doc → template), QA on Messenger chatbots

### projects.ts
> **NOTE:** Section restructured. Company Policy Bot and Portfolio AI Assistant have been folded into the generic "Chatbots" entry. The old "Restaurant Seat Reservation" is now "Restaurant Web". "CCED Admin System" is now "CCED-Admin-web". "UMak Kalinga" is now "UMak Kalinga App". "Airplane Ticketing System" is new.

- **Restaurant Web** — stack: HTML, CSS, PHP, MySQL; description: web-based reservation system (complete) ✅
- **Airplane Ticketing System** — stack: `[TECH STACK]`; description: `[DESCRIPTION]`; url: `[AIRPLANE TICKETING URL]`
- **CCED-Admin-web** — stack: TypeScript, React, Node.js, Express.js; description: admin portal (complete) ✅; url: `[CCED ADMIN URL]`
- **UMak Kalinga App** — stack: React, Capacitor, Node.js, Express.js, Firebase, Firestore; description: donation platform (complete) ✅; url: `[UMAK KALINGA URL]`
- **Chatbots** — stack: `[TECH STACK]`; description: `[DESCRIPTION]` (folded RAG assistants + policy bot + portfolio AI); url: `[CHATBOTS URL]`

### competitions.ts (replaces hackathons.ts — section renamed to "competitions / awards")
> **NOTE:** Section renamed from "hackathons" → "competitions --awards". `lib/data/hackathons.ts` deleted; `lib/data/competitions.ts` created. Component renamed `Hackathons.tsx` → `Competitions.tsx`. Nav id changed from `hackathons` → `competitions`.

#### Awards
- **Infotechnolympics 2025** — Champion, Java Programming, 2025 (rank: 1st) ✅
- **14th IT Skills Olympics 2025** — UMak Representative, Java Programming, 2025; 60+ universities, hosted by UMak CCIS ✅

#### Hackathons
- **Developer Camp Manila** — Product: Pulsify, Year: 2026; stack: `[TECH STACK]`; description suffix: `[DESCRIPTION]`
- **Agora** — Product: Mayari Voice Agent (combined with Haliya); Year: `[YEAR]`; description: `[DESCRIPTION]`; stack: `[TECH STACK]`
- **Zero Vector Venture** — Product: `[PRODUCT]`; Year: `[YEAR]`; description: `[DESCRIPTION]`; stack: `[TECH STACK]`
- **Devkada** — Product: Haliya; Year: `[YEAR]`; description: `[DESCRIPTION]`; stack: `[TECH STACK]`

### events.ts → `lib/data/events.ts`
| Token | Field | Where to update |
|---|---|---|
| `[EVENT NAME]` | `events[0].name` | Name of the first event |
| `[attendee/speaker]` | `events[0].role` | Your role at the event |
| `[YEAR]` | `events[0].year` | Year of the event |

### certifications.ts → `lib/data/certifications.ts`
| Token | Field | Where to update |
|---|---|---|
| `[CERT NAME]` | `certifications[0].name` | Certification name |
| `[ISSUER]` | `certifications[0].issuer` | Issuing organization |
| `[YEAR]` | `certifications[0].year` | Year earned |

---

## Tokens — Values to Fill In

Replace every `[TOKEN]` literal before launch. All tokens are visible string literals in the source files.

### profile.ts → `lib/data/profile.ts`
| Token | Field | Status |
|---|---|---|
| `[LINKEDIN URL]` | `profile.links.linkedin` | **PENDING** — provide LinkedIn profile URL |
| `[PROFILE IMAGE]` | `profile.avatar` | **PENDING** — place image at `public/profile.jpg` and set value to `/profile.jpg` |

### projects.ts → `lib/data/projects.ts`
| Token | Field | Where to update |
|---|---|---|
| `[RESTAURANT WEB URL]` | `url` on Restaurant Web | GitHub repo or live URL |
| `[AIRPLANE TICKETING URL]` | `url` on Airplane Ticketing System | GitHub repo or live URL |
| `[AIRPLANE TICKETING DESCRIPTION]` | `description` on Airplane Ticketing System | Short description of the project |
| `[AIRPLANE TICKETING TECH STACK]` | `stack` on Airplane Ticketing System | e.g. ["Java", "MySQL"] |
| `[CCED ADMIN URL]` | `url` on CCED-Admin-web | GitHub repo or live URL |
| `[UMAK KALINGA URL]` | `url` on UMak Kalinga App | GitHub repo or live URL |
| `[CHATBOTS URL]` | `url` on Chatbots | GitHub repo or live URL |
| `[CHATBOTS DESCRIPTION]` | `description` suffix on Chatbots | Additional detail to append |
| `[CHATBOTS TECH STACK]` | `stack` on Chatbots | e.g. ["Python", "LangChain", "Qdrant"] |

### competitions.ts → `lib/data/competitions.ts`
| Token | Field | Where to update |
|---|---|---|
| `[TECH STACK]` (Developer Camp Manila) | `hackathons[0].stack` | Tech used for Pulsify |
| `[DESCRIPTION]` (Developer Camp Manila) | `hackathons[0].description` suffix | Full description of Pulsify build |
| `[YEAR]` (Agora) | `hackathons[1].year` | Year of Agora hackathon |
| `[DESCRIPTION]` (Agora) | `hackathons[1].description` | Description of Mayari Voice Agent |
| `[TECH STACK]` (Agora) | `hackathons[1].stack` | Tech used for Mayari Voice Agent |
| `[YEAR]` (Zero Vector Venture) | `hackathons[2].year` | Year of Zero Vector Venture |
| `[PRODUCT]` (Zero Vector Venture) | `hackathons[2].product` | Product name built at Zero Vector Venture |
| `[DESCRIPTION]` (Zero Vector Venture) | `hackathons[2].description` | Description of Zero Vector Venture project |
| `[TECH STACK]` (Zero Vector Venture) | `hackathons[2].stack` | Tech used at Zero Vector Venture |
| `[YEAR]` (Devkada) | `hackathons[3].year` | Year of Devkada hackathon |
| `[DESCRIPTION]` (Devkada) | `hackathons[3].description` | Description of Haliya |
| `[TECH STACK]` (Devkada) | `hackathons[3].stack` | Tech used for Haliya |
