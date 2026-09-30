import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log("🔍 Validating Portfolio Data and Assets...");

let errors = [];

function checkFileExists(relPath, label) {
  // Normalize path removing leading slash if relative to public
  const cleanPath = relPath.startsWith('/') ? relPath.slice(1) : relPath;
  const fullPath = path.join(rootDir, 'public', cleanPath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`[Missing Asset] ${label}: File not found at public/${cleanPath}`);
  }
}

// 1. Check profile avatar and resume
checkFileExists('assets/profile/abhishek-avatar.svg', 'Profile Avatar');
checkFileExists('assets/resume/Abhishek-Singh-Yadav-Resume.pdf', 'Resume PDF');

// 2. Check project images
const projectImages = [
  'assets/projects/om-ai.svg',
  'assets/projects/om-ai-preview-2.svg',
  'assets/projects/careersphere-ai.svg',
  'assets/projects/learning-platform.svg',
  'assets/projects/funvision.svg',
  'assets/projects/management-system.svg',
];

projectImages.forEach(img => checkFileExists(img, `Project Image (${img})`));

// 3. Check certificate images
const certImages = [
  'assets/certificates/fundamentals-of-ai.svg',
  'assets/certificates/ibm-ai.svg',
  'assets/certificates/python-data.svg',
];

certImages.forEach(img => checkFileExists(img, `Certificate Image (${img})`));

// 4. Verify data files exist
const dataFiles = [
  'src/data/site.ts',
  'src/data/profile.ts',
  'src/data/socials.ts',
  'src/data/skills.ts',
  'src/data/education.ts',
  'src/data/experience.ts',
  'src/data/certifications.ts',
  'src/data/projects.ts',
];

dataFiles.forEach(file => {
  const fullPath = path.join(rootDir, file);
  if (!fs.existsSync(fullPath)) {
    errors.push(`[Missing Data File] ${file} is missing!`);
  }
});

if (errors.length > 0) {
  console.error("❌ Portfolio Validation Failed with errors:");
  errors.forEach(err => console.error(" - " + err));
  process.exit(1);
} else {
  console.log("✅ All portfolio data, assets, and file references are valid!");
}
