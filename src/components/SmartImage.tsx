import React, { useState } from "react";
import { getAssetUrl } from "@/lib/asset";
import { ImageOff } from "lucide-react";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = "",
  fallbackIcon,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const resolvedSrc = getAssetUrl(src);

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-900/80 border border-purple-500/20 text-slate-400 p-6 rounded-xl text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        {fallbackIcon || <ImageOff className="w-8 h-8 text-purple-400 mb-2 opacity-70" />}
        <span className="text-xs font-mono text-purple-300/80">{alt || "Visual Preview"}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-900/60 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
};
