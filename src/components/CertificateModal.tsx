import React from "react";
import { X, ExternalLink, Download, Award, CheckCircle } from "lucide-react";
import { CertificationItem } from "@/data/certifications";
import { getAssetUrl } from "@/lib/asset";

interface CertificateModalProps {
  cert: CertificationItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0d121f] border border-purple-500/30 rounded-2xl p-6 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full transition-colors z-10"
          aria-label="Close certificate preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 id="cert-modal-title" className="text-xl font-bold text-white">
              {cert.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-purple-300">
              <span>{cert.issuer}</span>
              <span>•</span>
              <span>{cert.date}</span>
            </div>
          </div>
        </div>

        {/* Certificate Display Frame */}
        <div className="relative rounded-xl overflow-hidden border border-purple-500/20 bg-slate-950/60 mb-5 shadow-inner">
          <img
            src={getAssetUrl(cert.previewImage)}
            alt={cert.title}
            className="w-full h-auto object-contain max-h-[500px]"
          />
        </div>

        {/* Certificate Details */}
        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            {cert.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-2.5 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-500/20"
              >
                {skill}
              </span>
            ))}
          </div>

          {cert.credentialId && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Credential ID: {cert.credentialId}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {cert.filePath && (
                <a
                  href={getAssetUrl(cert.filePath)}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-950 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Certificate</span>
                </a>
              )}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
