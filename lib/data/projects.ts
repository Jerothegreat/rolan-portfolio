export type ProjectType = "ai" | "fullstack";

export interface Project {
  name: string;
  type: ProjectType;
  description: string;
  stack: string[];
  pinned: boolean;
  impact?: string;
  url?: string;
}

export const projects: Project[] = [
  {
    name: "Restaurant Web",
    type: "fullstack",
    description:
      "Web-based restaurant seat reservation system — browse tables, pick time slots, confirm bookings, database-backed workflow.",
    stack: ["HTML", "CSS", "PHP", "MySQL"],
    pinned: true,
    url: "[RESTAURANT WEB URL]",
  },
  {
  "name": "Airplane Ticketing System",
  "type": "fullstack",
  "description": "A desktop application built to handle airline flight reservations and ticketing. It streamlines passenger bookings, flight scheduling, and seat management for airline staff.",
  "stack": [".NET", "C#", "WPF"],
  "pinned": true,
  "url": "[AIRPLANE TICKETING URL]"
  },
  {
    name: "CCED-Admin-web",
    type: "fullstack",
    description:
      "Admin portal for UMak community-extension programs — volunteer records, events, role-based access, dashboard analytics.",
    stack: ["TypeScript", "React", "Node.js", "Express.js"],
    pinned: true,
    url: "[CCED ADMIN URL]",
  },
  {
    name: "UMak Kalinga App",
    type: "fullstack",
    description:
      "Community in-kind donation platform — campaign creation, inventory tracking, volunteer coordination, real-time Firestore sync. Supported 100+ UMak students.",
    stack: ["React", "Capacitor", "Node.js", "Express.js", "Firebase", "Firestore"],
    pinned: true,
    url: "[UMAK KALINGA URL]",
  },
  {
  "name": "Chatbots",
  "type": "ai",
  "description": "Built AI chatbot projects — retrieval-augmented assistants and production chatbot integrations. Developed production-grade RAG pipelines and stateful multi-agent workflows using LangGraph and GPT models.",
  "stack": ["LangChain", "LangGraph", "LLMs", "GPT", "RAG"],
  "pinned": true,
  "url": "[CHATBOTS URL]"
  },
  {
  "name": "Agentic AI & Advanced RAG Pipelines",
  "type": "ai",
  "description": "Developed autonomous agentic coding workflows and robust RAG architectures. Integrated production-grade semantic vector search and strict safety guardrails to ensure reliable, context-aware LLM outputs.",
  "stack": ["Python", "LangChain", "Qdrant", "LLM Integration", "Prompt Engineering", "Guardrails"],
  "pinned": true,
  "url": "[AI PIPELINES URL]"
  },
];
