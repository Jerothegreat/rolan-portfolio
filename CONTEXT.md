# 1mil.dev Context

This context defines the domain language shared by the site, the content files, the 1mil tracker, and the site chat.

## Language

**1mil**:
The dream number, 1,000,000, used as a life-goal progress meter. It is not money and not a score others judge.
_Avoid_: Score, rank, earnings.

**Milestone**:
One dated, logged achievement (blog post, hackathon joined/placed/won, project shipped, internship/job, graduation) stored as one file under `content/milestones/`.
_Avoid_: Event (reserved for hackathons), achievement badge.

**Points**:
The value a milestone adds to the 1mil tracker, set by the tunable point rules in `docs/product/requirements-engineering.md`.
_Avoid_: XP, karma.

**1mil tracker**:
The mono counter, rounded progress bar, and milestone dots that sum all milestone points; shown small in the hero and in full on `/1mil`.
_Avoid_: Leaderboard.

**Project**:
One showcased piece of software with a case-study page at `/work/[slug]`, stored as one file under `content/projects/`.
_Avoid_: Repo (a project may have zero or many repos).

**Featured project**:
A project with `featured: true`; the home page shows exactly three.

**Team project**:
A project with `team: true`; its page must state Rolan's own part.

**Hackathon**:
One competition Rolan joined, stored under `content/hackathons/`, with placement, hours, team size, role, and what was built.
_Avoid_: Event when the competition record is meant.

**Placement**:
The result of a hackathon (for example champion, finalist, participant). Wins render with the gold badge.

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

**Source chip**:
A link chip under a chat answer pointing to the page a retrieved chunk came from.

**Usage level**:
How a skill or tool relates to Rolan: `daily`, `used in project`, or `experimenting`. `usedIn` is computed from projects, never written by hand.

**Terminal**:
The `~` easter egg: a soft-neobrutal terminal panel with the chat inside. The old terminal UI is retired.
