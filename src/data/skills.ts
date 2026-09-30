/**
 * Skills & Tech Stack Configuration
 * Edit this file on GitHub to automatically update skills across all devices.
 */

export interface SkillCategory {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    badge: "WEB & UI",
    description: "Building responsive, modern, and accessible client-side interfaces.",
    icon: "Layout",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "DOM Manipulation",
      "Git & GitHub",
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    badge: "PRIMARY FOCUS",
    description: "Transforming raw data into clear, actionable visual insights and metrics.",
    icon: "BarChart3",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Data Cleaning",
      "Data Analysis",
      "Data Visualization",
      "Excel",
      "Jupyter Notebook",
    ],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    badge: "MACHINE LEARNING",
    description: "Foundational machine learning concepts, data preprocessing, and EDA.",
    icon: "Cpu",
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "Machine Learning",
      "Data Preprocessing",
      "EDA",
      "Model Evaluation",
    ],
  },
  {
    id: "software-dev",
    title: "Software Development",
    badge: "CORE ENGINEERING",
    description: "Object-oriented program architecture, logic formulation, and problem solving.",
    icon: "Code2",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "OOP",
      "Problem Solving",
    ],
  },
  {
    id: "tools-env",
    title: "Tools & Environment",
    badge: "DEVELOPER WORKFLOW",
    description: "Daily development tooling, version control, and analytical environments.",
    icon: "Terminal",
    skills: [
      "VS Code",
      "Git",
      "GitHub",
      "Jupyter Notebook",
    ],
  },
];
