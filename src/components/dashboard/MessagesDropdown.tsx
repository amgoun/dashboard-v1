import React from "react";

interface Message {
  id: string;
  name: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
}

const messages: Message[] = [
  {
    id: "1",
    name: "Cameron Williamson",
    avatar: "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518692-node-3%3A823-1776729517104.png",
    preview: "Hey! Your last transfer was successful 🎉",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    name: "Support Team",
    avatar: "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518656-node-3%3A840-1776729517143.png",
    preview: "Your account verification is complete.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "3",
    name: "Alex Johnson",
    avatar: "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518706-node-3%3A841-1776729517157.png",
    preview: "Can you send me the invoice for June?",
    time: "3 hr ago",
    unread: false,
  },
  {
    id: "4",
    name: "Cameron Williamson",
    avatar: "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518692-node-3%3A823-1776729517104.png",
    preview: "Thanks for the quick response!",
    time: "Yesterday",
    unread: false,
  },
];

const MessagesDropdown: React.FC = () => (
  <div className="absolute right-0 top-full mt-2 w-[300px] bg-surface-card rounded-xl shadow-dropdown border border-white/5 z-50 overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
      <h3 className="text-white text-[13px] font-semibold font-inter">Messages</h3>
      <span className="bg-brand/20 text-brand text-[9px] font-inter font-medium px-2 py-0.5 rounded-full">
        2 new
      </span>
    </div>

    {/* Message list */}
    <ul>
      {messages.map((msg) => (
        <li
          key={msg.id}
          className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-white/5 ${
            msg.unread ? "bg-brand/5" : ""
          }`}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={msg.avatar}
              alt={msg.name}
              className="w-9 h-9 rounded-lg object-cover"
            />
            {msg.unread && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand rounded-full border-2 border-surface-card" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className={`text-[12px] font-inter truncate ${msg.unread ? "text-white font-medium" : "text-ink-secondary"}`}>
                {msg.name}
              </p>
              <span className="text-ink-muted text-[9px] font-inter shrink-0">{msg.time}</span>
            </div>
            <p className="text-ink-muted text-[10.5px] font-inter mt-0.5 truncate">{msg.preview}</p>
          </div>
        </li>
      ))}
    </ul>

    {/* Footer */}
    <div className="px-4 py-3 border-t border-white/5">
      <button className="w-full text-center text-brand text-[11px] font-inter hover:opacity-75 transition-colors">
        View all messages
      </button>
    </div>
  </div>
);

export default MessagesDropdown;
