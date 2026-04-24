import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaLabel?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, delta, deltaLabel, positive }) => (
  <div className="bg-surface-card rounded-card p-4 shadow-panel">
    <p className="text-ink-secondary text-[11px] mb-1">{label}</p>
    <p className="text-white text-2xl font-semibold">{value}</p>
    {(delta || deltaLabel) && (
      <p className="text-[10px] mt-1">
        {delta && (
          <span className={positive ? "text-brand" : "text-danger"}>{delta} </span>
        )}
        {deltaLabel && (
          <span className="text-ink-muted">{deltaLabel}</span>
        )}
      </p>
    )}
  </div>
);

export default StatCard;
