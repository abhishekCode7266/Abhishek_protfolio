/**
 * Featured Projects Configuration
 * Central source of truth for all projects shown on the portfolio.
 * Edit this file to add/remove/update projects on mobile or desktop via GitHub.
 */

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "AI / ML" | "Data Analytics" | "Web Development" | "Software Development";
  image: string;
  gallery?: string[];
  technologies: string[];
  github?: string;
  liveDemo?: string;
  featured: boolean;
  highlights?: string[];
  stars?: number;
  forks?: number;
  updatedAt?: string;
  isLiveGitHub?: boolean;
}

export const projectCategories = [
  "All",
  "AI / ML",
  "Data Analytics",
  "Web Development",
  "Software Development",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projects: ProjectItem[] = [
  {
    id: "om-ai-action-assistant",
    title: "OM – AI Action Assistant",
    description:
      "An AI-powered action assistant designed to interact with users through natural language and help with coding, tasks, productivity workflows, and assistant-style interactions.",
    category: "AI / ML",
    image: "/assets/projects/om-ai.svg",
    gallery: [
      "/assets/projects/om-ai.svg",
      "/assets/projects/om-ai-preview-2.svg",
    ],
    technologies: ["AI Assistant", "JavaScript", "Web Development", "Productivity"],
    github: "https://github.com/abhishekCode7266/OM-AI-Action-Assistant",
    liveDemo: "https://abhishekcode7266.github.io/OM-AI-Action-Assistant/",
    featured: true,
    highlights: [
      "Natural language command interpretation for quick desktop workflows",
      "Interactive code and prompt execution assistant",
      "Fast client-side rendering deployed directly to GitHub Pages",
    ],
  },
  {
    id: "careersphere-ai",
    title: "CareerSphere AI",
    description:
      "An AI-powered career platform concept focused on learning, career guidance, interview preparation, job discovery, and professional development.",
    category: "AI / ML",
    image: "/assets/projects/careersphere-ai.svg",
    gallery: [
      "/assets/projects/careersphere-ai.svg",
    ],
    technologies: ["React", "JavaScript", "Career AI", "Tailwind CSS"],
    github: "https://github.com/abhishekCode7266",
    featured: true,
    highlights: [
      "Intelligent resume and skill gap analysis concept",
      "Custom interview simulator with domain-specific question prompts",
      "Structured career learning roadmaps for aspiring developers",
    ],
  },
  {
    id: "building-learning-platform",
    title: "Building Learning Platform",
    description:
      "An interactive learning platform designed for structured student education, programming concept tutorials, and course progress tracking.",
    category: "Web Development",
    image: "/assets/projects/learning-platform.svg",
    gallery: [
      "/assets/projects/learning-platform.svg",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Responsive UI"],
    github: "https://github.com/abhishekCode7266",
    featured: true,
    highlights: [
      "Modular course syllabus with interactive syntax-highlighted code blocks",
      "Progress tracking and student quiz assessments",
      "Adaptive mobile-first layout tested across diverse screen sizes",
    ],
  },
  {
    id: "funvision-computer-vision",
    title: "FunVision — Computer Vision Focus",
    description:
      "Computer vision and image analysis experiments exploring real-time facial landmark detection, motion tracking, and camera visual filters.",
    category: "AI / ML",
    image: "/assets/projects/funvision.svg",
    gallery: [
      "/assets/projects/funvision.svg",
    ],
    technologies: ["Python", "OpenCV", "NumPy", "Computer Vision"],
    github: "https://github.com/abhishekCode7266",
    featured: true,
    highlights: [
      "Real-time webcam video feed frame extraction and processing",
      "Matrix image transformation and contour boundary detection",
      "High FPS optimization using NumPy vectorized operations",
    ],
  },
  {
    id: "hospital-hotel-management",
    title: "Hospital & Hotel Management",
    description:
      "Full-featured administrative system crafted for room and patient reservations, billing calculations, visitor tracking, and records management.",
    category: "Software Development",
    image: "/assets/projects/management-system.svg",
    gallery: [
      "/assets/projects/management-system.svg",
    ],
    technologies: ["Java", "OOP", "Database Management", "UI"],
    github: "https://github.com/abhishekCode7266",
    featured: true,
    highlights: [
      "Robust object-oriented data models for patient and guest entities",
      "Automated bill generation with itemized service calculations",
      "Validation rules to prevent booking double-allocation and data corruption",
    ],
  },
];
