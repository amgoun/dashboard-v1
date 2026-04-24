import React from "react";
import { colors } from "./theme";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Dot,
} from "recharts";

const data = [
  { month: "Jan", value: 48 },
  { month: "Feb", value: 58 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 48 },
  { month: "May", value: 18 },
  { month: "Jun", value: 38 },
  { month: "Jul", value: 41 },
  { month: "Aug", value: 65 },
  { month: "Sep", value: 60 },
];

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-elevated border border-white/10 rounded px-3 py-2 text-center shadow-lg">
      <p className="text-white text-[13px] font-bold font-inter">$4,100</p>
      <p className="text-white/60 text-[10px] font-inter mt-0.5">Revenue from 28 sales</p>
    </div>
  );
};

const CustomDot: React.FC<{
  cx?: number;
  cy?: number;
}> = ({ cx, cy }) => (
  <circle
    cx={cx}
    cy={cy}
    r={4}
    fill="white"
    stroke={colors.brand}
    strokeWidth={2}
  />
);

const FinanceChart: React.FC = () => (
  <div className="w-full">
    <ResponsiveContainer width="100%" height={210}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="financeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={colors.brand} stopOpacity={0.25} />
            <stop offset="100%" stopColor={colors.brand} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray=""
          stroke="rgba(255,255,255,0.05)"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tick={{ fill: colors.inkSecondary, fontSize: 9, fontFamily: "Inter" }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />

        <YAxis
          domain={[0, 120]}
          ticks={[0, 20, 40, 60, 80, 100, 120]}
          tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 9, fontFamily: "Nunito" }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: colors.brand, strokeWidth: 1, strokeDasharray: "4 2" }}
        />

        {/* Vertical reference line at the tooltip point */}
        <ReferenceLine
          x="Jul"
          stroke={colors.brand}
          strokeWidth={1}
          strokeOpacity={0.7}
          strokeDasharray="4 2"
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke={colors.brand}
          strokeWidth={2}
          fill="url(#financeGradient)"
          dot={<CustomDot />}
          activeDot={{ r: 5, fill: "white", stroke: colors.brand, strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>

    <p className="text-ink-secondary text-[11px] font-normal font-inter text-center mt-2">
      Savings this month: +6.79%
    </p>
  </div>
);

export default FinanceChart;
