import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPayloadEntry = Record<string, any>;

interface ChartTooltipProps {
  active?: boolean;
  payload?: AnyPayloadEntry[];
  label?: string;
  formatter?: (value: number, name?: string) => string;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  formatter,
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-surface-card border border-white/10 rounded-lg px-3 py-2 text-[11px] shadow-dropdown-xs">
      {label && (
        <p className="text-ink-secondary mb-1">{label}</p>
      )}
      {payload.map((entry, i) => (
        <p key={i} className="font-medium" style={{ color: entry.color ?? "white" }}>
          {entry.name ? `${entry.name}: ` : ""}
          {formatter && entry.value !== undefined
            ? formatter(entry.value, entry.name)
            : entry.value}
        </p>
      ))}
    </div>
  );
};

export default ChartTooltip;
