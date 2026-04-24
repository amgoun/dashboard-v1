import React, { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { PageWrapper, PageHeader, StatCard, SectionHeader, FilterTabs, LegendItem, ChartTooltip } from "../shared";
import { colors } from "../theme";

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
  { name: "Organic", value: 38, color: colors.brand   },
  { name: "Referral", value: 24, color: "#8b5cf6"      },
  { name: "Social",   value: 20, color: "#f59e0b"      },
  { name: "Direct",   value: 18, color: colors.inkMuted },
];

const topProducts = [
  { name: "Pro Membership",  sales: 186, revenue: "$55,614" },
  { name: "Team Bundle",     sales: 64,  revenue: "$51,136" },
  { name: "Analytics Suite", sales: 112, revenue: "$16,688" },
  { name: "Starter Plan",    sales: 243, revenue: "$11,907" },
  { name: "Enterprise Plan", sales: 18,  revenue: "$35,982" },
];

const topProductsChart = topProducts.map((p) => ({ name: p.name.split(" ")[0], sales: p.sales }));

const kpis = [
  { label: "Total Revenue",    value: "$171,327", delta: "+18.4%", deltaLabel: "This month",    positive: true  },
  { label: "Active Users",     value: "4,821",    delta: "+9.2%",  deltaLabel: "vs last month", positive: true  },
  { label: "Conversion Rate",  value: "3.6%",     delta: "+0.4%",  deltaLabel: "vs last month", positive: true  },
  { label: "Avg. Order Value", value: "$248",     delta: "-2.1%",  deltaLabel: "vs last month", positive: false },
];

type Range = "7D" | "1M" | "6M" | "1Y";
const RANGES: Range[] = ["7D", "1M", "6M", "1Y"];

const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState<Range>("6M");

  return (
    <PageWrapper>
      <PageHeader
        title="Analytics"
        subtitle="Performance overview and key metrics"
        right={
          <FilterTabs
            tabs={RANGES.map((r) => ({ label: r }))}
            active={range}
            onChange={(r) => setRange(r as Range)}
            raised
          />
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <StatCard key={k.label} {...k} />
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-surface-card rounded-card p-5 shadow-panel">
        <SectionHeader
          title="Revenue vs Expenses"
          right={
            <div className="flex items-center gap-4">
              <LegendItem color={colors.brand}   label="Revenue"  shape="line" />
              <LegendItem color={colors.inkMuted} label="Expenses" shape="line" />
            </div>
          }
        />
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={colors.brand}   stopOpacity={0.25} />
                <stop offset="95%" stopColor={colors.brand}   stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={colors.inkMuted} stopOpacity={0.2} />
                <stop offset="95%" stopColor={colors.inkMuted} stopOpacity={0}   />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: colors.inkMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              content={(props) => (
                <ChartTooltip
                  active={props.active}
                  payload={props.payload as any}
                  label={props.label}
                  formatter={(v) => `$${v.toLocaleString()}`}
                />
              )}
            />
            <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke={colors.brand}    strokeWidth={2} fill="url(#revGrad)" dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke={colors.inkMuted} strokeWidth={2} fill="url(#expGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Traffic Sources */}
        <div className="lg:col-span-2 bg-surface-card rounded-card p-5 shadow-panel">
          <SectionHeader title="Traffic Sources" />
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={trafficData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                  {trafficData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2.5">
              {trafficData.map((item) => (
                <LegendItem key={item.name} color={item.color} label={item.name} value={`${item.value}%`} />
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-3 bg-surface-alt rounded-card p-5 shadow-panel">
          <SectionHeader title="Top Products by Sales" />
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={topProductsChart} barSize={28}>
                <XAxis dataKey="name" tick={{ fill: colors.inkMuted, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  content={(props) => (
                    <ChartTooltip
                      active={props.active}
                      payload={props.payload as any}
                      label={props.label}
                      formatter={(v) => `${v} sales`}
                    />
                  )}
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                />
                <Bar dataKey="sales" fill={colors.brand} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-ink-muted text-[10px] w-4">{i + 1}</span>
                <span className="text-ink-secondary text-[11px] flex-1 truncate">{p.name}</span>
                <span className="text-ink-muted text-[10px]">{p.sales} sales</span>
                <span className="text-white text-[11px] font-medium w-20 text-right">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AnalyticsPage;
