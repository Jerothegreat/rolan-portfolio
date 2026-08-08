export interface Experience {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    role: "Intern (Data & Analytics, Google Workspace, Automation)",
    company: "Globe Telecom",
    dates: "July 2026 – Present",
    bullets: [
      "Architected automated workflows and dynamic operational dashboards within Google Workspace to support 1,000+ internal users across enterprise teams.",
      "Engineered large-scale data processing pipelines using Google Apps Script and Google BigQuery to manage, transform, and visualize over 30 million data cells seamlessly.",
      "Optimized Google Sheets and Data Studio/Looker Studio integrations, improving dashboard load times and data reporting efficiency for high-volume enterprise analytics.",
    ],
  },
  {
    role: "AI & QA Intern",
    company: "Sofi AI Tech Solution Inc.",
    dates: "May 2026 – July 2026",
    bullets: [
      "Refactored client Telegram chatbot response latency by over 90% (from 2 minutes to 5–15 seconds) by rearchitecting the backend infrastructure using LangGraph, FAISS, Google Cloud Storage (GCS), and CloudRun.",
      "Engineered and integrated backend logic for the Sofi AI Policy Bot on Telegram using LangChain, leveraging Claude Code to rapidly prototype in a fast-paced startup environment.",
      "Built a client-onboarding website that uses AI to convert uploaded documents into dynamic templates, wired to Google Apps Script and Sheets for rapid contract automation.",
      "Executed comprehensive QA on pre-release Messenger chatbots and monitored live client chatbot deployments to ensure stability and response accuracy.",
    ],
  }
];
