import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ExpensesGauge from "./ExpensesGauge";
import FinanceChart from "./FinanceChart";
import TransactionsTable from "./TransactionsTable";
import CardPanel from "./CardPanel";
import TimeRangeDropdown from "./TimeRangeDropdown";
import OrdersPage from "./pages/OrdersPage";
import SchedulesPage from "./pages/SchedulesPage";
import MessagesPage from "./pages/MessagesPage";
import InboxPage from "./pages/InboxPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NewsPage from "./pages/NewsPage";
import SettingsPage from "./pages/SettingsPage";

type Page = "Dashboard" | "Orders" | "Schedules" | "Messages" | "Inbox" | "Analytics" | "News" | "Settings";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState<Page>("Dashboard");

  function handleNavigate(label: string) {
    setActivePage(label as Page);
    setSearchQuery("");
  }

  return (
    <div className="flex w-full min-h-screen bg-surface-page font-inter">
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
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          activePage={activePage}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        <TopBar
          onMenuOpen={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {activePage === "Dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 sm:px-8 pb-8 flex-1">

            {/* My Expenses — col 1, row 1 */}
            <div className="bg-surface-card rounded-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-ink-secondary text-lg font-normal font-inter">My Expenses</h2>
                <TimeRangeDropdown />
              </div>
              <ExpensesGauge />
            </div>

            {/* My Finance — col 2, row 1 */}
            <div className="bg-surface-alt rounded-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-ink-secondary text-lg font-normal font-inter">My Finance</h2>
                <TimeRangeDropdown />
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
        )}

        {activePage === "Orders" && <OrdersPage />}
        {activePage === "Schedules" && <SchedulesPage />}
        {activePage === "Messages" && <MessagesPage />}
        {activePage === "Inbox" && <InboxPage />}
        {activePage === "Analytics" && <AnalyticsPage />}
        {activePage === "News" && <NewsPage />}
        {activePage === "Settings" && <SettingsPage />}
      </main>
    </div>
  );
};

export default Dashboard;
