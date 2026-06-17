export interface ProfileLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface Education {
  school: string;
  degree: string;
  expected: string;
  location: string;
  coursework: string[];
}

export interface Profile {
  name: string;
  title: string;
  /** 2–3 sentence positioning statement */
  bio: string;
  availability: "open" | "closed";
  location: string;
  links: ProfileLinks;
  /** Path to avatar image, e.g. "/profile.jpg". Falls back to initials if missing or token. */
  avatar: string;
  /** URL or path to resume, e.g. "/resume.pdf". */
  resume: string;
  education: Education;
}

export const profile: Profile = {
  name: "Rolan Jero Pinton",
  title: "AI Engineer & Full-Stack Developer",
  bio: "CS student at the University of Makati (BS in Application Development, expected 2027) building AI applications, RAG systems, and full-stack products. Champion in Java Programming at Infotechnolympics 2025 and UMak representative at the 14th IT Skills Olympics. Currently an AI & QA Intern at Sofi AI Tech Solution Inc., building AI-powered automation and testing production chatbots.",
  availability: "open",
  location: "Makati, NCR",
  links: {
    github: "https://github.com/Jerothegreat",
    linkedin: "https://www.linkedin.com/in/rolan-jero-pinton-3aa046391/",
    email: "rolanjerorarelapinton@gmail.com",
  },
  avatar: "/profileimg.jpg",
  resume: "/resume.pdf",
  education: {
    school: "University of Makati",
    degree: "BS Computer Science — Application Development",
    expected: "2027",
    location: "Makati City, PH",
    coursework: [
      "Data Structures & Algorithms",
      "Discrete Mathematics",
      "Automata Theory & Formal Languages",
      "Object-Oriented Programming (C#)",
      "Software Engineering",
      "Information Assurance & Security",
      "Human-Computer Interaction",
      "Structure of Programming Languages",
    ],
  },
};
