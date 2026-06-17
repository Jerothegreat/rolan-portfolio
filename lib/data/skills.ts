export type SkillGroup = "ai" | "fullstack" | "infra";

export interface SkillCategory {
  group: SkillGroup;
  label: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    group: "ai",
    label: "AI / ML",
    items: [
      "Python",
      "LangChain",
      "RAG",
      "Prompt Engineering",
      "LLM Integration",
      "Agentic Coding (Codex, Claude)",
      "Vector Search / Qdrant",
      "Guardrails",
    ],
  },
  {
    group: "fullstack",
    label: "Full-Stack",
    items: [
      "TypeScript",
      "JavaScript",
      "Java",
      "C#",
      "Kotlin",
      "PHP",
      "SQL",
      "React",
      "React + Capacitor",
      "Flutter",
      "Node.js",
      "Express.js",
      "NestJS",
      "REST APIs",
    ],
  },
  {
    group: "infra",
    label: "Infra / Data",
    items: [
      "Docker",
      "Docker Compose",
      "Firebase / Firestore",
      "PostgreSQL",
      "MySQL",
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "VS Code",
    ],
  },
];
