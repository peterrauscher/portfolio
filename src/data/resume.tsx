import { Icons } from "@/components/icons";
import { BotIcon, HomeIcon, NotebookIcon } from "lucide-react";
export const DATA = {
  name: "Peter Rauscher",
  initials: "PR",
  url: "https://peterrauscher.com",
  location: "Seattle, WA",
  locationLink: "https://www.google.com/maps/place/seattle",
  description: "I like making sites faster and cloud bills smaller.",
  summary:
    "I'm a senior software engineer based in Seattle, WA. Most of my career has been backend and infrastructure: distributed systems, query optimization, and slashing cloud spend. I care about the unshiny wins that move graphs in the right direction: building apps that feel instant, services that cost pennies to run, and systems that scale without drama. Outside work, I tinker with custom agent harnesses, eval loops, and a personal software factory.",
  avatarUrl: "/portrait.webp",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/ai-stack", icon: BotIcon, label: "AI Stack" },
  ],
  contact: {
    email: "peter@peterrauscher.com",
    tel: "+16092561951",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/peterrauscher",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/peter-rauscher",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:peter@peterrauscher.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Vividly",
      href: "https://www.govividly.com",
      badges: [],
      location: "Remote",
      title: "Senior Software Engineer",
      logoUrl: "/vividly.webp",
      start: "May 2026",
      end: "Present",
      description:
        "Building Rust services and cleaning up workflows that used to be bloated. Lots of performance tuning and query optimization work.",
    },
    {
      company: "Perpay",
      href: "https://perpay.com",
      badges: [],
      location: "Philadelphia, PA",
      title: "Software Engineer II",
      logoUrl: "/perpay.webp",
      start: "Apr 2024",
      end: "May 2026",
      description:
        "Architected a scalable full-suite e-commerce application with built-in BNPL loans. Rebuilt a legacy Magento instance into a high-converting React storefront, lowered cloud and EKS spend, and overhauled vendor integrations for reliable scaling.",
    },
    {
      company: "Almo Corporation",
      href: "https://almo.com",
      badges: [],
      location: "Philadelphia, PA",
      title: "Software Engineer",
      logoUrl: "/almo.webp",
      start: "Jul 2023",
      end: "Apr 2024",
      description:
        "Built warehouse integration systems and real-time inventory APIs for enterprise e-commerce clients, generalizing workflows to streamline new vendor onboarding.",
    },
  ],
  education: [
    {
      school: "Stevens Institute of Technology",
      href: "https://stevens.edu",
      degree: "Bachelor of Science in Computer Science",
      logoUrl: "/stevens.webp",
      start: "2019",
      end: "2023",
    },
  ],
  projects: [
    {
      title: "ghostpost",
      href: "https://getghostpost.com/",
      dates: "2025 - Present",
      active: true,
      description:
        "Mobile app that scans your Instagram, TikTok, X, Facebook, and Reddit history for posts that could hurt you with college admissions, recruiters, or rush, then lets you delete, archive, or keep each flagged post.",
      technologies: [
        "React Native",
        "Expo",
        "Rust",
        "PostgreSQL",
        "AWS",
        "Cloudflare",
        "Astro",
      ],
      links: [
        {
          type: "Website",
          href: "https://getghostpost.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/ghostpost.webp",
      video: "",
    },
    {
      title: "Neighborly",
      href: "https://github.com/peterrauscher/Neighborly",
      dates: "2023",
      active: false,
      description:
        "Won grand prize in the Atlas Madness 2023 Hackathon for developing a React app and serverless API to connect neighbors looking to share resources. Built with React, Node.js, and MongoDB on Google Cloud Platform.",
      technologies: [
        "React",
        "Node.js",
        "JavaScript",
        "MongoDB",
        "Google Cloud Platform",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/peterrauscher/Neighborly",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/neighborly.webp",
      video: "",
    },
  ],
} as const;
