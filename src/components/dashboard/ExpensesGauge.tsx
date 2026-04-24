import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const segments = [
  { name: "Shopping",      value: 28, color: "#3e795a" },
  { name: "Entertainment", value: 32, color: "#28a263" },
  { name: "Food",          value: 22, color: "#c0f497" },
  { name: "Miscellaneous", value: 18, color: "#36463d" },
];

// Chart dimensions
const W = 300;
const H = 165;
const CX = W / 2;
const CY = H;
const INNER = 88;
const OUTER = 118;

const ExpensesGauge: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="relative" style={{ width: W, height: H }}>
      <PieChart width={W} height={H + 10}>
        {/* Grey background arc */}
        <Pie
          data={[{ value: 1 }]}
          cx={CX}
          cy={CY}
          startAngle={180}
          endAngle={0}
          innerRadius={INNER}
          outerRadius={OUTER}
          dataKey="value"
          stroke="none"
          isAnimationActive={false}
        >
          <Cell fill="#2a2a2a" />
        </Pie>

        {/* Coloured segments */}
        <Pie
          data={segments}
          cx={CX}
          cy={CY}
          startAngle={180}
          endAngle={0}
          innerRadius={INNER}
          outerRadius={OUTER}
          dataKey="value"
          stroke="none"
          paddingAngle={2}
        >
          {segments.map((seg) => (
            <Cell key={seg.name} fill={seg.color} />
          ))}
        </Pie>
      </PieChart>

      {/* Centre label at the flat bottom edge of the arc */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white text-[28px] font-semibold font-inter leading-tight">$5476</p>
        <p className="text-ink-secondary text-[10px] font-normal font-inter mt-0.5">Spending This Week</p>
      </div>
    </div>

    {/* Legend */}
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-20">
      {segments.map((seg) => (
        <div key={seg.name} className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
          <span className="text-ink-secondary text-[10px] font-normal font-inter">{seg.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ExpensesGauge;
