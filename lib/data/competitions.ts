export interface Award {
  name: string;
  placement: string;
  rank: "1st" | "finalist" | "representative" | "participant";
  year: number;
  note?: string;
}

export interface Hackathon {
  event: string;        // hackathon name
  year: number | string;
  product: string;      // pitched/developed product
  description: string;  // user fills — use a [TOKEN] when unknown
  stack: string[];      // user fills — use ["[TECH STACK]"] when unknown
}

export const awards: Award[] = [
  {
    name: "Infotechnolympics 2025",
    placement: "Champion — Java Programming",
    rank: "1st",
    year: 2025,
  },
  {
    name: "14th IT Skills Olympics 2025",
    placement: "UMak Representative — Java Programming",
    rank: "representative",
    year: 2025,
    note: "Competed among 60+ universities nationwide; hosted by UMak CCIS.",
  },
];

export const hackathons: Hackathon[] = [
  {
  "event": "Developer Camp Manila",
  "year": "2026",
  "product": "Pulsify",
  "description": "App + IoT smartwatch built under time pressure alongside developers nationwide. Engineered a synchronized mobile and Wear OS ecosystem capable of live session tracking, pedometer data aggregation, and persistent cloud storage via Supabase.",
  "stack": [
    "Kotlin",
    "Jetpack Compose",
    "Wear OS",
    "Flutter",
    "Supabase",
    "Spotify API"
  ]
  },
  {
  "event": "Agora",
  "year": "2026",
  "product": "Mayari Voice Agent (combined with Haliya)",
  "description": "A real-time bilingual (Taglish) AI voice agent for Philippine medical clinics. It automates patient intake by collecting symptoms, assessing medical urgency via Groq-powered LLMs, applying strict safety guardrails, and autonomously routing appointments to reduce staff overload.",
  "stack": ["Groq", "Voice AI", "LLMs", "NLP", "Real-time Triage"]
  },
  {
  "event": "Zero Vector Venture",
  "year": "2026",
  "product": "AI Security Case Study: Deepfakes",
  "description": "Presented a comprehensive case study analyzing the mechanics of deepfakes and their impact on digital trust, media authenticity, and cybersecurity. The session focused on emerging AI security threats and vulnerability assessments.",
  "stack": ["AI Security", "Cybersecurity", "Deepfake Detection", "Threat Analysis", "Media Forensics"]
  },
  {
  "event": "Devkada",
  "year": "2026",
  "product": "Haliya",
  "description": "A web-based AI triage system built to prevent ER overcrowding and delayed treatments. It accurately assesses patient symptom severity in real time and directs them to the appropriate level of care, from self-management to emergency services.",
  "stack": [
    "Next.js",
    "Node.js",
    "TypeScript",
    "Drizzle ORM",
    "Serverless PostgreSQL",
    "Llama-3.1",
    "RAG"
  ]
  },
];
