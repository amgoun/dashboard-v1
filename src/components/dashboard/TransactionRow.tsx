import React, { useEffect, useRef, useState } from "react";
import type { Transaction } from "./types";

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function viewDetails() {
    window.alert(
      `Transaction Details\n\nMerchant: ${transaction.merchant}\nFund: ${transaction.fund}\nID: ${transaction.transactionId}\nAmount: ${transaction.amount}\nDate: ${transaction.date} ${transaction.time}`
    );
  }

  function downloadReceipt() {
    const receipt = [
      "Transaction Receipt",
      `Merchant: ${transaction.merchant}`,
      `Fund: ${transaction.fund}`,
      `Transaction ID: ${transaction.transactionId}`,
      `Amount: ${transaction.amount}`,
      `Date: ${transaction.date}`,
      `Time: ${transaction.time}`,
    ].join("\n");

    const url = URL.createObjectURL(new Blob([receipt], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${transaction.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copyTransactionId() {
    await navigator.clipboard.writeText(transaction.transactionId);
  }

  function handleAction(action: "view" | "download" | "repeat" | "copy") {
    if (action === "view") viewDetails();
    if (action === "download") downloadReceipt();
    if (action === "repeat") window.alert(`Repeat payment started for ${transaction.merchant}.`);
    if (action === "copy") void copyTransactionId();
    setMenuOpen(false);
  }

  return (
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
      <td ref={menuRef} className="relative py-3 pl-2">
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-[#5f6868] hover:text-white transition-colors"
          aria-label={`Open actions for ${transaction.merchant}`}
          aria-expanded={menuOpen}
        >
          <img
            src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729519630-node-3%3A779-1776729518178.png"
            alt=""
            className="w-4 h-4 object-contain"
          />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-9 z-40 w-[140px] overflow-hidden rounded-md border border-white/10 bg-[#1b1b1b] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <button type="button" onClick={() => handleAction("view")} className="block w-full px-3 py-2 text-left text-[11px] text-[#a1a1a1] hover:bg-white/[0.03] hover:text-white">
              View details
            </button>
            <button type="button" onClick={() => handleAction("download")} className="block w-full px-3 py-2 text-left text-[11px] text-[#a1a1a1] hover:bg-white/[0.03] hover:text-white">
              Download receipt
            </button>
            <button type="button" onClick={() => handleAction("repeat")} className="block w-full px-3 py-2 text-left text-[11px] text-[#a1a1a1] hover:bg-white/[0.03] hover:text-white">
              Repeat payment
            </button>
            <button type="button" onClick={() => handleAction("copy")} className="block w-full px-3 py-2 text-left text-[11px] text-[#28a263] hover:bg-[#28a263]/10">
              Copy ID
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;
