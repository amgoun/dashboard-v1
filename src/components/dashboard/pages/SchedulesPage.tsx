import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PageWrapper, PageHeader, StatCard, SectionHeader, StatusBadge, LegendItem } from "../shared";
import { colors } from "../theme";

const DAYS        = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS      = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_S    = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const EVENT_TYPES = ["Meeting","Review","Call","Planning","Report","Event","Demo","Launch"];
const DURATIONS   = ["15 min","30 min","45 min","1 hr","1.5 hr","2 hr","3 hr"];

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

const typeEventColor: Record<string, string> = {
  Meeting:  colors.brand,
  Review:   "#f59e0b",
  Call:     "#8b5cf6",
  Planning: colors.brand,
  Report:   colors.danger,
  Event:    colors.inkSecondary,
  Demo:     "#8b5cf6",
  Launch:   "#f59e0b",
};

const calendarLegend = [
  { label: "Meeting", color: colors.brand },
  { label: "Call",    color: "#8b5cf6"    },
  { label: "Review",  color: "#f59e0b"    },
];

interface ScheduleEvent {
  id: number;
  time: string;
  title: string;
  participants: number;
  type: string;
  color: string;
  duration: string;
  date: string; // "YYYY-MM-DD"
}

const TODAY_STR = new Date().toISOString().split("T")[0];

const STATIC_EVENTS: ScheduleEvent[] = [
  { id: 1, time: "09:00 AM", title: "Team Standup",          participants: 6, type: "Meeting",  color: colors.brand,    duration: "30 min", date: TODAY_STR },
  { id: 2, time: "10:30 AM", title: "Product Review",         participants: 4, type: "Review",   color: "#f59e0b",       duration: "1 hr",   date: TODAY_STR },
  { id: 3, time: "12:00 PM", title: "Client Onboarding Call", participants: 3, type: "Call",     color: "#8b5cf6",       duration: "45 min", date: TODAY_STR },
  { id: 4, time: "02:00 PM", title: "Design Sprint Planning", participants: 8, type: "Planning", color: colors.brand,    duration: "2 hr",   date: TODAY_STR },
  { id: 5, time: "04:30 PM", title: "Q2 Financial Report",    participants: 2, type: "Report",   color: colors.danger,   duration: "1 hr",   date: TODAY_STR },
];

const LS_KEY = "schedule_custom_events";

function loadEvents(): ScheduleEvent[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as ScheduleEvent[]) : [];
  } catch {
    return [];
  }
}

function persistEvents(evs: ScheduleEvent[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(evs));
}

function formatTime12(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12  = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function formatDateShort(dateStr: string): string {
  const [y, mo, d] = dateStr.split("-").map(Number);
  return `${MONTHS_S[mo - 1]} ${d}`;
}

function getMiniCalendar(year: number, month: number) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

const defaultForm = {
  title:        "",
  date:         TODAY_STR,
  time:         "09:00",
  duration:     "30 min",
  type:         "Meeting",
  participants: "1",
};

/* ─── Icons ──────────────────────────────────────────────── */

const PlusIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ─── Field wrapper ──────────────────────────────────────── */

const Field: React.FC<{ label: string; required?: boolean; error?: string; children: React.ReactNode }> = ({
  label, required, error, children,
}) => (
  <div>
    <label className="block text-ink-secondary text-[11px] font-medium mb-1.5">
      {label} {required && <span className="text-danger">*</span>}
    </label>
    {children}
    {error && <p className="text-danger text-[10.5px] mt-1">{error}</p>}
  </div>
);

/* ─── Custom dropdown matching TimeRangeDropdown style ───── */

const ChevronDown: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    className={`w-3.5 h-3.5 text-brand shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
);

interface DrawerSelectProps {
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

const DrawerSelect: React.FC<DrawerSelectProps> = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between gap-2 bg-[#242424] border border-white/[0.07] hover:border-brand/40 rounded-lg px-3 py-2.5 transition-colors text-left"
      >
        <span className="text-brand text-[12.5px] font-medium truncate">{value}</span>
        <ChevronDown open={open} />
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-[10000] mt-1 rounded-lg border border-white/10 bg-[#1b1b1b] shadow-xl overflow-hidden">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`block w-full px-3 py-2.5 text-left text-[12.5px] transition-colors ${
                opt === value
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-ink-secondary hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Custom time picker ─────────────────────────────────── */

const TP_HOURS   = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")); // 01–12
const TP_MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));     // 00–59
const TP_ITEM_H  = 36; // px — height of each row in the scroll columns

interface DrawerTimePickerProps {
  value: string; // "HH:MM" 24 h
  onChange: (val: string) => void;
  error?: boolean;
}

const DrawerTimePicker: React.FC<DrawerTimePickerProps> = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const hRef   = useRef<HTMLDivElement>(null);
  const mRef   = useRef<HTMLDivElement>(null);

  const [h24Str, mRaw] = value.split(":");
  const h24  = Number(h24Str);
  const mNum = Number(mRaw);
  const ap   = h24 >= 12 ? "PM" : "AM";
  const h12  = h24 % 12 || 12;
  const hStr = String(h12).padStart(2, "0");
  const mStr = String(mNum).padStart(2, "0");

  function emit(hour12: string, min: string, ampm: string) {
    let h = Number(hour12);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    onChange(`${String(h).padStart(2, "0")}:${min}`);
  }

  /* scroll columns to selected when panel opens */
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (hRef.current) hRef.current.scrollTop = (h12 - 1) * TP_ITEM_H;
      if (mRef.current) mRef.current.scrollTop = mNum * TP_ITEM_H;
    }, 0);
    return () => clearTimeout(t);
  }, [open, h12, mNum]);

  /* click outside closes */
  useEffect(() => {
    function out(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", out);
    return () => document.removeEventListener("mousedown", out);
  }, []);

  const colCls = (active: boolean) =>
    `flex items-center justify-center h-9 w-full text-[12.5px] transition-colors cursor-pointer select-none ${
      active ? "bg-brand/10 text-brand font-semibold" : "text-ink-secondary hover:bg-white/[0.04] hover:text-white"
    }`;

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className={`w-full flex items-center justify-between gap-2 bg-[#242424] rounded-lg px-3 py-2.5 border transition-colors ${
          error ? "border-danger/50" : "border-white/[0.07] hover:border-brand/40"
        }`}
      >
        <span className="text-brand text-[12.5px] font-medium">{hStr}:{mStr} {ap}</span>
        <svg className="w-3.5 h-3.5 text-ink-muted shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-[10000] mt-1 rounded-lg border border-white/10 bg-[#1b1b1b] shadow-xl overflow-hidden">
          <div className="flex divide-x divide-white/[0.06]">
            {/* Hours */}
            <div
              ref={hRef}
              className="flex-1 overflow-y-auto max-h-[180px] [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {TP_HOURS.map(h => (
                <div key={h} onClick={() => emit(h, mStr, ap)} className={colCls(h === hStr)}>
                  {h}
                </div>
              ))}
            </div>

            {/* Minutes */}
            <div
              ref={mRef}
              className="flex-1 overflow-y-auto max-h-[180px] [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {TP_MINUTES.map(min => (
                <div key={min} onClick={() => emit(hStr, min, ap)} className={colCls(min === mStr)}>
                  {min}
                </div>
              ))}
            </div>

            {/* AM / PM */}
            <div className="flex flex-col">
              {(["AM", "PM"] as const).map(a => (
                <div key={a} onClick={() => emit(hStr, mStr, a)} className={colCls(a === ap) + " px-4"}>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Main component ─────────────────────────────────────── */

const SchedulesPage: React.FC = () => {
  const today = new Date();

  const [currentMonth,  setCurrentMonth]  = useState(today.getMonth());
  const [currentYear,   setCurrentYear]   = useState(today.getFullYear());
  const [selectedDay,   setSelectedDay]   = useState(today.getDate());
  const [drawerOpen,    setDrawerOpen]    = useState(false);
  const [customEvents,  setCustomEvents]  = useState<ScheduleEvent[]>(loadEvents);
  const [form,          setForm]          = useState(defaultForm);
  const [errors,        setErrors]        = useState<Record<string, string>>({});
  const [dpMonth,       setDpMonth]       = useState(today.getMonth());
  const [dpYear,        setDpYear]        = useState(today.getFullYear());

  const { firstDay, daysInMonth } = getMiniCalendar(currentYear, currentMonth);

  const allEvents = [...STATIC_EVENTS, ...customEvents];

  const todayEvents = allEvents
    .filter(e => e.date === TODAY_STR)
    .sort((a, b) => a.time.localeCompare(b.time));

  const upcomingEvents = allEvents
    .filter(e => e.date > TODAY_STR)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 8);

  /* Calendar nav */
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

  /* Drawer */
  function openDrawer() {
    setForm(defaultForm);
    setErrors({});
    setDpMonth(today.getMonth());
    setDpYear(today.getFullYear());
    setDrawerOpen(true);
  }

  /* Drawer calendar helpers */
  function dpPrevMonth() {
    if (dpMonth === 0) { setDpMonth(11); setDpYear(y => y - 1); }
    else setDpMonth(m => m - 1);
  }
  function dpNextMonth() {
    if (dpMonth === 11) { setDpMonth(0); setDpYear(y => y + 1); }
    else setDpMonth(m => m + 1);
  }
  function dpSelectDay(day: number) {
    const dateStr = `${dpYear}-${String(dpMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setForm(prev => ({ ...prev, date: dateStr }));
    if (errors.date) setErrors(prev => ({ ...prev, date: "" }));
  }
  const dpCells: (number | null)[] = (() => {
    const { firstDay, daysInMonth } = getMiniCalendar(dpYear, dpMonth);
    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
  })();
  const dpSelectedParts = form.date.split("-").map(Number); // [Y, M, D]
  function dpIsSelected(day: number) {
    return dpSelectedParts[0] === dpYear && dpSelectedParts[1] === dpMonth + 1 && dpSelectedParts[2] === day;
  }
  function dpIsToday(day: number) {
    return day === today.getDate() && dpMonth === today.getMonth() && dpYear === today.getFullYear();
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* Form */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.date)         errs.date  = "Date is required";
    if (!form.time)         errs.time  = "Time is required";
    return errs;
  }

  function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const newEvent: ScheduleEvent = {
      id:           Date.now(),
      title:        form.title.trim(),
      date:         form.date,
      time:         formatTime12(form.time),
      duration:     form.duration,
      type:         form.type,
      participants: Math.max(1, Number(form.participants) || 1),
      color:        typeEventColor[form.type] ?? colors.brand,
    };

    const updated = [...customEvents, newEvent];
    setCustomEvents(updated);
    persistEvents(updated);
    closeDrawer();
  }

  const inputCls = (err?: string) =>
    `w-full bg-[#242424] rounded-lg px-3 py-2.5 text-white text-[12.5px] border outline-none focus:border-brand/60 transition-colors placeholder:text-ink-muted ${err ? "border-danger/50" : "border-white/[0.07]"}`;

  const portal = ReactDOM.createPortal(
    <>
      {/* ── Backdrop ───────────────────────────────────────── */}
      <div
        onClick={closeDrawer}
        aria-hidden="true"
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Slide-in Drawer ────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add new event"
        className={`fixed top-0 right-0 h-screen z-[9999] w-[320px] bg-[#1b1b1b] border-l border-white/[0.06] shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-white text-[14px] font-semibold">New Event</h2>
            <p className="text-ink-muted text-[11px] mt-0.5">Schedule something on your calendar</p>
          </div>
          <button
            onClick={closeDrawer}
            className="text-ink-secondary hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close drawer"
          >
            <XIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <Field label="Event Title" required error={errors.title}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Team Standup"
              autoComplete="off"
              className={inputCls(errors.title)}
            />
          </Field>

          {/* ── Custom calendar picker ───────────────────── */}
          <div>
            <label className="block text-ink-secondary text-[11px] font-medium mb-1.5">
              Date <span className="text-danger">*</span>
            </label>
            <div className={`rounded-xl border ${errors.date ? "border-danger/50" : "border-white/[0.07]"} bg-[#141414] p-4`}>
              {/* Month nav */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={dpPrevMonth}
                  className="text-ink-secondary hover:text-white p-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-white text-[12px] font-semibold">{MONTHS[dpMonth]} {dpYear}</span>
                <button
                  type="button"
                  onClick={dpNextMonth}
                  className="text-ink-secondary hover:text-white p-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-ink-muted text-[9.5px] py-1">{d}</div>
                ))}
              </div>
              {/* Day cells */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {dpCells.map((cell, i) => (
                  <div key={i} className="flex items-center justify-center">
                    {cell !== null && (
                      <button
                        type="button"
                        onClick={() => dpSelectDay(cell)}
                        className={`w-7 h-7 rounded-full text-[11px] transition-colors ${
                          dpIsToday(cell) && !dpIsSelected(cell)
                            ? "text-brand font-semibold"
                            : dpIsSelected(cell)
                            ? "bg-brand text-white font-semibold"
                            : "text-ink-secondary hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {cell}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {errors.date && <p className="text-danger text-[10.5px] mt-1">{errors.date}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Time" required error={errors.time}>
              <DrawerTimePicker
                value={form.time}
                error={!!errors.time}
                onChange={val => {
                  setForm(p => ({ ...p, time: val }));
                  if (errors.time) setErrors(p => ({ ...p, time: "" }));
                }}
              />
            </Field>
            <Field label="Duration">
              <DrawerSelect
                value={form.duration}
                options={DURATIONS}
                onChange={val => setForm(p => ({ ...p, duration: val }))}
              />
            </Field>
          </div>

          <Field label="Event Type">
            <DrawerSelect
              value={form.type}
              options={EVENT_TYPES}
              onChange={val => setForm(p => ({ ...p, type: val }))}
            />
          </Field>

          <Field label="Participants">
            <div className="flex items-center gap-0 bg-[#242424] border border-white/[0.07] rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, participants: String(Math.max(1, Number(p.participants) - 1)) }))}
                className="w-10 shrink-0 flex items-center justify-center h-[42px] text-ink-secondary hover:text-white hover:bg-white/[0.06] border-r border-white/[0.07] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <input
                name="participants"
                type="number"
                min="1"
                max="999"
                value={form.participants}
                onChange={handleChange}
                className="flex-1 bg-transparent text-brand text-[12.5px] font-medium text-center outline-none py-2.5 px-2 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, participants: String(Math.min(999, Number(p.participants) + 1)) }))}
                className="w-10 shrink-0 flex items-center justify-center h-[42px] text-ink-secondary hover:text-white hover:bg-white/[0.06] border-l border-white/[0.07] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </Field>

          {/* Color preview */}
          <div className="flex items-center gap-2 pt-1 pb-2">
            <div
              className="w-2.5 h-2.5 rounded-full ring-2 ring-white/10"
              style={{ backgroundColor: typeEventColor[form.type] }}
            />
            <span className="text-ink-muted text-[11px]">Color auto-set by event type</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/[0.06] flex gap-3">
          <button
            onClick={closeDrawer}
            className="flex-1 py-2.5 rounded-lg text-[12.5px] font-medium text-ink-secondary bg-white/5 hover:bg-white/[0.08] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-lg text-[12.5px] font-medium text-white bg-brand hover:bg-brand/90 active:scale-[0.98] transition-all"
          >
            Save Event
          </button>
        </div>
      </div>
    </>,
    document.body,
  );

  return (
    <>
      {portal}

      <PageWrapper>
      <PageHeader
        title="Schedules"
        subtitle="Manage your calendar and appointments"
        action={{ label: "Add Event", icon: <PlusIcon />, onClick: openDrawer }}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Events", value: String(todayEvents.length)      },
          { label: "This Week",      value: "18"                            },
          { label: "Upcoming",       value: String(upcomingEvents.length)   },
          { label: "Completed",      value: "142"                           },
        ].map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Mini Calendar */}
        <div className="bg-surface-card rounded-card p-5 shadow-panel">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="text-ink-secondary hover:text-white p-1 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white text-[13px] font-medium">{MONTHS[currentMonth]} {currentYear}</span>
            <button onClick={nextMonth} className="text-ink-secondary hover:text-white p-1 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
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
            {calendarLegend.map(l => (
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
                {MONTHS_S[today.getMonth()]} {today.getDate()}
              </span>
            }
          />

          {todayEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-ink-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                </svg>
              </div>
              <p className="text-ink-secondary text-[12px]">No events today</p>
              <p className="text-ink-muted text-[11px] mt-1">Click "Add Event" to schedule something</p>
            </div>
          ) : (
            <ScrollArea.Root className="relative overflow-hidden">
              <ScrollArea.Viewport style={{ maxHeight: "492px" }} className="w-full">
                <div className="space-y-3 pr-3">
                  {todayEvents.map(ev => (
                    <div
                      key={ev.id}
                      className="flex items-start gap-3 p-3 bg-surface-card rounded-card hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="w-1 self-stretch rounded-full shrink-0 mt-0.5" style={{ backgroundColor: ev.color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-white text-[12.5px] font-medium truncate">{ev.title}</p>
                          <StatusBadge label={ev.type} colorClass={typeColor[ev.type] ?? typeColor.Event} />
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
              </ScrollArea.Viewport>

              {/* Branded scrollbar — same as sidebar */}
              <ScrollArea.Scrollbar
                orientation="vertical"
                className="flex select-none touch-none py-1 px-0.5 w-[7px] transition-opacity duration-150 ease-out hover:w-[9px] data-[state=hidden]:opacity-0"
                style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-full bg-brand/40 hover:bg-brand/70 transition-colors before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:min-w-[20px] before:h-full before:min-h-[20px]" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-surface-card rounded-card p-5 shadow-panel">
        <SectionHeader title="Upcoming Events" />

        {upcomingEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-ink-secondary text-[12px]">No upcoming events</p>
            <p className="text-ink-muted text-[11px] mt-1">Add a future event to see it here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {upcomingEvents.map(ev => (
              <div
                key={ev.id}
                className="bg-surface-alt rounded-card p-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ev.color }} />
                  <p className="text-brand text-[10px] font-plus-jakarta font-semibold">
                    {formatDateShort(ev.date)}
                  </p>
                </div>
                <p className="text-white text-[12px] font-medium leading-snug">{ev.title}</p>
                <p className="text-ink-muted text-[10px] mt-1">{ev.time}</p>
                <div className="mt-2">
                  <StatusBadge label={ev.type} colorClass={typeColor[ev.type] ?? typeColor.Event} size="sm" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      </PageWrapper>
    </>
  );
};

export default SchedulesPage;
