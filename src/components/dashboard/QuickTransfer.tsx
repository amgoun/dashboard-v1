import React from "react";

const avatars = [
  "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518692-node-3%3A823-1776729517104.png",
  "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518656-node-3%3A840-1776729517143.png",
  "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518706-node-3%3A841-1776729517157.png",
];

const QuickTransfer: React.FC = () => (
  <div className="flex items-center gap-2 mt-2">
    <div className="w-[37px] h-[37px] rounded-lg border border-brand flex items-center justify-center shrink-0">
      <span className="text-brand text-[19px] font-light font-inter leading-none">+</span>
    </div>
    {avatars.map((src, i) => (
      <div key={i} className="w-[37px] h-[37px] bg-surface-icon rounded-lg overflow-hidden shrink-0">
        <img src={src} alt="Contact avatar" className="w-full h-full object-cover" />
      </div>
    ))}
    <div className="w-[14px] h-[14px] bg-surface-icon rounded-full flex items-center justify-center shrink-0">
      <img
        src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729519629-node-3%3A844-1776729518187.png"
        alt="more"
        className="w-3 h-3 object-contain"
      />
    </div>
  </div>
);

export default QuickTransfer;
