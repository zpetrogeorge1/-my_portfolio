export const projects = [
  {
    title: "Senior Design Capstone",
    description:
      "Designed and delivered an award-winning computer vision inspection system using Raspberry Pis, Python, and machine learning to automatically time manual operations on Keytronic manufacturing assembly lines.",
    tech: ["Raspberry Pi", "Machine Learning", "Python", "Computer Vision"],
    emoji: "📷",
  },
  {
    title: "MATLAB Digital Receiver Design",
    description:
      "Simulated a digital receiver with a matched filter in MATLAB, modeling an AWGN channel and analyzing symbol error rate performance against signal-to-noise ratio.",
    tech: ["MATLAB", "Filter design", "Communication Systems"],
    emoji: "📶",
  },
    {
    title: "RF Amplifier Design, Fabrication, and Testing",
    description:
      "Designed, built, and tested a 1 GHz RF amplifier using a HEMT FET, achieving a 0.6 dB noise figure through S-parameter analysis, stability testing, and Smith Chart optimization.",
    tech: ["MATLAB", "Amplifier Design", "RF Engineering", "Smith Charts", "Soldering", "Hardware Testing"],
    emoji: "📡",
  },
];

export const experiences = [
  {
    company: "NAWKOUT",
    url: "https://nawkout.com",
    role: "Full Stack & AI Developer",
    period: "Dec 2025 — Present",
    location: "Houston, USA · Remote",
    bullets: [
      "Built an end-to-end AI-powered CEO CRM Tool, handling the entire development lifecycle from concept to production",
      "Took the product from 0 to 100 in under 1 month, delivering a fully functional platform at rapid pace",
      "Primarily worked with Python and TypeScript to build robust backend services and dynamic frontends",
      "Automated every workflow end-to-end, streamlining operations and eliminating manual processes",
      "Managed the full stack independently — from AI integrations and backend APIs to frontend UI and deployment",
    ],
  },
  {
    company: "AskGuru.ai",
    url: "https://askguru-six.vercel.app/",
    role: "AI & UI/UX Developer",
    period: "Oct 2025 — Nov 2025",
    location: "India · Remote",
    bullets: [
      "Contributed to building the intelligent AI chatbot architecture for AskGuru's platform",
      "Led the design and implementation of the complete UI/UX for the entire web interface",
      "Worked across both AI workflow and front-end systems ensuring a cohesive user experience",
      "Collaborated on refining conversational logic, responsiveness, and brand consistency",
    ],
  },
];

export const allPRs = [
  { repo: "vercel/next.js",        title: "Fix edge runtime hydration mismatch",           status: "merged", num: "#71234" },
  { repo: "langchain-ai/langchain", title: "Add streaming support for custom LLM chains",   status: "merged", num: "#18902" },
  { repo: "shadcn-ui/ui",           title: "Add loading skeleton to data table component",  status: "merged", num: "#2901"  },
  { repo: "remotion-dev/remotion",  title: "Improve type inference for composition props",  status: "open",   num: "#3741"  },
  { repo: "vercel/swr",             title: "Add deduplication for parallel key mutations",  status: "open",   num: "#2410"  },
  { repo: "trpc/trpc",              title: "Fix mutation cache invalidation race condition", status: "closed", num: "#5582"  },
];

export const skills = [
  "Next.js", "React", "TypeScript", "Python", "LangChain",
  "Node.js", "Tailwind CSS", "PostgreSQL", "Docker", "Claude AI",
  "Remotion", "Vercel", "Prisma", "Redis", "tRPC", "Framer Motion",
];
