import React from "react";
import { navItems } from "./data";

interface SidebarProps {
  onClose?: () => void;
  activePage: string;
  onNavigate: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, activePage, onNavigate }) => (
  <aside className="w-[230px] h-screen sticky top-0 bg-[#1b1b1b] flex flex-col py-8 px-0 shrink-0 overflow-y-auto">
    {/* Logo */}
    <div className="flex items-center gap-2 px-8 mb-10">
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
          className="ml-auto text-[#a1a1a1] hover:text-white text-xl leading-none lg:hidden"
          aria-label="Close menu"
        >
          ✕
        </button>
      )}
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-1 flex-1 px-4">
      {navItems.map((item) => {
        const isActive = activePage === item.label;
        return (
          <div key={item.label} className="relative">
            {isActive && (
              <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-6 bg-[#28a263] rounded-r-full" />
            )}
            <button
              onClick={() => { onNavigate(item.label); if (onClose) onClose(); }}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-normal font-inter transition-colors ${
                isActive ? "text-[#28a263] font-semibold bg-[#28a263]/10" : "text-[#a1a1a1] hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <span className="relative flex items-center">
                <img src={item.iconUrl} alt={item.label} className="w-[18px] h-[18px] object-contain" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-[5.5px] h-[5.5px] bg-[#ff4e3c] rounded-full" />
                )}
              </span>
              {item.label}
            </button>
          </div>
        );
      })}
    </nav>

    {/* User Profile */}
    <div className="px-4 mt-4">
      <div className="flex items-center gap-3 px-4 py-2">
        <img
          src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518709-node-3%3A831-1776729517136.png"
          alt="Jenny Wilson avatar"
          className="w-9 h-9 rounded-lg object-cover"
        />
        <div>
          <p className="text-[#a1a1a1] text-[12.8px] font-normal font-inter leading-tight">Jenny Wilson</p>
          <p className="text-white text-[9.6px] font-normal font-inter">Itaibrahca31@gmail.com</p>
        </div>
      </div>
      <button className="flex items-center gap-3 px-4 py-2 mt-2 text-[#a1a1a1] text-[12.8px] font-normal font-inter hover:text-white transition-colors">
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
