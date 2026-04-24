import React from "react";
import DebitCard from "./DebitCard";
import QuickTransfer from "./QuickTransfer";
import CardPaymentForm from "./CardPaymentForm";
import TimeRangeDropdown from "./TimeRangeDropdown";

const CardPanel: React.FC = () => (
  <div className="w-full h-full bg-[#1d1d1d] rounded-lg p-7 shadow-[0_4.3px_5px_rgba(176,176,176,0.05)] flex flex-col gap-5">
    <div className="flex items-center justify-between">
      <h2 className="text-[#a1a1a1] text-base font-normal font-inter">My Card</h2>
      <TimeRangeDropdown
        defaultValue="Recent"
        options={["Recent", "Oldest", "Highest Balance", "Lowest Balance"]}
      />
    </div>

    <DebitCard />

    <div className="flex justify-between items-start">
      <div>
        <p className="text-[#a1a1a1] text-[11.2px] font-normal font-inter uppercase tracking-[-0.02em]">Balance</p>
        <p className="text-white text-base font-normal font-inter mt-0.5">$101,291.12</p>
      </div>
      <div className="text-right">
        <p className="text-[#a1a1a1] text-[9.6px] font-normal font-inter uppercase tracking-[-0.02em]">Gains/Losses</p>
        <div className="bg-[#242424] rounded px-2 py-0.5 mt-0.5 inline-block">
          <span className="text-[#ff4e3c] text-[8px] font-normal font-plus-jakarta">$45264800</span>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10" />

    <div>
      <p className="text-[#a1a1a1] text-sm font-normal font-inter">Quick Transfer</p>
      <QuickTransfer />
    </div>

    <CardPaymentForm />
  </div>
);

export default CardPanel;
