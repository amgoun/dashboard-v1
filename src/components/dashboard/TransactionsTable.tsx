import React from "react";
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
    <div className="w-full h-full bg-[#1d1d1d] rounded-lg p-4 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)] overflow-auto">
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h2 className="text-[#a1a1a1] text-base font-normal font-inter">My Transaction</h2>
        <div className="flex items-center gap-3">
          <span className="text-[#5f6868] text-[9.6px] font-normal font-inter hidden sm:block">
            Transaction Overview
          </span>
          <TimeRangeDropdown />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-[#5f6868] text-[12.8px] font-normal font-inter pb-2 pr-4">Date</th>
              <th className="text-left text-[#5f6868] text-[12.8px] font-normal font-inter pb-2 pr-4">Transaction Details</th>
              <th className="text-left text-[#5f6868] text-[12.8px] font-normal font-inter pb-2 pr-4 hidden sm:table-cell">Transaction ID</th>
              <th className="text-left text-[#5f6868] text-[12.8px] font-normal font-inter pb-2">Total Amount</th>
              <th className="pb-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((tx) => <TransactionRow key={tx.id} transaction={tx} />)
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <p className="text-[#5f6868] text-[12px] font-inter">
                    No transactions match{" "}
                    <span className="text-[#a1a1a1]">"{searchQuery}"</span>
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
