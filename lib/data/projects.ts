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
    name: "Airplane Ticketing System",
    type: "fullstack",
    description: "[DESCRIPTION]",
    stack: ["[TECH STACK]"],
    pinned: true,
    url: "[AIRPLANE TICKETING URL]",
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
    name: "Chatbots",
    type: "ai",
    description:
      "Built AI chatbot projects — retrieval-augmented assistants and production chatbot integrations. [DESCRIPTION]",
    stack: ["[TECH STACK]"],
    pinned: true,
    url: "[CHATBOTS URL]",
  },
];
