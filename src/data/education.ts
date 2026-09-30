/**
 * Academic Background
 * B.Tech in Computer Science is the primary highlighted qualification.
 */

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  status: string;
  isPrimary: boolean;
  score?: string;
  period?: string;
  description: string;
  highlights: string[];
}

export const educationList: EducationItem[] = [
  {
    id: "btech-cs",
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    institution: "LD College of Technical Studies",
    status: "Undergraduate (In Progress)",
    isPrimary: true,
    description:
      "Comprehensive engineering curriculum emphasizing Data Analytics, Software Engineering, Object-Oriented Programming (Java & Python), Database Systems, and Web Technologies.",
    highlights: [
      "Focused on Data Analytics, Algorithms & Software Architecture",
      "Hands-on project work in Web Development & Analytical Python",
      "Active participant in technical workshops and developer events",
    ],
  },
  {
    id: "diploma-sg",
    degree: "Diploma",
    field: "Computer Science / Engineering",
    institution: "Sanjay Gandhi College",
    status: "Completed",
    score: "73%",
    isPrimary: false,
    description:
      "Foundational engineering diploma covering core computational principles, programming logic, mathematics, and digital fundamentals.",
    highlights: [
      "Graduated with 73% aggregate",
      "Solid grounding in procedural programming and computer systems",
      "Transitioned into advanced B.Tech undergraduate studies",
    ],
  },
];
