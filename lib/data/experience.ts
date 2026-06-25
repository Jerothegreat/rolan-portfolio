export interface Experience {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    role: "AI & QA Intern",
    company: "Sofi AI Tech Solution Inc.",
    dates: "May 2025 – Present",
    bullets: [
      "Refactored client Telegram chatbot response latency by over 90% (from 2 minutes to 5–15 seconds) by rearchitecting the backend infrastructure using LangGraph, FAISS, Google Cloud Storage (GCS), and CloudRun.",
      "Engineered and integrated backend logic for the Sofi AI Policy Bot on Telegram using LangChain, leveraging Claude Code to rapidly prototype in a fast-paced startup environment.",
      "Built a client-onboarding website that uses AI to convert uploaded documents into dynamic templates, wired to Google Apps Script and Sheets for rapid contract automation.",
      "Executed comprehensive QA on pre-release Messenger chatbots and monitored live client chatbot deployments to ensure stability and response accuracy.",
    ],
  },
];
