import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { navItems } from "./data";

interface SidebarProps {
  onClose?: () => void;
  activePage: string;
  onNavigate: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, activePage, onNavigate }) => (
  <aside className="w-[230px] h-screen sticky top-0 bg-surface-card flex flex-col shrink-0">
    {/* Logo */}
    <div className="flex items-center gap-2 px-8 pt-8 pb-10 shrink-0">
      <img
        src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729519513-node-3%3A575-1776729518164.png"
        alt="uifry logo icon"
        className="w-7 h-7 object-contain"
      />
      <img
        src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729519555-node-3%3A573-1776729518164.png"
        alt="uifry logo text"
        className="h-5 object-contain"
      />
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto text-ink-secondary hover:text-white text-xl leading-none lg:hidden"
          aria-label="Close menu"
        >
          ✕
        </button>
      )}
    </div>

    {/* Scrollable nav */}
    <ScrollArea.Root className="flex-1 min-h-0 overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full">
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {navItems.map((item) => {
            const isActive = activePage === item.label;
            return (
              <div key={item.label} className="relative">
                {isActive && (
                  <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-6 bg-brand rounded-r-full" />
                )}
                <button
                  onClick={() => { onNavigate(item.label); if (onClose) onClose(); }}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-normal font-inter transition-colors ${
                    isActive
                      ? "text-brand font-semibold bg-brand/10"
                      : "text-ink-secondary hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="relative flex items-center">
                    <img
                      src={item.iconUrl}
                      alt={item.label}
                      className="w-[18px] h-[18px] object-contain transition-all duration-200"
                      style={{
                        filter: isActive
                          ? "brightness(0) invert(55%) sepia(28%) saturate(1186%) hue-rotate(103deg) brightness(85%) contrast(86%)"
                          : "brightness(0) invert(66%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(93%) contrast(88%)",
                        opacity: isActive ? 1 : 0.75,
                      }}
                    />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-[5.5px] h-[5.5px] bg-danger rounded-full" />
                    )}
                  </span>
                  {item.label}
                </button>
              </div>
            );
          })}
        </nav>
      </ScrollArea.Viewport>

      {/* Custom scrollbar */}
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex select-none touch-none py-1 px-0.5 w-[7px] transition-opacity duration-150 ease-out hover:w-[9px] data-[state=hidden]:opacity-0"
        style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-brand/40 hover:bg-brand/70 transition-colors before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:min-w-[20px] before:h-full before:min-h-[20px]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>

    {/* User Profile — pinned to bottom */}
    <div className="px-4 pb-6 shrink-0">
      <div className="flex items-center gap-3 px-4 py-2">
        <img
          src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518709-node-3%3A831-1776729517136.png"
          alt="Jenny Wilson avatar"
          className="w-9 h-9 rounded-lg object-cover"
        />
        <div>
          <p className="text-ink-secondary text-[12.8px] font-normal font-inter leading-tight">Jenny Wilson</p>
          <p className="text-white text-[9.6px] font-normal font-inter">Itaibrahca31@gmail.com</p>
        </div>
      </div>
      <button className="flex items-center gap-3 px-4 py-2 mt-2 text-ink-secondary text-[12.8px] font-normal font-inter hover:text-white transition-colors">
        <img
          src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729519656-node-3%3A877-1776729518188.png"
          alt="logout"
          className="w-4 h-4 object-contain"
        />
        Logout
      </button>
    </div>
  </aside>
);

export default Sidebar;
