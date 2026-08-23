import { Icons } from "@/components/icons";
import { BotIcon, HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import {
  ActixSimpleIcon,
  AwsSimpleIcon,
  DjangoSimpleIcon,
  DotNetSimpleIcon,
  ExpressSimpleIcon,
  FastApiSimpleIcon,
  GcpSimpleIcon,
  HonoSimpleIcon,
  KafkaSimpleIcon,
  MongoDbSimpleIcon,
  RabbitMqSimpleIcon,
  RedisSimpleIcon,
  ReduxSimpleIcon,
  RustSimpleIcon,
  TanStackQuerySimpleIcon,
  TerraformSimpleIcon,
  PulumiSimpleIcon,
} from "@/components/ui/simple-icons";

type Skill = {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const DATA = {
  name: "Peter Rauscher",
  initials: "PR",
  url: "https://peterrauscher.com",
  location: "Philadelphia, PA",
  locationLink: "https://www.google.com/maps/place/philadelphia",
  description:
    "I like making sites faster and cloud bills smaller. Right now, that's mostly at Vividly!",
  summary:
    "Senior software engineer at [Vividly](https://www.govividly.com), working on tools for CPG brands. [CS at Stevens](/#education). Most of my career has been backend and infra working on distributed systems, data pipelines, cloud spend. I like the less visible wins: apps that feel instant, services that are cheap to run, and systems that are painless to scale. Off hours I tinker with custom agent harnesses, eval loops, and a small software factory of my own.",
  avatarUrl: "/me.webp",
  skills: [
    // Languages
    { name: "Rust", icon: RustSimpleIcon },
    { name: "TypeScript", icon: Typescript },
    { name: "Python", icon: Python },
    { name: "C#", icon: Csharp },
    { name: "Java", icon: Java },
    // Backend Frameworks
    { name: "Actix Web", icon: ActixSimpleIcon },
    { name: "Django", icon: DjangoSimpleIcon },
    { name: "FastAPI", icon: FastApiSimpleIcon },
    { name: "Hono", icon: HonoSimpleIcon },
    { name: ".NET", icon: DotNetSimpleIcon },
    // Infrastructure & Cloud
    { name: "AWS", icon: AwsSimpleIcon },
    { name: "GCP", icon: GcpSimpleIcon },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Redis", icon: RedisSimpleIcon },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Terraform", icon: TerraformSimpleIcon },
    { name: "Pulumi", icon: PulumiSimpleIcon },
    // Frontend
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React", icon: ReactLight },
    { name: "Redux", icon: ReduxSimpleIcon },
  ] as Skill[],
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
      start: "Apr 2025",
      end: "May 2026",
      description:
        "Architected a scalable full-suite e-commerce application with BNPL loans built in. Went deep down a backend rabbit hole.",
    },
    {
      company: "Perpay",
      badges: [],
      href: "https://perpay.com",
      location: "Philadelphia, PA",
      title: "Software Engineer I",
      logoUrl: "/perpay.webp",
      start: "Apr 2024",
      end: "Apr 2025",
      description:
        "Rebuilt a crappy Magento instance into a snappy React storefront. Conversion went up, EKS bill went down. Overhauled our vendor integrations so they could actually scale with us.",
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
        "Built the warehouse integration layer for enterprise e-commerce clients, then generalized it so new vendors onboarded faster.",
    },
    {
      company: "Almo Corporation",
      href: "https://almo.com",
      badges: [],
      location: "Philadelphia, PA",
      title: "Software Engineer Intern",
      logoUrl: "/almo.webp",
      start: "May 2019",
      end: "Aug 2019",
      description:
        "Real-time inventory APIs and internal analytics. First real full-stack work.",
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
    {
      title: "SoleSearch",
      href: "https://github.com/SoleSearchAPI/api",
      dates: "2022 - 2023",
      active: false,
      description:
        "Developed a platform to aggregate sneaker prices from major retailers and resale marketplaces, providing market insights for resellers. Built asynchronous ETL pipelines with Celery to ingest, normalize, and store thousands of products per day into PostgreSQL.",
      technologies: [
        "FastAPI",
        "SQLAlchemy",
        "Celery",
        "PostgreSQL",
        "AWS",
        "Python",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/SoleSearchAPI/api",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/solesearch.webp",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Atlas Madness 2023 Hackathon",
      dates: "2023",
      location: "",
      description:
        "Won the grand prize for developing Neighborly, a full-stack app allowing neighbors to buy, sell, and trade within their community.",
      image: "/hackathon-grand-prize.webp",
      win: "Grand Prize Winner",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/peterrauscher/Neighborly",
        },
      ],
    },
  ],
} as const;
