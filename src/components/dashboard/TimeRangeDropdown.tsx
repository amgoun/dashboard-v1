import React, { useEffect, useRef, useState } from "react";

interface TimeRangeDropdownProps {
  options?: string[];
  defaultValue?: string;
}

const defaultOptions = ["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"];

const TimeRangeDropdown: React.FC<TimeRangeDropdownProps> = ({
  options = defaultOptions,
  defaultValue = "Last 7 Days",
}) => {
  const [selected, setSelected] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 border border-white/30 rounded px-2 py-1 bg-transparent hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-brand text-[8.8px] font-normal font-plus-jakarta">
          {selected}
        </span>
        <svg
          className={`w-2 h-2 text-brand transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-1 min-w-[92px] overflow-hidden rounded-md border border-white/10 bg-surface-card shadow-dropdown-xs">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`block w-full px-2 py-1.5 text-left text-[8.8px] font-plus-jakarta transition-colors ${
                selected === option
                  ? "bg-brand/10 text-brand"
                  : "text-ink-secondary hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeRangeDropdown;
