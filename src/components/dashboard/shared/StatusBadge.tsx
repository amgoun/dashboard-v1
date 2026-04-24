import React from "react";

interface StatusBadgeProps {
  label: string;
  /** Tailwind text + bg classes, e.g. "text-brand bg-brand/10" */
  colorClass: string;
  size?: "sm" | "md";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, colorClass, size = "md", className = "" }) => {
  const textSize = size === "sm" ? "text-[9.5px] px-1.5" : "text-[10px] px-2";
  return (
    <span className={`${textSize} py-0.5 rounded-full font-medium ${colorClass} ${className}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
