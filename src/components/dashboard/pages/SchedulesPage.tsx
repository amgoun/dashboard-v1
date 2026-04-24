import React, { useState } from "react";
import { PageWrapper, PageHeader, StatCard, SectionHeader, StatusBadge, LegendItem } from "../shared";
import { colors } from "../theme";

const DAYS   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const events = [
  { id: 1, time: "09:00 AM", title: "Team Standup",          participants: 6, type: "Meeting",  color: colors.brand, duration: "30 min" },
  { id: 2, time: "10:30 AM", title: "Product Review",         participants: 4, type: "Review",   color: "#f59e0b",    duration: "1 hr"   },
  { id: 3, time: "12:00 PM", title: "Client Onboarding Call", participants: 3, type: "Call",     color: "#8b5cf6",    duration: "45 min" },
  { id: 4, time: "02:00 PM", title: "Design Sprint Planning", participants: 8, type: "Planning", color: colors.brand, duration: "2 hr"   },
  { id: 5, time: "04:30 PM", title: "Q2 Financial Report",    participants: 2, type: "Report",   color: colors.danger,duration: "1 hr"   },
];

const upcoming = [
  { date: "Apr 25", title: "Board Meeting",    time: "10:00 AM", type: "Meeting" },
  { date: "Apr 26", title: "Team Offsite",      time: "09:00 AM", type: "Event"   },
  { date: "Apr 28", title: "Investor Demo Day", time: "02:00 PM", type: "Demo"    },
  { date: "Apr 30", title: "Monthly Review",    time: "11:00 AM", type: "Review"  },
  { date: "May 02", title: "Product Launch",    time: "03:00 PM", type: "Launch"  },
];

const typeColor: Record<string, string> = {
  Meeting:  "text-brand bg-brand/10",
  Review:   "text-[#f59e0b] bg-[#f59e0b]/10",
  Call:     "text-[#8b5cf6] bg-[#8b5cf6]/10",
  Planning: "text-brand bg-brand/10",
  Report:   "text-danger bg-danger/10",
  Event:    "text-ink-secondary bg-white/5",
  Demo:     "text-[#8b5cf6] bg-[#8b5cf6]/10",
  Launch:   "text-[#f59e0b] bg-[#f59e0b]/10",
};

const calendarLegend = [
  { label: "Meeting", color: colors.brand   },
  { label: "Call",    color: "#8b5cf6"       },
  { label: "Review",  color: "#f59e0b"       },
];

function getMiniCalendar(year: number, month: number) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

const PlusIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const SchedulesPage: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear,  setCurrentYear]  = useState(today.getFullYear());
  const [selectedDay,  setSelectedDay]  = useState(today.getDate());

  const { firstDay, daysInMonth } = getMiniCalendar(currentYear, currentMonth);

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (d: number) =>
    d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <PageWrapper>
      <PageHeader
        title="Schedules"
        subtitle="Manage your calendar and appointments"
        action={{ label: "Add Event", icon: <PlusIcon />, onClick: () => {} }}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Events", value: "5"   },
          { label: "This Week",      value: "18"  },
          { label: "Upcoming",       value: "31"  },
          { label: "Completed",      value: "142" },
        ].map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Mini Calendar */}
        <div className="bg-surface-card rounded-card p-5 shadow-panel">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="text-ink-secondary hover:text-white p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white text-[13px] font-medium">{MONTHS[currentMonth]} {currentYear}</span>
            <button onClick={nextMonth} className="text-ink-secondary hover:text-white p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-ink-muted text-[10px] py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((cell, i) => (
              <div key={i} className="flex items-center justify-center">
                {cell !== null && (
                  <button
                    onClick={() => setSelectedDay(cell)}
                    className={`w-7 h-7 rounded-full text-[11px] transition-colors ${
                      isToday(cell)
                        ? "bg-brand text-white"
                        : selectedDay === cell
                        ? "bg-white/10 text-white"
                        : "text-ink-secondary hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cell}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 flex-wrap">
            {calendarLegend.map((l) => (
              <LegendItem key={l.label} color={l.color} label={l.label} />
            ))}
          </div>
        </div>

        {/* Today's Timeline */}
        <div className="lg:col-span-2 bg-surface-alt rounded-card p-5 shadow-panel">
          <SectionHeader
            title="Today's Schedule"
            right={
              <span className="text-brand text-[10px] font-plus-jakarta border border-brand/30 rounded px-2 py-0.5">
                {MONTHS[today.getMonth()]} {today.getDate()}
              </span>
            }
          />
          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className="flex items-start gap-3 p-3 bg-surface-card rounded-card hover:bg-white/[0.03] transition-colors">
                <div className="w-1 self-stretch rounded-full shrink-0 mt-0.5" style={{ backgroundColor: ev.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white text-[12.5px] font-medium truncate">{ev.title}</p>
                    <StatusBadge label={ev.type} colorClass={typeColor[ev.type]} />
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    {[ev.time, ev.duration, `${ev.participants} participants`].map((t, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span className="text-ink-muted text-[10.5px]">·</span>}
                        <span className={`text-[10.5px] ${i === 2 ? "text-ink-secondary" : "text-ink-muted"}`}>{t}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-surface-card rounded-card p-5 shadow-panel">
        <SectionHeader title="Upcoming Events" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {upcoming.map((ev) => (
            <div key={ev.date} className="bg-surface-alt rounded-card p-4 hover:bg-white/[0.03] transition-colors cursor-pointer">
              <p className="text-brand text-[10px] font-plus-jakarta font-semibold mb-1">{ev.date}</p>
              <p className="text-white text-[12px] font-medium leading-snug">{ev.title}</p>
              <p className="text-ink-muted text-[10px] mt-1">{ev.time}</p>
              <StatusBadge label={ev.type} colorClass={typeColor[ev.type]} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default SchedulesPage;
