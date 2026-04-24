import React from "react";
import DebitCard from "./DebitCard";
import QuickTransfer from "./QuickTransfer";
import CardPaymentForm from "./CardPaymentForm";
import TimeRangeDropdown from "./TimeRangeDropdown";

const CardPanel: React.FC = () => (
  <div className="w-full h-full bg-surface-alt rounded-lg p-7 shadow-card flex flex-col gap-5">
    <div className="flex items-center justify-between">
      <h2 className="text-ink-secondary text-base font-normal font-inter">My Card</h2>
      <TimeRangeDropdown
        defaultValue="Recent"
        options={["Recent", "Oldest", "Highest Balance", "Lowest Balance"]}
      />
    </div>

    <DebitCard />

    <div className="flex justify-between items-start">
      <div>
        <p className="text-ink-secondary text-[11.2px] font-normal font-inter uppercase tracking-[-0.02em]">Balance</p>
        <p className="text-white text-base font-normal font-inter mt-0.5">$101,291.12</p>
      </div>
      <div className="text-right">
        <p className="text-ink-secondary text-[9.6px] font-normal font-inter uppercase tracking-[-0.02em]">Gains/Losses</p>
        <div className="bg-surface-hover rounded px-2 py-0.5 mt-0.5 inline-block">
          <span className="text-danger text-[8px] font-normal font-plus-jakarta">$45264800</span>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10" />

    <div>
      <p className="text-ink-secondary text-sm font-normal font-inter">Quick Transfer</p>
      <QuickTransfer />
    </div>

    <CardPaymentForm />
  </div>
);

export default CardPanel;
