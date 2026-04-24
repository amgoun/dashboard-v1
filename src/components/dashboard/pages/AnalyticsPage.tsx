import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Oct", revenue: 28000, expenses: 18000 },
  { month: "Nov", revenue: 34000, expenses: 22000 },
  { month: "Dec", revenue: 41000, expenses: 27000 },
  { month: "Jan", revenue: 38000, expenses: 24000 },
  { month: "Feb", revenue: 45000, expenses: 29000 },
  { month: "Mar", revenue: 52000, expenses: 31000 },
  { month: "Apr", revenue: 61000, expenses: 35000 },
];

const trafficData = [
  { name: "Organic", value: 38, color: "#28a263" },
  { name: "Referral", value: 24, color: "#8b5cf6" },
  { name: "Social", value: 20, color: "#f59e0b" },
  { name: "Direct", value: 18, color: "#5f6868" },
];

const topProducts = [
  { name: "Pro Membership", sales: 186, revenue: "$55,614" },
  { name: "Team Bundle", sales: 64, revenue: "$51,136" },
  { name: "Analytics Suite", sales: 112, revenue: "$16,688" },
  { name: "Starter Plan", sales: 243, revenue: "$11,907" },
  { name: "Enterprise Plan", sales: 18, revenue: "$35,982" },
];

const topProductsChart = [
  { name: "Pro", sales: 186 },
  { name: "Team", sales: 64 },
  { name: "Analytics", sales: 112 },
  { name: "Starter", sales: 243 },
  { name: "Enterprise", sales: 18 },
];

const kpis = [
  { label: "Total Revenue", value: "$171,327", delta: "+18.4%", up: true, sub: "This month" },
  { label: "Active Users", value: "4,821", delta: "+9.2%", up: true, sub: "vs last month" },
  { label: "Conversion Rate", value: "3.6%", delta: "+0.4%", up: true, sub: "vs last month" },
  { label: "Avg. Order Value", value: "$248", delta: "-2.1%", up: false, sub: "vs last month" },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1b1b1b] border border-white/10 rounded-lg px-3 py-2 text-[11px] font-inter space-y-1">
        <p className="text-[#5f6868]">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <span className="font-semibold">${p.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type Range = "7D" | "1M" | "6M" | "1Y";

const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState<Range>("6M");

  return (
    <div className="px-4 sm:px-8 pb-8 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold font-inter">Analytics</h1>
          <p className="text-[#a1a1a1] text-[12.8px] font-inter mt-0.5">Performance overview and key metrics</p>
        </div>
        <div className="flex items-center gap-1 bg-[#1b1b1b] rounded-[7px] p-1">
          {(["7D", "1M", "6M", "1Y"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded text-[11px] font-inter transition-colors ${
                range === r ? "bg-[#28a263] text-white" : "text-[#a1a1a1] hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#1b1b1b] rounded-[7px] p-4 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)]">
            <p className="text-[#a1a1a1] text-[11px] font-inter mb-1">{k.label}</p>
            <p className="text-white text-2xl font-semibold font-inter">{k.value}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[10px] font-inter font-medium ${k.up ? "text-[#28a263]" : "text-[#ff4e3c]"}`}>
                {k.delta}
              </span>
              <span className="text-[#5f6868] text-[10px] font-inter">{k.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-[#1b1b1b] rounded-[7px] p-5 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)]">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-[#a1a1a1] text-sm font-inter">Revenue vs Expenses</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#28a263] rounded-full" />
              <span className="text-[#a1a1a1] text-[10px] font-inter">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#5f6868] rounded-full" />
              <span className="text-[#a1a1a1] text-[10px] font-inter">Expenses</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#28a263" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#28a263" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5f6868" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#5f6868" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "#5f6868", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#28a263" strokeWidth={2} fill="url(#revGrad)" dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#5f6868" strokeWidth={2} fill="url(#expGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Traffic Sources Donut */}
        <div className="lg:col-span-2 bg-[#1b1b1b] rounded-[7px] p-5 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)]">
          <h2 className="text-[#a1a1a1] text-sm font-inter mb-4">Traffic Sources</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2.5">
              {trafficData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[#a1a1a1] text-[11px] font-inter">{item.name}</span>
                  <span className="text-white text-[11px] font-inter font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-3 bg-[#1d1d1d] rounded-[7px] p-5 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#a1a1a1] text-sm font-inter">Top Products by Sales</h2>
          </div>

          <div className="mb-4">
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={topProductsChart} barSize={28}>
                <XAxis dataKey="name" tick={{ fill: "#5f6868", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="bg-[#1b1b1b] border border-white/10 rounded px-2 py-1 text-[10px] font-inter">
                        <p className="text-[#a1a1a1]">{label}</p>
                        <p className="text-[#28a263] font-semibold">{payload[0].value} sales</p>
                      </div>
                    ) : null
                  }
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                />
                <Bar dataKey="sales" fill="#28a263" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-[#5f6868] text-[10px] font-inter w-4">{i + 1}</span>
                <span className="text-[#a1a1a1] text-[11px] font-inter flex-1 truncate">{p.name}</span>
                <span className="text-[#5f6868] text-[10px] font-inter">{p.sales} sales</span>
                <span className="text-white text-[11px] font-inter font-medium w-20 text-right">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
