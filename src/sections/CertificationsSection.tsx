import React, { useState } from "react";
import { usePortfolioData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { CertificationItem } from "@/data/certifications";
import { CertificateModal } from "@/components/CertificateModal";
import { SmartImage } from "@/components/SmartImage";
import { getAssetUrl } from "@/lib/asset";
import { Award, Eye, Download, Calendar, ExternalLink, Sparkles, Plus, Search } from "lucide-react";

interface CertificationsSectionProps {
  onOpenStudio?: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onOpenStudio }) => {
  const { t } = useLanguage();
  const { certifications } = usePortfolioData();
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredCerts = certifications.filter((cert) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      cert.title.toLowerCase().includes(q) ||
      cert.issuer.toLowerCase().includes(q) ||
      (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(q)))
    );
  });

  return (
    <section id="certifications" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t.certifications.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.certifications.heading}
          </h2>
          <p className="max-w-md mx-auto text-sm text-slate-600 dark:text-slate-400 mt-3">
            {t.certifications.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Controls: Search across 100+ Certificates & Add button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${certifications.length} certificates or skills...`}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 focus:border-purple-500 focus:outline-none text-xs text-slate-900 dark:text-white shadow-sm"
            />
          </div>

          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-900/30 transition-all cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload / Add Certificate ({certifications.length} total)</span>
            </button>
          )}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-black/40 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Certificate Preview Frame with Hover Zoom */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[16/11] bg-slate-100 dark:bg-slate-950/70 overflow-hidden cursor-pointer border-b border-slate-200 dark:border-purple-500/20"
                >
                  <SmartImage
                    src={cert.previewImage}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-semibold backdrop-blur-sm shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      <span>{t.certifications.inspect}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-400 font-mono tracking-wider uppercase">
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                      <span>{cert.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2 mb-2">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[10px] font-mono border border-slate-200 dark:border-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-950 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.certifications.inspect}</span>
                </button>

                {cert.filePath && (
                  <a
                    href={getAssetUrl(cert.filePath)}
                    download
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors"
                    title="Download certificate file"
                    aria-label={`Download ${cert.title}`}
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors"
                    title="Verify credential online"
                    aria-label={`Verify ${cert.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
