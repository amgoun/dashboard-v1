import React, { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "Sophia Reed",
    avatar: "SR",
    avatarColor: "#28a263",
    preview: "Hey, did you check the latest report?",
    time: "2m ago",
    unread: 3,
    online: true,
    messages: [
      { from: "them", text: "Hey! I just sent you the Q2 analytics report.", time: "10:12 AM" },
      { from: "me", text: "Got it, reviewing now. Looks solid!", time: "10:15 AM" },
      { from: "them", text: "Great. Let me know if you need clarifications.", time: "10:16 AM" },
      { from: "me", text: "Will do. Thanks Sophia 👍", time: "10:20 AM" },
      { from: "them", text: "Hey, did you check the latest report?", time: "10:45 AM" },
    ],
  },
  {
    id: 2,
    name: "James Carter",
    avatar: "JC",
    avatarColor: "#8b5cf6",
    preview: "The deployment went smooth ✅",
    time: "14m ago",
    unread: 0,
    online: true,
    messages: [
      { from: "them", text: "We pushed the new build to staging.", time: "09:30 AM" },
      { from: "me", text: "Any issues?", time: "09:32 AM" },
      { from: "them", text: "The deployment went smooth ✅", time: "09:35 AM" },
    ],
  },
  {
    id: 3,
    name: "Emma Hayes",
    avatar: "EH",
    avatarColor: "#f59e0b",
    preview: "Can we reschedule to 3pm?",
    time: "1h ago",
    unread: 1,
    online: false,
    messages: [
      { from: "me", text: "Meeting still at 2pm?", time: "08:00 AM" },
      { from: "them", text: "Can we reschedule to 3pm?", time: "08:45 AM" },
    ],
  },
  {
    id: 4,
    name: "Noah Bennett",
    avatar: "NB",
    avatarColor: "#ff4e3c",
    preview: "Invoice #4421 is ready for review",
    time: "3h ago",
    unread: 0,
    online: false,
    messages: [
      { from: "them", text: "Invoice #4421 is ready for review", time: "Yesterday" },
      { from: "me", text: "Thanks, will approve shortly.", time: "Yesterday" },
    ],
  },
  {
    id: 5,
    name: "Liam Torres",
    avatar: "LT",
    avatarColor: "#28a263",
    preview: "Onboarding docs attached 📎",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { from: "them", text: "Onboarding docs attached 📎", time: "Yesterday" },
    ],
  },
];

const MessagesPage: React.FC = () => {
  const [selected, setSelected] = useState(conversations[0]);
  const [input, setInput] = useState("");
  const [chatMap, setChatMap] = useState<Record<number, typeof conversations[0]["messages"]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );

  function sendMessage() {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMap((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), { from: "me", text: input.trim(), time }],
    }));
    setInput("");
  }

  const messages = chatMap[selected.id] || [];

  return (
    <div className="px-4 sm:px-8 pb-8 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-white text-xl font-semibold font-inter">Messages</h1>
        <p className="text-[#a1a1a1] text-[12.8px] font-inter mt-0.5">Chat with your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ height: "calc(100vh - 220px)", minHeight: 480 }}>
        {/* Conversation list */}
        <div className="bg-[#1b1b1b] rounded-[7px] shadow-[0_3.5px_44px_rgba(176,176,176,0.05)] flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-2 bg-[#141414] rounded-[7px] px-3 py-2">
              <svg className="w-3.5 h-3.5 text-[#5f6868] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search messages..."
                className="bg-transparent text-white text-[11px] font-inter outline-none placeholder:text-[#5f6868] flex-1"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-white/[0.03] transition-colors ${
                  selected.id === conv.id ? "bg-[#28a263]/10" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="relative shrink-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-inter font-semibold"
                    style={{ backgroundColor: conv.avatarColor }}
                  >
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#28a263] rounded-full border-2 border-[#1b1b1b]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-[12.5px] font-inter font-medium ${selected.id === conv.id ? "text-[#28a263]" : "text-white"}`}>
                      {conv.name}
                    </span>
                    <span className="text-[#5f6868] text-[9.5px] font-inter shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-[#5f6868] text-[11px] font-inter truncate mt-0.5">{conv.preview}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="ml-1 min-w-[18px] h-[18px] bg-[#ff4e3c] rounded-full flex items-center justify-center text-white text-[9px] font-inter shrink-0">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="lg:col-span-2 bg-[#1d1d1d] rounded-[7px] shadow-[0_3.5px_44px_rgba(176,176,176,0.05)] flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
            <div className="relative">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-inter font-semibold"
                style={{ backgroundColor: selected.avatarColor }}
              >
                {selected.avatar}
              </div>
              {selected.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#28a263] rounded-full border-2 border-[#1d1d1d]" />
              )}
            </div>
            <div>
              <p className="text-white text-[13px] font-inter font-medium">{selected.name}</p>
              <p className={`text-[10px] font-inter ${selected.online ? "text-[#28a263]" : "text-[#5f6868]"}`}>
                {selected.online ? "Online" : "Offline"}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-[#a1a1a1]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-[#a1a1a1]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] ${msg.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-[12px] font-inter leading-relaxed ${
                      msg.from === "me"
                        ? "bg-[#28a263] text-white rounded-br-sm"
                        : "bg-[#1b1b1b] text-white rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[#5f6868] text-[9.5px] font-inter px-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-white/5">
            <div className="flex items-center gap-3 bg-[#1b1b1b] rounded-[7px] px-4 py-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white text-[12px] font-inter outline-none placeholder:text-[#5f6868]"
              />
              <button
                onClick={sendMessage}
                className="w-7 h-7 bg-[#28a263] hover:bg-[#23935a] transition-colors rounded-full flex items-center justify-center shrink-0"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
