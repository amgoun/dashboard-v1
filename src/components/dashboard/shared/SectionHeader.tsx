import React from "react";

interface SectionHeaderProps {
  title: string;
  right?: React.ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, right, className = "mb-4" }) => (
  <div className={`flex items-center justify-between ${className}`}>
    <h2 className="text-ink-secondary text-sm font-normal">{title}</h2>
    {right}
  </div>
);

export default SectionHeader;
