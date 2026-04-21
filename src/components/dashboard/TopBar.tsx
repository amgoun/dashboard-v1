import React, { useRef, useState, useEffect } from "react";
import MessagesDropdown from "./MessagesDropdown";
import NotificationsDropdown from "./NotificationsDropdown";

interface TopBarProps {
  onMenuOpen: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

type Panel = "messages" | "notifications" | null;

const TopBar: React.FC<TopBarProps> = ({ onMenuOpen, searchQuery, onSearchChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function toggle(panel: Panel) {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  }

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 pt-6 pb-4 gap-3">
      {/* Hamburger — mobile only */}
      <button
        className="lg:hidden text-[#a1a1a1] hover:text-white shrink-0"
        onClick={onMenuOpen}
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Welcome */}
      <div className="min-w-0">
        <h1 className="text-white text-lg sm:text-xl font-semibold font-inter leading-tight tracking-[-0.02em] truncate">
          Welcome back, Jenny
        </h1>
        <p className="text-[#a1a1a1] text-[12.8px] font-normal font-inter tracking-[-0.02em]">
          Hey jenny, what's happening!
        </p>
      </div>

      {/* Search */}
      <div
        className="hidden sm:flex items-center bg-[#1d1d1d] rounded-[7px] px-4 py-2 w-[200px] xl:w-[306px] gap-2 shrink-0 focus-within:ring-1 focus-within:ring-[#28a263] transition-all cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <svg
          className="w-3.5 h-3.5 shrink-0 opacity-50"
          fill="none"
          stroke={searchQuery ? "#28a263" : "white"}
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for something..."
          className="flex-1 bg-transparent text-white text-[11.2px] font-normal font-inter outline-none placeholder:text-[#a1a1a1] min-w-0"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="text-[#5f6868] hover:text-white transition-colors shrink-0"
            aria-label="Clear search"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Action icons */}
      <div ref={panelRef} className="flex items-center gap-2 shrink-0">

        {/* Messages */}
        <div className="relative">
          <button
            onClick={() => toggle("messages")}
            className={`w-[35px] h-[36px] rounded-lg flex items-center justify-center transition-colors ${
              openPanel === "messages" ? "bg-[#28a263]/20 ring-1 ring-[#28a263]/40" : "bg-[#1a1a1a] hover:bg-[#242424]"
            }`}
            aria-label="Messages"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke={openPanel === "messages" ? "#28a263" : "#a1a1a1"}
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          {openPanel === "messages" && <MessagesDropdown />}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => toggle("notifications")}
            className={`w-[35px] h-[36px] rounded-lg flex items-center justify-center transition-colors ${
              openPanel === "notifications" ? "bg-[#ff4e3c]/10 ring-1 ring-[#ff4e3c]/30" : "bg-[#1a1a1a] hover:bg-[#242424]"
            }`}
            aria-label="Notifications"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke={openPanel === "notifications" ? "#ff4e3c" : "#a1a1a1"}
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Unread badge */}
            <span className="absolute top-1 right-1 w-[9px] h-[9px] bg-[#ff4e3c] rounded-full flex items-center justify-center">
              <span className="text-white text-[3.8px] font-normal font-inter">2</span>
            </span>
          </button>
          {openPanel === "notifications" && <NotificationsDropdown />}
        </div>

        {/* Avatar */}
        <div className="w-[35px] h-[36px] bg-[#1a1a1a] rounded-lg overflow-hidden">
          <img
            src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518657-node-3%3A828-1776729517118.png"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
