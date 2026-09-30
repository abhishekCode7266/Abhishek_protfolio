import React, { useState } from "react";
import { profile } from "@/data/profile";
import { Check, Copy, Terminal } from "lucide-react";

export const CodeSnippetPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSnippet = profile.codeSnippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#0a0e19] border border-purple-500/20 shadow-2xl shadow-purple-950/30">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111726] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <div className="ml-3 flex items-center gap-1 text-slate-400 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>developer-console</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-[#090d16] p-1 rounded-lg border border-slate-800">
          {profile.codeSnippets.map((snippet, idx) => (
            <button
              key={snippet.language}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                activeTab === idx
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {snippet.label}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-md transition-colors"
          aria-label="Copy snippet code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#080c16]/90">
        <div className="flex text-slate-500 select-none">
          <div className="flex flex-col pr-4 text-right border-r border-slate-800 space-y-1 text-slate-600">
            {activeSnippet.code.split("\n").map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <pre className="pl-4 text-slate-200 overflow-x-auto font-mono">
            <code>
              {activeSnippet.code.split("\n").map((line, i) => {
                // Quick syntax color highlights
                let formatted = line;
                const isComment = line.trim().startsWith("#") || line.trim().startsWith("//");
                if (isComment) {
                  return (
                    <div key={i} className="text-slate-500 italic">
                      {line}
                    </div>
                  );
                }
                return (
                  <div key={i} className="whitespace-pre">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(
                            /\b(def|const|let|var|function|return|import|export|class|async|await)\b/g,
                            '<span class="text-rose-400 font-semibold">$1</span>'
                          )
                          .replace(
                            /\b(print|console|log)\b/g,
                            '<span class="text-sky-400 font-semibold">$1</span>'
                          )
                          .replace(
                            /(["'`].*?["'`])/g,
                            '<span class="text-emerald-300">$1</span>'
                          )
                          .replace(
                            /\b(name|focus|status|skills|hello|greet|dev)\b/g,
                            '<span class="text-amber-300">$1</span>'
                          ),
                      }}
                    />
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
