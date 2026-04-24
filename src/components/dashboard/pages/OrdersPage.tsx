import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  PageWrapper, PageHeader, StatCard, FilterTabs,
  SectionHeader, StatusBadge, ChartTooltip,
} from "../shared";
import { colors } from "../theme";

const orderVolumeData = [
  { day: "Mon", orders: 34 },
  { day: "Tue", orders: 52 },
  { day: "Wed", orders: 41 },
  { day: "Thu", orders: 67 },
  { day: "Fri", orders: 58 },
  { day: "Sat", orders: 29 },
  { day: "Sun", orders: 18 },
];

const orders = [
  { id: "#ORD-8821", customer: "James Carter",  product: "Pro Membership",   date: "Apr 22, 2026", amount: "$299.00", status: "Completed"  },
  { id: "#ORD-8820", customer: "Sophia Reed",   product: "Analytics Suite",  date: "Apr 22, 2026", amount: "$149.00", status: "Processing" },
  { id: "#ORD-8819", customer: "Liam Torres",   product: "Starter Plan",     date: "Apr 21, 2026", amount: "$49.00",  status: "Pending"    },
  { id: "#ORD-8818", customer: "Olivia Grant",  product: "Pro Membership",   date: "Apr 21, 2026", amount: "$299.00", status: "Completed"  },
  { id: "#ORD-8817", customer: "Noah Bennett",  product: "Team Bundle",      date: "Apr 20, 2026", amount: "$799.00", status: "Cancelled"  },
  { id: "#ORD-8816", customer: "Emma Hayes",    product: "Analytics Suite",  date: "Apr 20, 2026", amount: "$149.00", status: "Completed"  },
  { id: "#ORD-8815", customer: "Aiden Brooks",  product: "Starter Plan",     date: "Apr 19, 2026", amount: "$49.00",  status: "Processing" },
  { id: "#ORD-8814", customer: "Ava Collins",   product: "Team Bundle",      date: "Apr 19, 2026", amount: "$799.00", status: "Completed"  },
];

const statusColor: Record<string, string> = {
  Completed:  "text-brand bg-brand/10",
  Processing: "text-[#f59e0b] bg-[#f59e0b]/10",
  Pending:    "text-ink-secondary bg-white/5",
  Cancelled:  "text-danger bg-danger/10",
};

const stats = [
  { label: "Total Orders", value: "248", delta: "+12%", deltaLabel: "vs last week", positive: true  },
  { label: "Pending",      value: "42",  delta: "-3%",  deltaLabel: "vs last week", positive: false },
  { label: "Completed",    value: "186", delta: "+18%", deltaLabel: "vs last week", positive: true  },
  { label: "Cancelled",    value: "20",  delta: "-2%",  deltaLabel: "vs last week", positive: false },
];

const statusBreakdown = [
  { label: "Completed",  pct: 75, color: colors.brand   },
  { label: "Processing", pct: 17, color: "#f59e0b"       },
  { label: "Pending",    pct: 5,  color: colors.inkSecondary },
  { label: "Cancelled",  pct: 8,  color: colors.danger   },
];

const TABS = ["All", "Pending", "Processing", "Completed", "Cancelled"];

const PlusIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <PageWrapper>
      <PageHeader
        title="Orders"
        subtitle="Track and manage all customer orders"
        action={{ label: "New Order", icon: <PlusIcon />, onClick: () => {} }}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Chart + summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-surface-card rounded-card p-5 shadow-panel">
          <SectionHeader
            title="Order Volume"
            right={
              <div className="flex items-center gap-1 border border-white/20 rounded px-2 py-1">
                <span className="text-brand text-[8.8px] font-plus-jakarta">This Week</span>
              </div>
            }
          />
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={orderVolumeData} barSize={24}>
              <XAxis dataKey="day" tick={{ fill: colors.inkMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                content={(props) => (
                  <ChartTooltip
                    active={props.active}
                    payload={props.payload as any}
                    label={props.label}
                    formatter={(v) => `${v} orders`}
                  />
                )}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="orders" fill={colors.brand} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-card p-5 shadow-panel flex flex-col gap-4">
          <SectionHeader title="Order Status" className="mb-0" />
          {statusBreakdown.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-ink-secondary">{s.label}</span>
                <span style={{ color: s.color }}>{s.pct}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-surface-alt rounded-card p-5 shadow-panel">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <FilterTabs tabs={TABS.map((t) => ({ label: t }))} active={activeTab} onChange={setActiveTab} />
          <span className="text-ink-muted text-[10px]">{filtered.length} order{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr className="border-b border-white/5">
                {["Order ID", "Customer", "Product", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-left text-ink-muted text-[11px] font-normal pb-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4 text-brand text-[11.5px]">{order.id}</td>
                  <td className="py-3 pr-4 text-white text-[11.5px]">{order.customer}</td>
                  <td className="py-3 pr-4 text-ink-secondary text-[11.5px]">{order.product}</td>
                  <td className="py-3 pr-4 text-ink-muted text-[11.5px]">{order.date}</td>
                  <td className="py-3 pr-4 text-white text-[11.5px] font-medium">{order.amount}</td>
                  <td className="py-3">
                    <StatusBadge label={order.status} colorClass={statusColor[order.status]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrdersPage;
