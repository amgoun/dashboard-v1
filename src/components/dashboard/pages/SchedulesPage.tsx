import React, { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const events = [
  { id: 1, time: "09:00 AM", title: "Team Standup", participants: 6, type: "Meeting", color: "#28a263", duration: "30 min" },
  { id: 2, time: "10:30 AM", title: "Product Review", participants: 4, type: "Review", color: "#f59e0b", duration: "1 hr" },
  { id: 3, time: "12:00 PM", title: "Client Onboarding Call", participants: 3, type: "Call", color: "#8b5cf6", duration: "45 min" },
  { id: 4, time: "02:00 PM", title: "Design Sprint Planning", participants: 8, type: "Planning", color: "#28a263", duration: "2 hr" },
  { id: 5, time: "04:30 PM", title: "Q2 Financial Report", participants: 2, type: "Report", color: "#ff4e3c", duration: "1 hr" },
];

const upcoming = [
  { date: "Apr 25", title: "Board Meeting", time: "10:00 AM", type: "Meeting" },
  { date: "Apr 26", title: "Team Offsite", time: "09:00 AM", type: "Event" },
  { date: "Apr 28", title: "Investor Demo Day", time: "02:00 PM", type: "Demo" },
  { date: "Apr 30", title: "Monthly Review", time: "11:00 AM", type: "Review" },
  { date: "May 02", title: "Product Launch", time: "03:00 PM", type: "Launch" },
];

const typeColor: Record<string, string> = {
  Meeting: "text-[#28a263] bg-[#28a263]/10",
  Review: "text-[#f59e0b] bg-[#f59e0b]/10",
  Call: "text-[#8b5cf6] bg-[#8b5cf6]/10",
  Planning: "text-[#28a263] bg-[#28a263]/10",
  Report: "text-[#ff4e3c] bg-[#ff4e3c]/10",
  Event: "text-[#a1a1a1] bg-white/5",
  Demo: "text-[#8b5cf6] bg-[#8b5cf6]/10",
  Launch: "text-[#f59e0b] bg-[#f59e0b]/10",
};

function getMiniCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

const SchedulesPage: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const { firstDay, daysInMonth } = getMiniCalendar(currentYear, currentMonth);

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (d: number) =>
    d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div className="px-4 sm:px-8 pb-8 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold font-inter">Schedules</h1>
          <p className="text-[#a1a1a1] text-[12.8px] font-inter mt-0.5">Manage your calendar and appointments</p>
        </div>
        <button className="flex items-center gap-2 bg-[#28a263] hover:bg-[#23935a] transition-colors text-white text-[12px] font-inter font-medium px-4 py-2 rounded-[7px]">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Events", value: "5", icon: "📅" },
          { label: "This Week", value: "18", icon: "📆" },
          { label: "Upcoming", value: "31", icon: "🗓" },
          { label: "Completed", value: "142", icon: "✅" },
        ].map((s) => (
          <div key={s.label} className="bg-[#1b1b1b] rounded-[7px] p-4 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)]">
            <p className="text-[#a1a1a1] text-[11px] font-inter mb-2">{s.label}</p>
            <p className="text-white text-2xl font-semibold font-inter">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Mini Calendar */}
        <div className="bg-[#1b1b1b] rounded-[7px] p-5 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="text-[#a1a1a1] hover:text-white p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white text-[13px] font-inter font-medium">
              {MONTHS[currentMonth]} {currentYear}
            </span>
            <button onClick={nextMonth} className="text-[#a1a1a1] hover:text-white p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[#5f6868] text-[10px] font-inter py-1">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((cell, i) => (
              <div key={i} className="flex items-center justify-center">
                {cell !== null ? (
                  <button
                    onClick={() => setSelectedDay(cell as number)}
                    className={`w-7 h-7 rounded-full text-[11px] font-inter transition-colors ${
                      isToday(cell as number)
                        ? "bg-[#28a263] text-white"
                        : selectedDay === cell
                        ? "bg-white/10 text-white"
                        : "text-[#a1a1a1] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cell}
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 flex-wrap">
            {[
              { label: "Meeting", color: "#28a263" },
              { label: "Call", color: "#8b5cf6" },
              { label: "Review", color: "#f59e0b" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-[#a1a1a1] text-[10px] font-inter">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Timeline */}
        <div className="lg:col-span-2 bg-[#1d1d1d] rounded-[7px] p-5 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#a1a1a1] text-sm font-inter">Today's Schedule</h2>
            <span className="text-[#28a263] text-[10px] font-plus-jakarta border border-[#28a263]/30 rounded px-2 py-0.5">
              {MONTHS[today.getMonth()]} {today.getDate()}
            </span>
          </div>

          <div className="space-y-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-3 p-3 bg-[#1b1b1b] rounded-[7px] hover:bg-white/[0.03] transition-colors"
              >
                <div
                  className="w-1 self-stretch rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: ev.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white text-[12.5px] font-inter font-medium truncate">{ev.title}</p>
                    <span className={`text-[10px] font-inter px-2 py-0.5 rounded-full shrink-0 ${typeColor[ev.type]}`}>
                      {ev.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[#5f6868] text-[10.5px] font-inter">{ev.time}</span>
                    <span className="text-[#5f6868] text-[10.5px] font-inter">·</span>
                    <span className="text-[#5f6868] text-[10.5px] font-inter">{ev.duration}</span>
                    <span className="text-[#5f6868] text-[10.5px] font-inter">·</span>
                    <span className="text-[#a1a1a1] text-[10.5px] font-inter">{ev.participants} participants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-[#1b1b1b] rounded-[7px] p-5 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)]">
        <h2 className="text-[#a1a1a1] text-sm font-inter mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {upcoming.map((ev) => (
            <div
              key={ev.date}
              className="bg-[#1d1d1d] rounded-[7px] p-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <p className="text-[#28a263] text-[10px] font-plus-jakarta font-semibold mb-1">{ev.date}</p>
              <p className="text-white text-[12px] font-inter font-medium leading-snug">{ev.title}</p>
              <p className="text-[#5f6868] text-[10px] font-inter mt-1">{ev.time}</p>
              <span className={`inline-block mt-2 text-[9.5px] font-inter px-1.5 py-0.5 rounded-full ${typeColor[ev.type]}`}>
                {ev.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulesPage;
