import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { getAssetUrl } from "@/lib/asset";

interface ProjectLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  projectTitle: string;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  projectTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} preview gallery`}
    >
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 font-mono">
          {projectTitle} • {currentIndex + 1} / {images.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-purple-900/60 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-red-900/60 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label="Close image gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-purple-900/80 text-white border border-slate-700 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-purple-900/80 text-white border border-slate-700 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image Container */}
      <div
        className={`relative max-w-5xl max-h-[85vh] overflow-hidden rounded-xl border border-purple-500/20 shadow-2xl transition-transform duration-300 ${
          isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={getAssetUrl(currentImage)}
          alt={`${projectTitle} screenshot preview ${currentIndex + 1}`}
          className="w-auto h-auto max-h-[85vh] object-contain select-none"
        />
      </div>
    </div>
  );
};
