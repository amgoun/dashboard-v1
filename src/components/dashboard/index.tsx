import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ExpensesGauge from "./ExpensesGauge";
import FinanceChart from "./FinanceChart";
import TransactionsTable from "./TransactionsTable";
import CardPanel from "./CardPanel";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex w-full min-h-screen bg-[#141414] font-inter">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — drawer on mobile, always visible on lg+ */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-30 transition-transform duration-300
          lg:static lg:translate-x-0 lg:z-auto lg:h-auto lg:self-stretch
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        <TopBar
          onMenuOpen={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/*
          3-column grid:
            col 1 — My Expenses  (row 1)
            col 2 — My Finance   (row 1)
            col 3 — My Card      (rows 1–2)
            col 1-2 — My Transaction table (row 2)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 sm:px-8 pb-8 flex-1">

          {/* My Expenses — col 1, row 1 */}
          <div className="bg-[#1b1b1b] rounded-[7px] p-6 shadow-[0_3.5px_44px_rgba(176,176,176,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#a1a1a1] text-lg font-normal font-inter">My Expenses</h2>
              <div className="flex items-center gap-1 border border-white/30 rounded px-2 py-1">
                <span className="text-[#28a263] text-[8.8px] font-normal font-plus-jakarta">Last 7 Days</span>
                <img
                  src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729519591-node-3%3A641-1776729518170.png"
                  alt="dropdown"
                  className="w-2 h-2 object-contain"
                />
              </div>
            </div>
            <ExpensesGauge />
          </div>

          {/* My Finance — col 2, row 1 */}
          <div className="bg-[#1d1d1d] rounded-[7px] p-6 shadow-[0_3.5px_44px_rgba(176,176,176,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#a1a1a1] text-lg font-normal font-inter">My Finance</h2>
              <div className="flex items-center gap-1 border border-white/30 rounded px-2 py-1">
                <span className="text-[#28a263] text-[8.8px] font-normal font-plus-jakarta">Last 7 Days</span>
                <img
                  src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729519697-node-3%3A648-1776729518170.png"
                  alt="dropdown"
                  className="w-2 h-2 object-contain"
                />
              </div>
            </div>
            <FinanceChart />
          </div>

          {/* My Card — col 3, spans rows 1 & 2 */}
          <div className="lg:row-span-2 lg:col-start-3">
            <CardPanel />
          </div>

          {/* My Transaction — col 1-2, row 2 */}
          <div className="lg:col-span-2">
            <TransactionsTable searchQuery={searchQuery} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
