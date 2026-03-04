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
    company: "Cubic Defense",
    url: "https://www.cubic.com/defense",
    role: "Associate Systems Engineer",
    period: "Nov 2025 - Feb 2026",
    location: "San Diego, California",
    bullets: [
      "Supported integration and testing of Full Motion Video Data Link (FMVDL) in Secure Comms Group.",
      "Authored test procedures for FMVDL Integration & Test Team to verify product performance.",
      "Developed Python scripts integrating DOORS and TestRail for automated requirements traceability on FMVDL and future programs.",
      "Analyzed BIT test procedures for FMVDL subsystems; identified errors and optimal solutions.",
      "Reviewed motherboard subsystem schematics to map power regulation and critical test points.",
      "Collaborated with teams of seven to troubleshoot and resolve networking issues on program Test Bench.",
      "Resolved Test Bench networking bottlenecks, achieving maximum data throughput.",
    ],
  },
  {
    company: "L3Harris Technologies Inc.",
    url: "https://www.l3harris.com/",
    role: "Systems Engineering Intern",
    period: "May 2023 - Jul 2023",
    location: "Salt Lake City, Utah",
    bullets: [
      "Worked in the Gray Eagle Systems Engineering Group, troubleshooting broadband communication systems for the Performance-Based Logistics program.",
      "Worked in a lab using Spectrum Analyzer, Gray Eagle GUI, and various equipment.",
      "Collaborated with team of seven regarding test procedures for General Atomics.",
      "Led team of engineers to create test procedure, collect data, and conclude findings of antenna boresight.",
      "Created PowerPoint and presented final report to Systems Engineering Director.",
    ],
  },
  {
    company: "Keytronic",
    url: "https://www.keytronic.com/",
    role: "Senior Design Capstone",
    period: "Aug 2024 - May 2025",
    location: "Spokane, Washington",
    bullets: [
      "Collaborated with team members to improve Keytronic assembly line efficiency with automation.",
      "Developed machine learning algorithms using Python with Raspberry Pi hardware integration.",
      "Utilized Office 365 to present solution, develop a project plan, and create a budget.",
    ],
  },
  {
    company: "Management and Training Corporation",
    url: "https://www.mtctrains.com/",
    role: "Intern",
    period: "Jun 2024 - Aug 2025",
    location: "Centerville, Utah",
    bullets: [
      "Led the design and implementation of a student app user interface.",
      "Collaborated with cross-functioning teams to align company requirements with technical constraints.",
      "Managed project timeline to meet deadlines and present final report to company executives.",
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
