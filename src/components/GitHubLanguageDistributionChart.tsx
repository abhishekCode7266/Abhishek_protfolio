import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { ProjectItem } from "@/data/projects";
import {
  Code2,
  PieChart as PieChartIcon,
  BarChart3,
  Layers,
  Sparkles,
  GitBranch,
  Filter,
  RotateCcw,
} from "lucide-react";

interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
  color: string;
  repositories: string[];
}

// Canonical GitHub language colors with aesthetic dark/neon highlights
const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  HTML: "#E34C26",
  CSS: "#563D7C",
  "Jupyter Notebook": "#DA5B0B",
  SQL: "#CC292B",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  PHP: "#4F5D95",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Shell: "#89E051",
  R: "#198CE7",
  "AI / ML": "#8B5CF6",
  Other: "#6E7681",
};

const FALLBACK_PALETTE = [
  "#8B5CF6", // purple
  "#3B82F6", // blue
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#6366F1", // indigo
  "#14B8A6", // teal
];

interface GitHubLanguageDistributionChartProps {
  repos: ProjectItem[];
  selectedLanguage?: string | null;
  onSelectLanguage?: (language: string | null) => void;
}

export const GitHubLanguageDistributionChart: React.FC<GitHubLanguageDistributionChartProps> = ({
  repos,
  selectedLanguage = null,
  onSelectLanguage,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [viewMode, setViewMode] = useState<"donut" | "bars">("donut");
  const [hoveredLang, setHoveredLang] = useState<LanguageStat | null>(null);

  // Compute language frequency & percentages from repositories
  const languageStats: LanguageStat[] = useMemo(() => {
    if (!repos || repos.length === 0) return [];

    const counts: Record<string, { count: number; repos: string[] }> = {};
    let totalAssigned = 0;

    repos.forEach((repo) => {
      // Check primary language or first technology
      const primaryLang =
        (repo.technologies && repo.technologies.length > 0 && repo.technologies[0]) ||
        repo.category ||
        "Python";

      // Normalize common synonyms
      let cleanLang = primaryLang.trim();
      if (cleanLang.toLowerCase().includes("python")) cleanLang = "Python";
      else if (cleanLang.toLowerCase().includes("typescript")) cleanLang = "TypeScript";
      else if (cleanLang.toLowerCase().includes("javascript")) cleanLang = "JavaScript";
      else if (cleanLang.toLowerCase().includes("jupyter") || cleanLang.toLowerCase().includes("ipynb")) cleanLang = "Jupyter Notebook";
      else if (cleanLang.toLowerCase().includes("sql")) cleanLang = "SQL";
      else if (cleanLang.toLowerCase().includes("html")) cleanLang = "HTML";
      else if (cleanLang.toLowerCase().includes("css")) cleanLang = "CSS";
      else if (cleanLang.toLowerCase().includes("ai") || cleanLang.toLowerCase().includes("machine learning")) cleanLang = "AI / ML";

      if (!counts[cleanLang]) {
        counts[cleanLang] = { count: 0, repos: [] };
      }
      counts[cleanLang].count += 1;
      counts[cleanLang].repos.push(repo.title);
      totalAssigned += 1;
    });

    const stats: LanguageStat[] = Object.entries(counts).map(([lang, info], idx) => {
      const color =
        LANGUAGE_COLORS[lang] ||
        FALLBACK_PALETTE[idx % FALLBACK_PALETTE.length] ||
        "#A855F7";

      return {
        language: lang,
        count: info.count,
        percentage: totalAssigned > 0 ? (info.count / totalAssigned) * 100 : 0,
        color,
        repositories: info.repos,
      };
    });

    // Sort descending by count
    return stats.sort((a, b) => b.count - a.count);
  }, [repos]);

  const totalRepos = repos.length;

  // D3 Chart Render Engine
  useEffect(() => {
    if (!svgRef.current || languageStats.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 320;
    const height = 300;
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Add subtle glow filters in SVG
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "d3-glow").attr("x", "-20%").attr("y", "-20%").attr("width", "140%").attr("height", "140%");
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    if (viewMode === "donut") {
      // 1. DONUT CHART
      const pie = d3
        .pie<LanguageStat>()
        .value((d) => d.count)
        .sort(null)
        .padAngle(0.03);

      const arc = d3
        .arc<d3.PieArcDatum<LanguageStat>>()
        .innerRadius(radius * 0.62)
        .outerRadius(radius * 0.95)
        .cornerRadius(6);

      const hoverArc = d3
        .arc<d3.PieArcDatum<LanguageStat>>()
        .innerRadius(radius * 0.58)
        .outerRadius(radius * 1.04)
        .cornerRadius(8);

      const arcs = g
        .selectAll(".arc")
        .data(pie(languageStats))
        .enter()
        .append("g")
        .attr("class", "arc")
        .style("cursor", "pointer");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => d.data.color)
        .attr("stroke", "transparent")
        .attr("stroke-width", 2)
        .attr("opacity", (d) =>
          selectedLanguage
            ? d.data.language === selectedLanguage
              ? 1
              : 0.35
            : 0.92
        )
        .style("transition", "all 0.25s ease-out")
        .on("mouseenter", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("d", hoverArc as any)
            .attr("opacity", 1)
            .style("filter", "url(#d3-glow)");
          setHoveredLang(d.data);
        })
        .on("mouseleave", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("d", arc as any)
            .attr("opacity", selectedLanguage ? (d.data.language === selectedLanguage ? 1 : 0.35) : 0.92)
            .style("filter", "none");
          setHoveredLang(null);
        })
        .on("click", (_event, d) => {
          if (onSelectLanguage) {
            onSelectLanguage(selectedLanguage === d.data.language ? null : d.data.language);
          }
        });

      // Animated entry
      arcs
        .select("path")
        .transition()
        .duration(800)
        .attrTween("d", function (d) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function (t) {
            return arc(interpolate(t)) || "";
          };
        });
    } else {
      // 2. HORIZONTAL BAR CHART
      svg.selectAll("*").remove();

      const barWidth = 340;
      const barHeight = Math.max(220, languageStats.length * 36 + 40);
      const barMargin = { top: 20, right: 30, bottom: 20, left: 110 };

      const barSvg = svg
        .attr("viewBox", `0 0 ${barWidth} ${barHeight}`)
        .append("g")
        .attr("transform", `translate(${barMargin.left},${barMargin.top})`);

      const innerWidth = barWidth - barMargin.left - barMargin.right;
      const innerHeight = barHeight - barMargin.top - barMargin.bottom;

      const y = d3
        .scaleBand()
        .range([0, innerHeight])
        .domain(languageStats.map((d) => d.language))
        .padding(0.28);

      const x = d3
        .scaleLinear()
        .range([0, innerWidth])
        .domain([0, d3.max(languageStats, (d) => d.count) || 1]);

      // Bars
      barSvg
        .selectAll(".bar")
        .data(languageStats)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d) => y(d.language) || 0)
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", (d) => d.color)
        .attr("opacity", (d) =>
          selectedLanguage
            ? d.language === selectedLanguage
              ? 1
              : 0.35
            : 0.9
        )
        .style("cursor", "pointer")
        .on("mouseenter", function (_event, d) {
          d3.select(this).attr("opacity", 1).style("filter", "url(#d3-glow)");
          setHoveredLang(d);
        })
        .on("mouseleave", function (_event, d) {
          d3.select(this)
            .attr("opacity", selectedLanguage ? (d.language === selectedLanguage ? 1 : 0.35) : 0.9)
            .style("filter", "none");
          setHoveredLang(null);
        })
        .on("click", (_event, d) => {
          if (onSelectLanguage) {
            onSelectLanguage(selectedLanguage === d.language ? null : d.language);
          }
        })
        .transition()
        .duration(600)
        .attr("width", (d) => x(d.count));

      // Labels on Y axis
      barSvg
        .selectAll(".label")
        .data(languageStats)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", -8)
        .attr("y", (d) => (y(d.language) || 0) + y.bandwidth() / 2 + 4)
        .attr("text-anchor", "end")
        .attr("fill", "currentColor")
        .attr("font-size", "11px")
        .attr("font-family", "ui-monospace, monospace")
        .text((d) => d.language)
        .style("cursor", "pointer")
        .on("click", (_event, d) => {
          if (onSelectLanguage) {
            onSelectLanguage(selectedLanguage === d.language ? null : d.language);
          }
        });

      // Count labels inside or next to bar
      barSvg
        .selectAll(".val")
        .data(languageStats)
        .enter()
        .append("text")
        .attr("class", "val")
        .attr("x", (d) => x(d.count) + 6)
        .attr("y", (d) => (y(d.language) || 0) + y.bandwidth() / 2 + 4)
        .attr("fill", "currentColor")
        .attr("opacity", 0.75)
        .attr("font-size", "10px")
        .attr("font-family", "ui-monospace, monospace")
        .text((d) => `${d.count} (${d.percentage.toFixed(0)}%)`);
    }
  }, [languageStats, viewMode, selectedLanguage, onSelectLanguage]);

  if (languageStats.length === 0) return null;

  const activeDisplay = hoveredLang || (selectedLanguage ? languageStats.find((s) => s.language === selectedLanguage) : null);

  return (
    <div
      ref={containerRef}
      className="p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#0c101d]/90 backdrop-blur-md border border-slate-200 dark:border-purple-500/20 shadow-xl transition-all mb-10"
    >
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>GitHub Language Distribution</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                D3.js Live
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive language telemetry calculated across {totalRepos} fetched public repositories.
            </p>
          </div>
        </div>

        {/* View Controls & Filter Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {selectedLanguage && (
            <button
              onClick={() => onSelectLanguage && onSelectLanguage(null)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 hover:bg-purple-200 transition-colors cursor-pointer"
              title="Reset language filter"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset ({selectedLanguage})</span>
            </button>
          )}

          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewMode("donut")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === "donut"
                  ? "bg-purple-600 text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Donut Radial View"
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Radial</span>
            </button>
            <button
              onClick={() => setViewMode("bars")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === "bars"
                  ? "bg-purple-600 text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Ranked Bar Chart View"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ranked</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Grid: D3 SVG + Interactive Legend */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: D3 SVG with Center Hole Overlay */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[300px] flex items-center justify-center aspect-square">
            <svg
              ref={svgRef}
              className="w-full h-full overflow-visible drop-shadow-md"
            />

            {/* Donut Center Display */}
            {viewMode === "donut" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
                {activeDisplay ? (
                  <div className="animate-in fade-in duration-200">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full mb-1"
                      style={{ backgroundColor: activeDisplay.color }}
                    />
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[130px]">
                      {activeDisplay.language}
                    </div>
                    <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">
                      {activeDisplay.percentage.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {activeDisplay.count} {activeDisplay.count === 1 ? "repo" : "repos"}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                      {totalRepos}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Repositories
                    </div>
                    <div className="text-[9px] text-purple-500 font-mono mt-0.5">
                      Hover for stats
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono text-center mt-2">
            💡 Click any slice or bar to filter projects by language
          </p>
        </div>

        {/* Right Column: Detailed Distribution Cards & Progress Breakdown */}
        <div className="md:col-span-6 space-y-4">
          {/* Horizontal multi-color stacked bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-500" />
                <span>Language Composition</span>
              </span>
              <span className="text-[11px]">{languageStats.length} Technologies Identified</span>
            </div>

            <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 p-0.5 gap-0.5 shadow-inner">
              {languageStats.map((stat) => (
                <div
                  key={stat.language}
                  style={{
                    width: `${Math.max(stat.percentage, 3)}%`,
                    backgroundColor: stat.color,
                  }}
                  className={`h-full rounded-sm transition-all duration-300 hover:opacity-100 cursor-pointer ${
                    selectedLanguage && selectedLanguage !== stat.language ? "opacity-30" : "opacity-90"
                  }`}
                  title={`${stat.language}: ${stat.percentage.toFixed(1)}% (${stat.count} repos)`}
                  onClick={() => onSelectLanguage && onSelectLanguage(selectedLanguage === stat.language ? null : stat.language)}
                />
              ))}
            </div>
          </div>

          {/* Legend Grid Pills with 1-click Filter Action */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {languageStats.map((stat) => {
              const isSelected = selectedLanguage === stat.language;
              return (
                <div
                  key={stat.language}
                  onClick={() => onSelectLanguage && onSelectLanguage(isSelected ? null : stat.language)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-xs ${
                    isSelected
                      ? "bg-purple-50 dark:bg-purple-950/70 border-purple-500 shadow-md ring-1 ring-purple-500"
                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: stat.color }}
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {stat.language}
                    </span>
                  </div>

                  <div className="text-right shrink-0 font-mono text-[11px]">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {stat.percentage.toFixed(0)}%
                    </span>
                    <span className="text-slate-400 ml-1 text-[10px]">
                      ({stat.count})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 text-[11px] text-purple-900 dark:text-purple-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span>
                Primary Focus: <strong>{languageStats[0]?.language}</strong> ({languageStats[0]?.percentage.toFixed(1)}% of all repositories)
              </span>
            </span>

            {selectedLanguage && (
              <span className="font-semibold underline cursor-pointer hover:text-purple-500" onClick={() => onSelectLanguage && onSelectLanguage(null)}>
                Clear Filter
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
