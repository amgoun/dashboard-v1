import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { transactions } from "./data";
import TransactionRow from "./TransactionRow";
import TimeRangeDropdown from "./TimeRangeDropdown";

interface TransactionsTableProps {
  searchQuery?: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ searchQuery = "" }) => {
  const q = searchQuery.toLowerCase().trim();

  const filtered = q
    ? transactions.filter(
        (tx) =>
          tx.merchant.toLowerCase().includes(q) ||
          tx.fund.toLowerCase().includes(q) ||
          tx.transactionId.toLowerCase().includes(q) ||
          tx.amount.toLowerCase().includes(q) ||
          tx.date.toLowerCase().includes(q)
      )
    : transactions;

  return (
    <div className="w-full h-full bg-surface-alt rounded-lg p-4 shadow-panel flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap shrink-0">
        <h2 className="text-ink-secondary text-base font-normal font-inter">My Transaction</h2>
        <div className="flex items-center gap-3">
          <span className="text-ink-muted text-[9.6px] font-normal font-inter hidden sm:block">
            Transaction Overview
          </span>
          <TimeRangeDropdown />
        </div>
      </div>

      {/* Scrollable table area */}
      <ScrollArea.Root className="flex-1 min-h-0 overflow-hidden relative">
        <ScrollArea.Viewport className="h-full w-full">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-ink-muted text-[12.8px] font-normal font-inter pb-2 pr-4">Date</th>
                <th className="text-left text-ink-muted text-[12.8px] font-normal font-inter pb-2 pr-4">Transaction Details</th>
                <th className="text-left text-ink-muted text-[12.8px] font-normal font-inter pb-2 pr-4 hidden sm:table-cell">Transaction ID</th>
                <th className="text-left text-ink-muted text-[12.8px] font-normal font-inter pb-2">Total Amount</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((tx) => <TransactionRow key={tx.id} transaction={tx} />)
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center">
                    <p className="text-ink-muted text-[12px] font-inter">
                      No transactions match{" "}
                      <span className="text-ink-secondary">"{searchQuery}"</span>
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea.Viewport>

        {/* Vertical scrollbar */}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="flex select-none touch-none py-1 px-0.5 w-[7px] transition-all duration-150 hover:w-[9px] data-[state=hidden]:opacity-0"
          style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-brand/40 hover:bg-brand/70 transition-colors before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:min-w-[20px] before:h-full before:min-h-[20px]" />
        </ScrollArea.Scrollbar>

        {/* Horizontal scrollbar */}
        <ScrollArea.Scrollbar
          orientation="horizontal"
          className="flex select-none touch-none flex-col px-1 py-0.5 h-[7px] transition-all duration-150 hover:h-[9px] data-[state=hidden]:opacity-0"
          style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-brand/40 hover:bg-brand/70 transition-colors before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:min-w-[20px] before:h-full before:min-h-[20px]" />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner className="bg-surface-alt" />
      </ScrollArea.Root>
    </div>
  );
};

export default TransactionsTable;
