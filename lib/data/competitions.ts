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
    event: "Developer Camp Manila",
    year: 2026,
    product: "Pulsify",
    description:
      "App + IoT smartwatch built under time pressure alongside developers nationwide. [DESCRIPTION]",
    stack: ["[TECH STACK]"],
  },
  {
    event: "Agora",
    year: "[YEAR]",
    product: "Mayari Voice Agent (combined with Haliya)",
    description: "[DESCRIPTION]",
    stack: ["[TECH STACK]"],
  },
  {
    event: "Zero Vector Venture",
    year: "[YEAR]",
    product: "[PRODUCT]",
    description: "[DESCRIPTION]",
    stack: ["[TECH STACK]"],
  },
  {
    event: "Devkada",
    year: "[YEAR]",
    product: "Haliya",
    description: "[DESCRIPTION]",
    stack: ["[TECH STACK]"],
  },
];
