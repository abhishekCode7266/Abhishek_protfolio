/**
 * Internship & Professional Experience
 * Configurable experience cards with verifiable details.
 */

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  mode: "Remote" | "On-site" | "Hybrid";
  typeBadge: "INTERNSHIP" | "PROJECT EXPERIENCE" | "TRAINEE";
  period: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  certificateUrl?: string;
  companyUrl?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "data-analytics-intern",
    role: "Data Analytics & Software Trainee",
    company: "Technical Training & Project Immersion",
    location: "Remote",
    mode: "Remote",
    typeBadge: "INTERNSHIP",
    period: "Recent",
    summary:
      "Engaged in hands-on data analysis, exploratory data inspection, cleaning real-world datasets with Python (Pandas, NumPy), and developing web-based data visualization dashboards.",
    responsibilities: [
      "Performed data cleaning, missing value handling, and exploratory data analysis (EDA) using Pandas and NumPy.",
      "Engineered automated scripts to format, filter, and extract summary metrics from structured data files.",
      "Collaborated on designing responsive web interfaces and presenting analytical findings with clarity.",
      "Practiced version control workflows and feature branching using Git and GitHub.",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Git", "JavaScript"],
  },
  {
    id: "software-project-associate",
    role: "Software Developer & Applied Projects",
    company: "Academic & Open-Source Endeavors",
    location: "LD College of Technical Studies",
    mode: "Hybrid",
    typeBadge: "PROJECT EXPERIENCE",
    period: "Undergraduate Studies",
    summary:
      "Led development of practical software solutions including the OM AI Action Assistant, learning platforms, and administrative management software.",
    responsibilities: [
      "Engineered full frontend interfaces using modern HTML5, CSS3, and JavaScript.",
      "Integrated natural language interaction workflows and AI assistant prompt structures.",
      "Implemented object-oriented business logic in Python and Java for system management tools.",
    ],
    technologies: ["JavaScript", "Python", "Java", "HTML5/CSS3", "GitHub Pages"],
  },
];
