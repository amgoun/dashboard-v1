import React from "react";

interface SectionHeaderProps {
  title: string;
  right?: React.ReactNode;
  className?: string;
  titleSize?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  right,
  className = "mb-4",
  titleSize = "text-sm",
}) => (
  <div className={`flex items-center justify-between ${className}`}>
    <h2 className={`text-ink-secondary font-normal ${titleSize}`}>{title}</h2>
    {right}
  </div>
);

export default SectionHeader;
