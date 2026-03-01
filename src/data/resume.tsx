import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import {
  AwsSimpleIcon,
  CelerySimpleIcon,
  DjangoSimpleIcon,
  DotNetSimpleIcon,
  FastApiSimpleIcon,
  KafkaSimpleIcon,
  MongoDbSimpleIcon,
  RabbitMqSimpleIcon,
  RedisSimpleIcon,
  ReduxSimpleIcon,
  TanStackQuerySimpleIcon,
  TerraformSimpleIcon,
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
    "Software Engineer specializing in full-stack development and scalable systems. I love building high-impact features and optimizing performance.",
  summary:
    "I'm a Software Engineer at [Perpay](https://perpay.com), where I architect scalable systems and build full-stack features that drive millions in revenue. [I graduated from Stevens Institute of Technology](/#education) with a B.S. in Computer Science, and have experience building fintech and e-commerce platforms, microservices, and data pipelines. I love solving performance bottlenecks, designing event-driven systems, and helping other engineers level up.",
  avatarUrl: "/me.png",
  skills: [
    // Languages
    { name: "Python", icon: Python },
    { name: "TypeScript", icon: Typescript },
    // Backend Frameworks
    { name: "Django", icon: DjangoSimpleIcon },
    { name: "FastAPI", icon: FastApiSimpleIcon },
    // Frontend
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Redux", icon: ReduxSimpleIcon },
    { name: "TanStack Query", icon: TanStackQuerySimpleIcon },
    // Databases
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Redis", icon: RedisSimpleIcon },
    { name: "MongoDB", icon: MongoDbSimpleIcon },
    // Infrastructure & Cloud
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "AWS", icon: AwsSimpleIcon },
    { name: "Terraform", icon: TerraformSimpleIcon },
    // Messaging & Queues
    { name: "Celery", icon: CelerySimpleIcon },
    { name: "Kafka", icon: KafkaSimpleIcon },
    { name: "RabbitMQ", icon: RabbitMqSimpleIcon },
    // Previous Experience
    { name: "C#", icon: Csharp },
    { name: ".NET Core", icon: DotNetSimpleIcon },
  ] as Skill[],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
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
      company: "Perpay",
      href: "https://perpay.com",
      badges: [],
      location: "Philadelphia, PA",
      title: "Software Engineer II",
      logoUrl: "/perpay.png",
      start: "Apr 2025",
      end: "Present",
      description:
        "Architected the only scalable full-suite e-commerce platform powered by your paycheck. Went deep down the backend rabbit hole.",
    },
    {
      company: "Perpay",
      badges: [],
      href: "https://perpay.com",
      location: "Philadelphia, PA",
      title: "Software Engineer I",
      logoUrl: "/perpay.png",
      start: "Apr 2024",
      end: "Apr 2025",
      description:
        "Turned a legacy Magento instance into a snappy React storefront — with the conversion bump to show for it. Rebuilt the vendor integration layer in the reverse direction.",
    },
    {
      company: "Almo Corporation",
      href: "https://almo.com",
      badges: [],
      location: "Philadelphia, PA",
      title: "Software Engineer",
      logoUrl: "/almo.jpg",
      start: "Jul 2023",
      end: "Apr 2024",
      description:
        "Built the integration layer connecting enterprise e-commerce clients to our warehouses, then abstracted it to make each new vendor's onboarding quicker.",
    },
    {
      company: "Almo Corporation",
      href: "https://almo.com",
      badges: [],
      location: "Philadelphia, PA",
      title: "Software Engineer Intern",
      logoUrl: "/almo.jpg",
      start: "May 2019",
      end: "Aug 2019",
      description:
        "Shipped some real-time inventory APIs and internal analytics tooling. Got my feet wet with full-stack development.",
    },
  ],
  education: [
    {
      school: "Stevens Institute of Technology",
      href: "https://stevens.edu",
      degree: "Bachelor of Science in Computer Science",
      logoUrl: "/stevens.png",
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
      image: "",
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
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Atlas Madness 2023 Hackathon",
      dates: "2023",
      location: "",
      description:
        "Won grand prize for developing Neighborly, a React app and serverless API to connect neighbors looking to share resources using MongoDB Atlas.",
      image: "/hackathon-grand-prize.png",
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
