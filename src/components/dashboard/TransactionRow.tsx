import React from "react";
import type { Transaction } from "./types";

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
  <tr className="border-b border-white/5 last:border-none">
    <td className="py-3 pr-4 min-w-[90px]">
      <p className="text-[#737b7b] text-[11.2px] font-normal font-inter leading-tight">{transaction.date}</p>
      <p className="text-[#d0d0d0] text-[9.6px] font-normal font-inter leading-tight">{transaction.time}</p>
    </td>
    <td className="py-3 pr-4">
      <div className="flex items-center gap-2">
        <div className="w-[29px] h-[28px] bg-[#303030] rounded-md flex items-center justify-center shrink-0">
          <img src={transaction.iconUrl} alt={transaction.merchant} className="w-4 h-4 object-contain" />
        </div>
        <div>
          <p className="text-[#686f6f] text-[12px] font-normal font-inter leading-tight">{transaction.merchant}</p>
          <p className="text-[#c9c9c9] text-[9.6px] font-normal font-inter leading-tight">{transaction.fund}</p>
        </div>
      </div>
    </td>
    <td className="py-3 pr-4 hidden sm:table-cell">
      <p className="text-[#737b7b] text-[11.2px] font-normal font-inter">{transaction.transactionId}</p>
    </td>
    <td className="py-3">
      <div className="bg-[#242424] rounded px-2 py-1 inline-block min-w-[80px] text-center">
        <span className={`text-[11.2px] font-normal font-inter ${transaction.isNegative ? "text-[#ff4e3c]" : "text-[#28a263]"}`}>
          {transaction.amount}
        </span>
      </div>
    </td>
    <td className="py-3 pl-2">
      <button className="text-[#5f6868] hover:text-white transition-colors">
        <img
          src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729519630-node-3%3A779-1776729518178.png"
          alt="more options"
          className="w-4 h-4 object-contain"
        />
      </button>
    </td>
  </tr>
);

export default TransactionRow;
