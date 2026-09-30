import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { DataProvider } from "@/context/DataContext";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { EducationSection } from "@/sections/EducationSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { CertificationsSection } from "@/sections/CertificationsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { GitHubEditModal } from "@/components/GitHubEditModal";
import { PrintableResumeModal } from "@/components/PrintableResumeModal";
import { PortfolioManagerModal } from "@/components/PortfolioManagerModal";

export default function App() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResumeExportOpen, setIsResumeExportOpen] = useState(false);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <DataProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-slate-50 dark:bg-[#070a12] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white transition-colors duration-200">
            {/* Top Navbar */}
            <Navbar
              onOpenEditModal={() => setIsEditModalOpen(true)}
              onOpenResumeExport={() => setIsResumeExportOpen(true)}
              onOpenStudioModal={() => setIsStudioModalOpen(true)}
            />

            {/* Main Content Sections */}
            <main className="flex-grow">
              <HeroSection
                onOpenEditModal={() => setIsEditModalOpen(true)}
                onOpenResumeExport={() => setIsResumeExportOpen(true)}
                onOpenStudioModal={() => setIsStudioModalOpen(true)}
              />
              <AboutSection />
              <SkillsSection />
              <EducationSection onOpenStudio={() => setIsStudioModalOpen(true)} />
              <ExperienceSection onOpenStudio={() => setIsStudioModalOpen(true)} />
              <CertificationsSection onOpenStudio={() => setIsStudioModalOpen(true)} />
              <ProjectsSection />
              <ContactSection />
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Interactive Portfolio Studio & Content Manager Modal */}
            <PortfolioManagerModal
              isOpen={isStudioModalOpen}
              onClose={() => setIsStudioModalOpen(false)}
            />

            {/* Printable Formatted Resume / PDF Export Modal */}
            <PrintableResumeModal
              isOpen={isResumeExportOpen}
              onClose={() => setIsResumeExportOpen(false)}
            />

            {/* GitHub Edit Modal for Mobile & Laptop Single Source of Truth editing */}
            <GitHubEditModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </LanguageProvider>
      </DataProvider>
    </ThemeProvider>
  );
}
