import React from "react";

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
    {icon && <div className="text-ink-muted">{icon}</div>}
    <p className="text-ink-muted text-[12px]">{message}</p>
  </div>
);

export default EmptyState;
