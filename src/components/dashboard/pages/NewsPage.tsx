import React, { useState } from "react";

type NewsCategory = "All" | "Finance" | "Tech" | "Business" | "Markets";

const articles = [
  {
    id: 1,
    category: "Finance",
    title: "Fed Signals Three Rate Cuts in 2026 as Inflation Nears 2% Target",
    excerpt:
      "The Federal Reserve hinted at three potential interest rate cuts later this year as recent CPI data showed inflation pulling back toward its long-term target, boosting equity markets across the board.",
    author: "Rachel Kim",
    date: "Apr 24, 2026",
    readTime: "4 min",
    featured: true,
    color: "#28a263",
  },
  {
    id: 2,
    category: "Tech",
    title: "OpenAI Launches GPT-6 with Real-Time Reasoning Capabilities",
    excerpt:
      "The latest model from OpenAI introduces a breakthrough reasoning engine capable of multi-step planning and real-time web synthesis, setting a new benchmark in AI performance.",
    author: "Sam Voss",
    date: "Apr 24, 2026",
    readTime: "6 min",
    featured: false,
    color: "#8b5cf6",
  },
  {
    id: 3,
    category: "Business",
    title: "Apple Q2 Earnings Beat Expectations — Services Revenue Hits Record $26B",
    excerpt:
      "Apple reported record services revenue of $26 billion in Q2, driven by App Store, Apple TV+, and iCloud subscriptions. CEO Tim Cook credited AI-driven personalization.",
    author: "Linda Park",
    date: "Apr 23, 2026",
    readTime: "3 min",
    featured: false,
    color: "#f59e0b",
  },
  {
    id: 4,
    category: "Markets",
    title: "Bitcoin Surpasses $110,000 Amid Institutional Accumulation Wave",
    excerpt:
      "Bitcoin briefly touched $110,400 today as institutional buying from ETF inflows and corporate treasury allocations continued to drive demand. Analysts eye $120K as next target.",
    author: "David Marsh",
    date: "Apr 23, 2026",
    readTime: "5 min",
    featured: false,
    color: "#ff4e3c",
  },
  {
    id: 5,
    category: "Tech",
    title: "Nvidia's Blackwell Ultra GPUs Deliver 4x Training Speed Over Hopper",
    excerpt:
      "Nvidia unveiled benchmarks for its Blackwell Ultra architecture, showing a 4× improvement in AI training throughput versus previous-generation H100 chips.",
    author: "James Obi",
    date: "Apr 22, 2026",
    readTime: "5 min",
    featured: false,
    color: "#8b5cf6",
  },
  {
    id: 6,
    category: "Finance",
    title: "SaaS Valuations Rebound as ARR Multiples Climb to 8× Average",
    excerpt:
      "After two years of compression, SaaS company valuations are recovering with ARR multiples averaging 8× in Q1 2026, according to a new report from Battery Ventures.",
    author: "Rachel Kim",
    date: "Apr 22, 2026",
    readTime: "4 min",
    featured: false,
    color: "#28a263",
  },
  {
    id: 7,
    category: "Business",
    title: "Amazon Expands Same-Day Delivery to 50 New Cities Globally",
    excerpt:
      "Amazon announced a major logistics expansion bringing same-day delivery to 50 new metro areas across Europe, Southeast Asia, and South America.",
    author: "Nina Caldwell",
    date: "Apr 21, 2026",
    readTime: "3 min",
    featured: false,
    color: "#f59e0b",
  },
  {
    id: 8,
    category: "Markets",
    title: "S&P 500 Closes at Record High Driven by AI and Energy Stocks",
    excerpt:
      "The S&P 500 closed at an all-time high of 6,840 points today, with AI infrastructure companies and clean energy stocks leading the rally.",
    author: "David Marsh",
    date: "Apr 21, 2026",
    readTime: "4 min",
    featured: false,
    color: "#ff4e3c",
  },
];

const catColor: Record<string, string> = {
  Finance: "text-brand bg-brand/10",
  Tech: "text-[#8b5cf6] bg-[#8b5cf6]/10",
  Business: "text-[#f59e0b] bg-[#f59e0b]/10",
  Markets: "text-danger bg-danger/10",
};

const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("All");
  const [saved, setSaved] = useState<Set<number>>(new Set([1]));

  function toggleSave(id: number) {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const categories: NewsCategory[] = ["All", "Finance", "Tech", "Business", "Markets"];

  const featured = articles[0];
  const rest = articles.filter((a) => !a.featured);
  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((a) => a.category === activeCategory);

  return (
    <div className="px-4 sm:px-8 pb-8 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-white text-xl font-semibold font-inter">News</h1>
          <p className="text-ink-secondary text-[12.8px] font-inter mt-0.5">Latest in finance, tech, and markets</p>
        </div>
        {/* Category chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded text-[11px] font-inter transition-colors ${
                activeCategory === cat
                  ? "bg-brand text-white"
                  : "text-ink-secondary hover:text-white bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured article */}
      {(activeCategory === "All" || activeCategory === featured.category as NewsCategory) && (
        <div className="bg-surface-card rounded-card p-6 shadow-card relative overflow-hidden">
          {/* Decorative gradient blob */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${featured.color}, transparent 70%)`, transform: "translate(30%, -30%)" }}
          />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-inter px-2 py-0.5 rounded-full font-medium ${catColor[featured.category]}`}>
                {featured.category}
              </span>
              <span className="text-brand text-[10px] font-plus-jakarta border border-brand/30 rounded px-2 py-0.5">
                Featured
              </span>
            </div>
            <h2 className="text-white text-lg font-semibold font-inter leading-snug mb-3">
              {featured.title}
            </h2>
            <p className="text-ink-secondary text-[12.5px] font-inter leading-relaxed mb-4">
              {featured.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-brand/20 flex items-center justify-center text-brand text-[10px] font-inter font-semibold">
                  {featured.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-white text-[11px] font-inter font-medium">{featured.author}</p>
                  <p className="text-ink-muted text-[10px] font-inter">{featured.date} · {featured.readTime} read</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSave(featured.id)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill={saved.has(featured.id) ? "#28a263" : "none"}
                    stroke={saved.has(featured.id) ? "#28a263" : "#5f6868"}
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="flex items-center gap-1.5 bg-brand hover:bg-brand/90 transition-colors text-white text-[11px] font-inter px-3 py-1.5 rounded-card">
                  Read More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((article) => (
          <div
            key={article.id}
            className="bg-surface-card rounded-card p-4 shadow-card hover:bg-surface-elevated transition-colors group cursor-pointer flex flex-col"
          >
            {/* Color accent bar */}
            <div className="h-0.5 w-full rounded-full mb-4" style={{ backgroundColor: article.color }} />

            <div className="flex items-center justify-between mb-2">
              <span className={`text-[9.5px] font-inter px-1.5 py-0.5 rounded-full ${catColor[article.category]}`}>
                {article.category}
              </span>
              <button
                onClick={() => toggleSave(article.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill={saved.has(article.id) ? "#28a263" : "none"}
                  stroke={saved.has(article.id) ? "#28a263" : "#5f6868"}
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>

            <h3 className="text-white text-[12.5px] font-inter font-medium leading-snug mb-2 flex-1">
              {article.title}
            </h3>
            <p className="text-ink-muted text-[10.5px] font-inter leading-relaxed line-clamp-2 mb-3">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-ink-secondary text-[10px] font-inter">{article.author}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-ink-muted text-[9.5px] font-inter">{article.date}</span>
                <span className="text-ink-muted text-[9.5px]">·</span>
                <span className="text-ink-muted text-[9.5px] font-inter">{article.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <p className="text-ink-muted text-[12px] font-inter">No articles in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
