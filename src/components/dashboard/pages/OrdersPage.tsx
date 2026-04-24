import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  { id: "#ORD-8821", customer: "James Carter", product: "Pro Membership", date: "Apr 22, 2026", amount: "$299.00", status: "Completed" },
  { id: "#ORD-8820", customer: "Sophia Reed", product: "Analytics Suite", date: "Apr 22, 2026", amount: "$149.00", status: "Processing" },
  { id: "#ORD-8819", customer: "Liam Torres", product: "Starter Plan", date: "Apr 21, 2026", amount: "$49.00", status: "Pending" },
  { id: "#ORD-8818", customer: "Olivia Grant", product: "Pro Membership", date: "Apr 21, 2026", amount: "$299.00", status: "Completed" },
  { id: "#ORD-8817", customer: "Noah Bennett", product: "Team Bundle", date: "Apr 20, 2026", amount: "$799.00", status: "Cancelled" },
  { id: "#ORD-8816", customer: "Emma Hayes", product: "Analytics Suite", date: "Apr 20, 2026", amount: "$149.00", status: "Completed" },
  { id: "#ORD-8815", customer: "Aiden Brooks", product: "Starter Plan", date: "Apr 19, 2026", amount: "$49.00", status: "Processing" },
  { id: "#ORD-8814", customer: "Ava Collins", product: "Team Bundle", date: "Apr 19, 2026", amount: "$799.00", status: "Completed" },
];

type FilterTab = "All" | "Pending" | "Processing" | "Completed" | "Cancelled";

const statusColor: Record<string, string> = {
  Completed: "text-[#28a263] bg-[#28a263]/10",
  Processing: "text-[#f59e0b] bg-[#f59e0b]/10",
  Pending: "text-[#a1a1a1] bg-white/5",
  Cancelled: "text-[#ff4e3c] bg-[#ff4e3c]/10",
};

const stats = [
  { label: "Total Orders", value: "248", delta: "+12%", up: true },
  { label: "Pending", value: "42", delta: "-3%", up: false },
  { label: "Completed", value: "186", delta: "+18%", up: true },
  { label: "Cancelled", value: "20", delta: "-2%", up: false },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1b1b1b] border border-white/10 rounded-lg px-3 py-2 text-[11px] font-inter">
        <p className="text-[#a1a1a1]">{label}</p>
        <p className="text-[#28a263] font-semibold">{payload[0].value} orders</p>
      </div>
    );
  }
  return null;
};

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filtered =
    activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

  const tabs: FilterTab[] = ["All", "Pending", "Processing", "Completed", "Cancelled"];

  return (
    <div className="px-4 sm:px-8 pb-8 space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold font-inter">Orders</h1>
          <p className="text-[#a1a1a1] text-[12.8px] font-inter mt-0.5">Track and manage all customer orders</p>
        </div>
        <button className="flex items-center gap-2 bg-[#28a263] hover:bg-[#23935a] transition-colors text-white text-[12px] font-inter font-medium px-4 py-2 rounded-[7px]">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Order
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#1b1b1b] rounded-[7px] p-4 shadow-[0_3.5px_44px_rgba(176,176,176,0.05)]"
          >
            <p className="text-[#a1a1a1] text-[11px] font-inter mb-1">{s.label}</p>
            <p className="text-white text-2xl font-semibold font-inter">{s.value}</p>
            <p className={`text-[10px] font-inter mt-1 ${s.up ? "text-[#28a263]" : "text-[#ff4e3c]"}`}>
              {s.delta} <span className="text-[#5f6868]">vs last week</span>
            </p>
          </div>
        ))}
      </div>

      {/* Chart + summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#1b1b1b] rounded-[7px] p-5 shadow-[0_3.5px_44px_rgba(176,176,176,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#a1a1a1] text-sm font-inter">Order Volume</h2>
            <div className="flex items-center gap-1 border border-white/20 rounded px-2 py-1">
              <span className="text-[#28a263] text-[8.8px] font-plus-jakarta">This Week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={orderVolumeData} barSize={24}>
              <XAxis dataKey="day" tick={{ fill: "#5f6868", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="orders" fill="#28a263" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1b1b1b] rounded-[7px] p-5 shadow-[0_3.5px_44px_rgba(176,176,176,0.05)] flex flex-col gap-4">
          <h2 className="text-[#a1a1a1] text-sm font-inter">Order Status</h2>
          {[
            { label: "Completed", pct: 75, color: "#28a263" },
            { label: "Processing", pct: 17, color: "#f59e0b" },
            { label: "Pending", pct: 5, color: "#a1a1a1" },
            { label: "Cancelled", pct: 8, color: "#ff4e3c" },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-[11px] font-inter mb-1">
                <span className="text-[#a1a1a1]">{s.label}</span>
                <span style={{ color: s.color }}>{s.pct}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-[#1d1d1d] rounded-[7px] p-5 shadow-[0_3.5px_44px_rgba(176,176,176,0.05)]">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded text-[11px] font-inter transition-colors ${
                  activeTab === tab
                    ? "bg-[#28a263] text-white"
                    : "text-[#a1a1a1] hover:text-white bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="text-[#5f6868] text-[10px] font-inter">
            {filtered.length} order{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr className="border-b border-white/5">
                {["Order ID", "Customer", "Product", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-left text-[#5f6868] text-[11px] font-inter font-normal pb-2 pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4 text-[#28a263] text-[11.5px] font-inter">{order.id}</td>
                  <td className="py-3 pr-4 text-white text-[11.5px] font-inter">{order.customer}</td>
                  <td className="py-3 pr-4 text-[#a1a1a1] text-[11.5px] font-inter">{order.product}</td>
                  <td className="py-3 pr-4 text-[#5f6868] text-[11.5px] font-inter">{order.date}</td>
                  <td className="py-3 pr-4 text-white text-[11.5px] font-inter font-medium">{order.amount}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-inter px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
