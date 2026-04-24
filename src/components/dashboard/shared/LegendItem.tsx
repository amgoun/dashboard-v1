import React from "react";

interface LegendItemProps {
  color: string;
  label: string;
  value?: string | number;
  shape?: "dot" | "line";
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label, value, shape = "dot" }) => (
  <div className="flex items-center gap-2">
    {shape === "dot" ? (
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
    ) : (
      <span className="w-3 h-0.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
    )}
    <span className="text-ink-secondary text-[11px]">{label}</span>
    {value !== undefined && (
      <span className="text-white text-[11px] font-medium ml-auto">{value}</span>
    )}
  </div>
);

export default LegendItem;
