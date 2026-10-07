# 1mil.dev Context

This context defines the domain language shared by the site, the content files, the 1mil tracker, and the site chat.

## Language

**1mil**:
The dream number, 1,000,000, used as a life-goal progress meter. It is not money and not a score others judge.
_Avoid_: Score, rank, earnings.

**Milestone**:
One dated, logged achievement (blog post, hackathon joined/placed/won, project shipped, internship/job, graduation) stored as one file under `content/milestones/`.
_Avoid_: Event (reserved for hackathons), achievement badge.

**Highlight**:
A milestone shown as news: Rolan's dated achievements and events (wins, internships, certifications, talks and meetups attended), newest first. Every milestone is a highlight; a highlight may carry a photo, a one-to-two-line summary, and a source link.
_Avoid_: Event when the whole dated list is meant; news post (posts are blog entries).

**Featured highlight**:
The single highlight Rolan hand-picks for the home page's "In the news" card. Exactly one at a time; it replaces a separate win badge.

**Zero-point milestone**:
A milestone with 0 points (for example a notable certification or event). It appears on the timeline and `/1mil` list but does not move the counter.

**Points**:
The value a milestone adds to the 1mil tracker, set by the tunable point rules in `docs/product/requirements-engineering.md`.
_Avoid_: XP, karma.

**1mil tracker**:
The mono counter, rounded progress bar, and milestone dots that sum all milestone points; shown small in the hero and in full on `/1mil`.
_Avoid_: Leaderboard.

**Project**:
One showcased piece of software with a case-study page at `/work/[slug]`, stored as one file under `content/projects/`.
_Avoid_: Repo (a project may have zero or many repos).

**Spotlight project**:
The single project Rolan hand-picks as most relevant right now, shown larger and more special than every other project on the home page. Exactly one project is the spotlight at any time.
_Avoid_: Featured project, top 3.

**Build span**:
When a project was built: a start month and, once it is no longer `building`, an end month. The work timeline is drawn from build spans.
_Avoid_: Project date.

**Project status**:
One of `live` (a working public demo exists), `building`, or `archived`. Status never adds points; a shipped project earns points only through its own milestone.
_Avoid_: "[IN PROGRESS]" in a project name.

**Alunsina**:
Rolan's team thesis project, a pet-care platform whose AI pet health advisory is what the brief called the "pet chatbot". It is one project, not two. Its live AI is not public; the AI is shown through a recorded showcase video, the architecture, and the write-up. Alunsina has its own team-owned product site for vets, clients, and experts; 1mil.dev holds only the engineering case study and links to it.
_Avoid_: Pet chatbot as a separate project.

**Team project**:
A project with `team: true`; its page must state Rolan's own part.

**Competition**:
One competition Rolan joined, of one of two kinds. A **hackathon** is a timed team build with hours, team size, role, and what was built. A **contest** is an individual skills competition (for example Java programming) with no build. Both have a placement.
_Avoid_: Event when the competition record is meant; calling a contest a hackathon.

**Placement**:
The display text of how Rolan finished in a competition (for example "Champion, Java Programming", "Top 10 Finalist").

**Result**:
The comparable outcome behind a placement: `won`, `placed`, `finalist`, or `joined`. Points and the gold win badge follow the result, not the placement text. A Top 10 finish at eGovPH 2026 counts as `won`.
_Avoid_: Inferring a win from placement wording.

**Competition date**:
When a competition happened, to month precision when known and year precision otherwise. Year-only competitions sort within their year.

**Prize**:
A publicly announced competition award, including its cash amount. Prizes may be shown; they are not personal earnings (salary, client income), which are never shown.

**Unlisted project**:
A complete-enough project page reachable only by direct link: absent from the home page, work list, timeline, chat, and search indexing until Rolan lists it.
_Avoid_: Draft (a draft has no page at all).

**Draft**:
A content file whose facts are incomplete. Drafts are hidden from every page and from the chat until Rolan completes them.

**Post**:
One blog entry under `content/posts/`, tagged exactly `til` or `thoughts`.
_Avoid_: Article, story.

**Demo**:
A live, public build of a project deployed on its own subdomain `<name>.1mil.dev`, outside this repository.
_Avoid_: Preview deploy.

**Demo badge**:
The `by 1mil.dev ↗` pill fixed bottom-right on every demo, linking back to the project page.

**Ask my AI**:
The site-wide chat that answers questions about Rolan from site content only, using retrieval over the content files and resume.
_Avoid_: Chatbot (ambiguous with the pet chatbot project).

**Ask page**:
`1mil.dev/ask`, the shareable full-screen chat link given to recruiters next to the main site link, with an always-visible way back to the main site.

**Source chip**:
A link chip under a chat answer pointing to the page a retrieved chunk came from.

**Skill / Tool**:
One entry in the single skills registry: a **skill** (a language, framework, or technique such as React or RAG) or a **tool** (a product Rolan uses, such as Claude Code or Qdrant). Each has a group and a usage level; tools also say what Rolan used them for. Projects refer to registry entries, never to free-text skill names.
_Avoid_: Tech, stack item.

**AI toolbox**:
The AI tools from the skills registry, shown as flip cards with what Rolan used each for.

**Usage level**:
How a skill or tool relates to Rolan: `daily`, `used in project`, or `experimenting`. `usedIn` is computed from projects, never written by hand.

**Case study**:
A listed project's own page. It exists only once the project states the problem, what Rolan built, and lessons; until then the project's card links to its demo or repository instead. Architecture, tradeoffs, and evals appear only when written. Its stack comes from the project's registry skills.

**Terminal**:
The `~` easter egg: a soft-neobrutal terminal panel with the chat inside. The old terminal UI is retired.
