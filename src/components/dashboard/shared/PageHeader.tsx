import React from "react";

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: Action;
  right?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action, right }) => (
  <div className="flex items-center justify-between flex-wrap gap-3">
    <div>
      <h1 className="text-white text-xl font-semibold">{title}</h1>
      {subtitle && (
        <p className="text-ink-secondary text-[12.8px] mt-0.5">{subtitle}</p>
      )}
    </div>

    {action && (
      <button
        type="button"
        onClick={action.onClick}
        className="flex items-center gap-2 bg-brand hover:bg-brand/90 transition-colors text-white text-[12px] font-medium px-4 py-2 rounded-card"
      >
        {action.icon}
        {action.label}
      </button>
    )}

    {right}
  </div>
);

export default PageHeader;
