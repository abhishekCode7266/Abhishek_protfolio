# Abhishek Singh Yadav — Personal Portfolio Website

[![Deploy Portfolio to GitHub Pages](https://github.com/abhishekCode7266/Abhishek_portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/abhishekCode7266/Abhishek_portfolio/actions/workflows/deploy.yml)
[![Live Portfolio](https://img.shields.io/badge/Live_Website-Online-purple)](https://abhishekcode7266.github.io/Abhishek_portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **Live Website:** [https://abhishekcode7266.github.io/Abhishek_portfolio/](https://abhishekcode7266.github.io/Abhishek_portfolio/)  
> **GitHub Profile:** [https://github.com/abhishekCode7266](https://github.com/abhishekCode7266)  
> **Primary Domain:** Data Analytics + Computer Science + Software Development

---

## 🌟 Overview

A modern, high-performance, dark-futuristic personal developer portfolio for **Abhishek Singh Yadav**, Computer Science undergraduate at **LD College of Technical Studies**.

Engineered with a **Single Source of Truth** architecture: all content is completely separated into clean, modular data files (`src/data/*.ts`). The site updates automatically whenever changes are committed to the `main` branch via GitHub Actions—whether you edit from a smartphone browser or a desktop workstation.

---

## ✨ Features

- **GitHub Recent Activity & Progress Tracker**: Live commit tracker panel embedded in the Portfolio Manager Studio that queries the last 5 commits from GitHub (`/api/github/commits`), displaying conventional commit tags (`feat`, `fix`, `chore`), 1-click SHA copy, author metadata, relative timestamps, and direct commit links.
- **Interactive D3.js Language Distribution Visualization**: Custom D3.js visualization engine integrated into the Projects section showing real-time repository language share with radial Donut and ranked Bar chart view modes, glow hover interactions, and 1-click language filtering across all projects.
- **GitHub Webhook Listener & Real-Time Auto-Import**: Built-in webhook listener (`/api/github/webhook`) and Server-Sent Events stream (`/api/github/events`) configured in the Portfolio Studio with step-by-step setup, payload URL copy, secret token verification, live delivery logs, and a functional test event simulator to automatically import new repositories.
- **Light & Dark Mode Theme Switcher**: Dedicated toggle button in the Navbar with WCAG-compliant high-contrast themes (futuristic dark navy + purple glowing accents, or clean modern light aesthetic with crisp typography).
- **Live GitHub API Auto-Sync**: Directly connected to `github.com/abhishekCode7266` via the GitHub REST API. Automatically loads public repositories, stars, forks, commit updates, and topics, dynamically updating the website when new repos are created or deleted.
- **In-App Portfolio Studio & Content Manager**:
  - **100+ Certificates Capacity**: Upload, edit, search, and delete course certifications with image file upload, issue dates, and verification URLs.
  - **Custom Resume Upload**: Direct PDF upload or document URL configuration for immediate resume download serving.
  - **Experience & Internship Manager**: Add real internship details (role, company, period, mode, responsibilities, tech) and delete sample experiences with 1-click.
  - **Education Editor**: Modify degree name, institution (LD College / Sanjay Gandhi College), aggregate score (73% or CGPA), and status.
  - **Skills Studio**: Add or remove competencies and tech stack pills across categories.
  - **1-Click Export to GitHub**: Instantly copy formatted JSON/TS data to update `src/data/` permanently in your GitHub repository.
- **Bilingual English & Hindi Language Switcher**: Seamless language toggle in the Navbar dynamically switching headings, navigation, descriptions, buttons, forms, and resume export between English and Hindi with localStorage persistence.
- **Dynamic PDF Resume Export & Printable Version**: Formatted, recruiter-ready, ATS-compliant printable resume generator with section toggles (Experience, Projects, Certifications) and one-click browser print-to-PDF engine.
- **Futuristic Dark Navy & Purple Aesthetic**: Recreated with glowing violet accents, glassmorphic cards, smooth animations, and clean typography.
- **Data-Driven Architecture**: Easily update projects, skills, education, certifications, and bio in `src/data/` without touching UI code.
- **Automatic GitHub Pages Deployment**: Fully automated CI/CD pipeline via GitHub Actions (`.github/workflows/deploy.yml`).
- **Subpath Safe Base URL**: Configured for `/Abhishek_portfolio/` without broken image or routing links.
- **Interactive Code Editor Previews**: Switch between Python and JavaScript syntax snippets with copy-to-clipboard functionality.
- **Featured Projects & Lightbox Viewer**: Project cards with live demos, GitHub repositories, tag filtering (All, AI/ML, Data Analytics, Web Development, Software Development), and modal screenshot inspection.
- **Verified Credentials & Modal**: Inspect and download accredited course certificates (Fundamentals of AI, IBM AI, Python Data Analytics).
- **Academic Background**: Primary focus on B.Tech in Computer Science along with foundational Diploma details (73%).
- **Internship & Trainee Experience**: Detailed experience timeline with role descriptions and technology stacks.
- **Working Contact Form & Direct Email**: Form validation with prefilled mail client trigger and one-click clipboard copy.
- **100% Mobile First & Responsive**: Optimized for phones (320px–430px), tablets (768px–1024px), and desktop displays (1280px–1920px+).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Motion
- **Deployment**: GitHub Pages via GitHub Actions (`actions/deploy-pages@v4`)

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated CI/CD Pages deployment pipeline
├── public/
│   ├── assets/
│   │   ├── profile/            # Avatar SVG / photo
│   │   ├── projects/           # Code preview & project screenshots
│   │   ├── certificates/       # Accredited credential SVG / PDF files
│   │   ├── resume/             # Downloadable resume PDF
│   │   └── icons/              # Favicon and brand badges
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── validate-content.mjs    # Automated build-time data validation
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Responsive sticky navigation with mobile drawer
│   │   ├── SmartImage.tsx      # Resilient image loader with error fallback
│   │   ├── CodeSnippetPreview.tsx # Interactive Python & JS console
│   │   ├── ProjectLightbox.tsx # Fullscreen screenshot lightbox
│   │   ├── CertificateModal.tsx# Credential inspector & download modal
│   │   ├── GitHubEditModal.tsx # Mobile/Laptop GitHub editing helper
│   │   └── Footer.tsx          # Branding, socials, and back-to-top
│   ├── data/                   # ⭐️ CENTRAL CONTENT DATA FILES
│   │   ├── site.ts             # Global site metadata & author info
│   │   ├── profile.ts          # Name, titles, bio, and code snippets
│   │   ├── skills.ts           # 5 Skill categories & technology pills
│   │   ├── education.ts        # B.Tech & Diploma qualifications
│   │   ├── experience.ts       # Internship and trainee timelines
│   │   ├── certifications.ts   # Certificates, issuers, and verification links
│   │   ├── projects.ts         # Project items, categories, demos, and repos
│   │   ├── socials.ts          # Verified social channels
│   │   └── index.ts            # Barrel export
│   ├── lib/
│   │   └── asset.ts            # Resolves asset URLs for GitHub Pages subpath
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

---

## 📱 How to Update Content via GitHub (Mobile & Laptop)

You do **not** need to install Node.js or run terminal commands to update your portfolio content!

### 📱 Updating from a Smartphone:
1. Open [https://github.com/abhishekCode7266/Abhishek_portfolio](https://github.com/abhishekCode7266/Abhishek_portfolio) on your mobile browser or GitHub Mobile app.
2. Tap into `src/data/` and select the file you want to change:
   - `projects.ts` → Add or edit projects
   - `certifications.ts` → Add certificates
   - `skills.ts` → Add new technologies or tools
   - `profile.ts` → Update bio or headline
3. Tap the **Edit (pencil)** button.
4. Modify the content, scroll down, and tap **Commit changes** to `main`.
5. GitHub Actions immediately builds, tests, and deploys the new website automatically!

### 💻 Updating from Laptop/Desktop:
```bash
# 1. Clone repository
git clone https://github.com/abhishekCode7266/Abhishek_portfolio.git
cd Abhishek_portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Make edits in src/data/*.ts

# 5. Commit & Push
git add .
git commit -m "Update portfolio projects and skills"
git push origin main
# -> GitHub Actions automatically triggers and deploys to GitHub Pages!
```

---

## 📝 Concrete Examples

### 1. Adding a New Project in `src/data/projects.ts`
```typescript
{
  id: "new-data-app",
  title: "E-Commerce Customer Analytics",
  description: "Exploratory data analysis and clustering model for consumer purchasing behaviors.",
  category: "Data Analytics",
  image: "/assets/projects/analytics-preview.svg",
  technologies: ["Python", "Pandas", "Scikit-Learn", "Matplotlib"],
  github: "https://github.com/abhishekCode7266/customer-analytics",
  liveDemo: "https://abhishekcode7266.github.io/customer-analytics/",
  featured: true
}
```

### 2. Adding a Certificate in `src/data/certifications.ts`
```typescript
{
  id: "advanced-ml-google",
  title: "Machine Learning Foundations",
  issuer: "Google Cloud",
  date: "2025",
  previewImage: "/assets/certificates/ml-foundations.svg",
  filePath: "/assets/certificates/ml-foundations.svg",
  description: "Supervised and unsupervised learning algorithms with TensorFlow.",
  skills: ["Machine Learning", "Neural Networks", "TensorFlow"]
}
```

---

## ⚙️ Local Development Scripts

- `npm run dev`: Launch local Vite dev server at `http://localhost:3000`
- `npm run build`: Build static distribution bundle for production
- `npm run validate`: Validate that all assets, image references, and data exist
- `npm run lint`: Run TypeScript strict type-checking

---

## 🚀 GitHub Actions CI/CD Pipeline

The `.github/workflows/deploy.yml` workflow performs:
1. **Checkout Code**: Retrieves the repository on `push` to `main` or manual `workflow_dispatch`.
2. **Node Setup**: Uses Node.js 20 with `npm` caching.
3. **Dependency Check**: Runs `npm ci`.
4. **Validation**: Executes `node scripts/validate-content.mjs` to ensure no broken images or missing files.
5. **Static Compilation**: Runs `npm run build` with `GITHUB_PAGES=true` to embed the `/Abhishek_portfolio/` base URL.
6. **Pages Deployment**: Uses official `actions/deploy-pages@v4` to publish the site to GitHub Pages.

---

## 📬 Contact & Connect

- **Name**: Abhishek Singh Yadav
- **Email**: [abhisheksoraon9@gmail.com](mailto:abhisheksoraon9@gmail.com)
- **GitHub**: [github.com/abhishekCode7266](https://github.com/abhishekCode7266)
- **College**: LD College of Technical Studies
- **Degree**: B.Tech in Computer Science & Engineering

© 2026 Abhishek Singh Yadav. All rights reserved.
