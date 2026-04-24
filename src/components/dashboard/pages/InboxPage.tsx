import React, { useState } from "react";
import { PageWrapper, PageHeader, FilterTabs, Avatar, StatusBadge, EmptyState } from "../shared";
import { colors } from "../theme";

type Category = "All" | "Unread" | "Important" | "Archived";

const emails = [
  { id: 1, sender: "Stripe",       avatar: "ST", avatarColor: "#6366f1",        subject: "Your payout of $4,280.00 is on its way",          preview: "Hi Jenny, great news! Your latest payout has been processed and will arrive in your account within...", time: "9:41 AM",   unread: true,  important: true,  category: "Finance" },
  { id: 2, sender: "Noah Bennett", avatar: "NB", avatarColor: colors.danger,     subject: "Re: Invoice #4421 — Payment Confirmation",         preview: "Hi, just confirming that invoice #4421 has been approved and payment will be processed...",               time: "8:15 AM",   unread: true,  important: false, category: "Work"    },
  { id: 3, sender: "GitHub",       avatar: "GH", avatarColor: colors.inkSecondary,subject: "[dasbhoard-dark] PR #12 merged",                  preview: "Pull request #12 'feat: add analytics page' was merged into main by @jsmith at...",                      time: "Yesterday", unread: false, important: false, category: "Dev"     },
  { id: 4, sender: "Emma Hayes",   avatar: "EH", avatarColor: "#f59e0b",         subject: "Q2 Marketing Strategy — Action Required",          preview: "Please review the attached Q2 strategy deck before our call on Friday. Key changes include...",            time: "Yesterday", unread: false, important: true,  category: "Work"    },
  { id: 5, sender: "Figma",        avatar: "FG", avatarColor: colors.brand,      subject: "Liam Torres shared a file with you",               preview: "Liam Torres has shared 'Dashboard Redesign v3.fig' with you. Click here to open the file...",              time: "Apr 22",    unread: false, important: false, category: "Design"  },
  { id: 6, sender: "Vercel",       avatar: "VC", avatarColor: "#ffffff",         subject: "Deployment failed — dasbhoard-dark",               preview: "Your most recent deployment to production failed. Error: Module not found: lodash/isObject...",             time: "Apr 22",    unread: false, important: true,  category: "Dev"     },
  { id: 7, sender: "Notion",       avatar: "NO", avatarColor: colors.inkMuted,   subject: "Weekly digest — 5 updates in your workspace",      preview: "Here's what happened in your team workspace this week. Sophia Reed updated Product Roadmap...",            time: "Apr 21",    unread: false, important: false, category: "Work"    },
  { id: 8, sender: "Sophia Reed",  avatar: "SR", avatarColor: colors.brand,      subject: "Analytics report attached — April 2026",           preview: "Hi Jenny, please find the full analytics report for April 2026. Total revenue was up 18%...",              time: "Apr 20",    unread: false, important: true,  category: "Finance" },
];

const categoryColors: Record<string, string> = {
  Finance: "text-brand bg-brand/10",
  Work:    "text-[#f59e0b] bg-[#f59e0b]/10",
  Dev:     "text-[#8b5cf6] bg-[#8b5cf6]/10",
  Design:  "text-brand bg-brand/10",
};

const ComposeIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const InboxPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selected,       setSelected]       = useState<typeof emails[0] | null>(emails[0]);
  const [starred,        setStarred]        = useState<Set<number>>(new Set([1, 4]));

  function toggleStar(id: number) {
    setStarred((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const unreadCount = emails.filter((e) => e.unread).length;

  const filtered = emails.filter((e) => {
    if (activeCategory === "Unread")    return e.unread;
    if (activeCategory === "Important") return e.important || starred.has(e.id);
    return true;
  });

  const TABS = [
    { label: "All" },
    { label: "Unread",    count: unreadCount > 0 ? unreadCount : undefined },
    { label: "Important" },
    { label: "Archived"  },
  ];

  return (
    <PageWrapper>
      <PageHeader
        title="Inbox"
        subtitle={`${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`}
        action={{ label: "Compose", icon: <ComposeIcon />, onClick: () => {} }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4" style={{ minHeight: 520 }}>
        {/* Email list */}
        <div className="lg:col-span-2 bg-surface-card rounded-card shadow-panel flex flex-col overflow-hidden">
          <div className="flex items-center gap-1 p-3 border-b border-white/5">
            <FilterTabs tabs={TABS} active={activeCategory} onChange={(t) => setActiveCategory(t as Category)} size="sm" />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelected(email)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-white/[0.03] transition-colors ${
                  selected?.id === email.id ? "bg-brand/10" : "hover:bg-white/[0.02]"
                } ${email.unread ? "bg-white/[0.015]" : ""}`}
              >
                <Avatar initials={email.avatar} color={email.avatarColor} size="sm" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[12px] truncate ${email.unread ? "text-white font-semibold" : "text-ink-secondary"}`}>
                      {email.sender}
                    </span>
                    <span className="text-ink-muted text-[9px] shrink-0">{email.time}</span>
                  </div>
                  <p className={`text-[11px] truncate mt-0.5 ${email.unread ? "text-white" : "text-ink-muted"}`}>
                    {email.subject}
                  </p>
                  <p className="text-ink-muted text-[10px] truncate mt-0.5">{email.preview}</p>
                </div>

                {email.unread && <span className="w-2 h-2 bg-brand rounded-full shrink-0 mt-1.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Email reader */}
        <div className="lg:col-span-3 bg-surface-alt rounded-card shadow-panel flex flex-col overflow-hidden">
          {selected ? (
            <>
              <div className="px-6 py-5 border-b border-white/5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-white text-[14px] font-semibold leading-snug flex-1">{selected.subject}</h2>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleStar(selected.id)}
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/5 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill={starred.has(selected.id) ? "#f59e0b" : "none"}
                        stroke={starred.has(selected.id) ? "#f59e0b" : colors.inkMuted}
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/5 transition-colors">
                      <svg className="w-4 h-4 text-ink-muted" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar initials={selected.avatar} color={selected.avatarColor} size="sm" />
                  <div>
                    <p className="text-white text-[12px] font-medium">{selected.sender}</p>
                    <p className="text-ink-muted text-[10px]">to Jenny Wilson · {selected.time}</p>
                  </div>
                  <StatusBadge
                    label={selected.category}
                    colorClass={categoryColors[selected.category] ?? "text-ink-secondary bg-white/5"}
                    size="sm"
                    className="ml-auto"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                {["Hi Jenny,", selected.preview, "Please don't hesitate to reach out if you have any questions or need additional information. We're here to help and want to ensure everything goes smoothly."].map((p, i) => (
                  <p key={i} className="text-ink-secondary text-[12.5px] leading-relaxed">{p}</p>
                ))}
                <p className="text-ink-secondary text-[12.5px] leading-relaxed">
                  Best regards,<br /><span className="text-white">{selected.sender}</span>
                </p>
              </div>

              <div className="px-6 py-4 border-t border-white/5">
                <div className="flex items-center gap-3 bg-surface-card rounded-card px-4 py-3">
                  <input
                    type="text"
                    placeholder={`Reply to ${selected.sender}...`}
                    className="flex-1 bg-transparent text-white text-[12px] outline-none placeholder:text-ink-muted"
                  />
                  <button className="text-brand text-[11px] hover:text-white transition-colors shrink-0">Send Reply</button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState message="Select an email to read" />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default InboxPage;
