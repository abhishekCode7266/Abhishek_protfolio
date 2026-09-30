/**
 * Personal Profile & Bio Information
 * Easily editable on mobile or desktop via GitHub.
 */

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export const profile = {
  name: "Abhishek Singh Yadav",
  heroGreeting: "Hello, I'm Abhishek",
  heroHighlight: "Singh Yadav",
  title: "Computer Science Student • Software Developer",
  primaryDomain: "Data Analytics",
  secondaryDomains: ["Software Development", "AI / ML", "Cyber Security"],
  statusBadge: "Open to Internship & Trainee Roles",
  location: "India",
  institution: "LD College of Technical Studies",
  degree: "B.Tech in Computer Science",

  shortIntroduction:
    "B.Tech Computer Science undergraduate at LD College of Technical Studies. Passionate about software development, web development, Python, Java, and building practical applications.",

  aboutParagraphs: [
    "I am a B.Tech Computer Science undergraduate with a strong focus on Data Analytics, software development, web development, Python, Java, and practical application building.",
    "Driven by curiosity and analytical thinking, I enjoy transforming raw data into meaningful insights, developing structured software architectures, and designing intuitive user interfaces. I continuously expand my skill set through hands-on technical projects, algorithmic problem solving, and modern development workflows.",
  ],

  coreStrengths: [
    {
      title: "Analytical Problem Solving",
      description: "Deconstructing complex engineering and algorithmic challenges into clean, structured logic.",
    },
    {
      title: "Data Manipulation & Insights",
      description: "Extracting patterns, cleaning structured datasets, and communicating visual trends using Python and Pandas.",
    },
    {
      title: "Full-Stack Web Foundations",
      description: "Designing responsive, mobile-first web interfaces with modern JavaScript, CSS3, and DOM integration.",
    },
    {
      title: "Disciplined Engineering",
      description: "Emphasizing clean code readability, Git version control, and reproducible build systems.",
    },
  ],

  avatar: "/assets/profile/abhishek-avatar.svg",
  resume: "/assets/resume/Abhishek-Singh-Yadav-Resume.pdf",

  codeSnippets: [
    {
      language: "python",
      label: "Python",
      filename: "developer.py",
      code: `def greet():\n    print("Hello, World!")\n\n# Initialize developer profile\ndev = {\n    "name": "Abhishek Singh Yadav",\n    "focus": "Data Analytics & Software Dev",\n    "status": "Ready for Internships"\n}\nprint(f"Loaded {dev['name']}: {dev['focus']}")`,
    },
    {
      language: "javascript",
      label: "JavaScript",
      filename: "hello.js",
      code: `const hello = () => {\n  console.log("Hello, World!");\n};\n\nconst skills = ["Python", "Java", "JavaScript", "Pandas"];\nconsole.log(\`Skills ready: \${skills.join(", ")}\`);`,
    },
  ],
};
