/**
 * Certifications & Professional Credentials
 * Support for certificate viewing, image previews, and verification links.
 */

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  previewImage: string;
  filePath?: string;
  description: string;
  skills: string[];
}

export const certifications: CertificationItem[] = [
  {
    id: "fundamentals-of-ai",
    title: "Fundamentals of Artificial Intelligence",
    issuer: "AI Technical Certification Program",
    date: "2024",
    previewImage: "/assets/certificates/fundamentals-of-ai.svg",
    filePath: "/assets/certificates/fundamentals-of-ai.svg",
    description:
      "Comprehensive certification verifying foundational mastery of artificial intelligence concepts, machine learning taxonomies, search algorithms, and intelligent agent principles.",
    skills: ["Artificial Intelligence", "Machine Learning Basics", "Intelligent Agents", "Problem Formulation"],
  },
  {
    id: "ibm-artificial-intelligence",
    title: "IBM Artificial Intelligence Course Completion",
    issuer: "IBM SkillsBuild / Training",
    date: "2024",
    previewImage: "/assets/certificates/ibm-ai.svg",
    filePath: "/assets/certificates/ibm-ai.svg",
    description:
      "Rigorous introduction to modern AI ecosystems, natural language processing, computer vision applications, and ethical considerations in automated systems.",
    skills: ["AI Systems", "Data Preprocessing", "Neural Networks", "Applied AI"],
  },
  {
    id: "python-data-analytics",
    title: "Python for Data Analytics & Scientific Computing",
    issuer: "Developer Training & Practical Projects",
    date: "2024",
    previewImage: "/assets/certificates/python-data.svg",
    filePath: "/assets/certificates/python-data.svg",
    description:
      "Hands-on accreditation focusing on Pandas, NumPy vectorization, exploratory data analysis (EDA), data munging, and Matplotlib data visualization.",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "EDA"],
  },
];
