import React from "react";

interface AvatarProps {
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg";
  online?: boolean;
  /** Tailwind bg class for the online dot border, e.g. "border-surface-card" */
  onlineBorderClass?: string;
}

const sizeMap = {
  sm: { outer: "w-8 h-8",  text: "text-[9.5px]", dot: "w-2 h-2" },
  md: { outer: "w-9 h-9",  text: "text-[11px]",  dot: "w-2.5 h-2.5" },
  lg: { outer: "w-11 h-11", text: "text-[13px]", dot: "w-3 h-3" },
};

const Avatar: React.FC<AvatarProps> = ({
  initials,
  color,
  size = "md",
  online,
  onlineBorderClass = "border-surface-card",
}) => {
  const { outer, text, dot } = sizeMap[size];
  const bg = color === "#ffffff" ? "#333" : color;

  return (
    <div className="relative shrink-0">
      <div
        className={`${outer} rounded-full flex items-center justify-center text-white ${text} font-semibold`}
        style={{ backgroundColor: bg }}
      >
        {initials}
      </div>
      {online && (
        <span
          className={`absolute bottom-0 right-0 ${dot} bg-brand rounded-full border-2 ${onlineBorderClass}`}
        />
      )}
    </div>
  );
};

export default Avatar;
