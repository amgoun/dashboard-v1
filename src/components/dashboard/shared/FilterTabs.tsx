import React from "react";

interface Tab {
  label: string;
  count?: number;
}

interface FilterTabsProps {
  tabs: Tab[];
  active: string;
  onChange: (label: string) => void;
  /** Wrap in a raised track (bg-surface-card p-1 rounded-card). Defaults to false. */
  raised?: boolean;
  size?: "sm" | "md";
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  active,
  onChange,
  raised = false,
  size = "md",
}) => {
  const textSize = size === "sm" ? "text-[10.5px]" : "text-[11px]";
  const padding   = size === "sm" ? "px-3 py-1" : "px-4 py-1.5";

  const buttons = tabs.map(({ label, count }) => (
    <button
      key={label}
      type="button"
      onClick={() => onChange(label)}
      className={`${padding} ${textSize} rounded transition-colors whitespace-nowrap ${
        active === label
          ? "bg-brand text-white"
          : "text-ink-secondary hover:text-white bg-white/5"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className="ml-1 opacity-60">({count})</span>
      )}
    </button>
  ));

  if (raised) {
    return (
      <div className="flex items-center gap-1 bg-surface-card rounded-card p-1 w-fit">
        {buttons}
      </div>
    );
  }

  return <div className="flex items-center gap-1 flex-wrap">{buttons}</div>;
};

export default FilterTabs;
