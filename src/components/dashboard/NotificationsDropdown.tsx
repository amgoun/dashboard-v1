import React from "react";

type NotifType = "success" | "warning" | "info" | "error";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Transfer Successful",
    description: "$10,000 was sent to Mobile Bill — Rawis Funds.",
    time: "Just now",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Unusual Activity",
    description: "A login attempt was detected from a new device.",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Card Statement Ready",
    description: "Your June 2022 statement is available to download.",
    time: "2 hr ago",
    read: true,
  },
  {
    id: "4",
    type: "error",
    title: "Payment Failed",
    description: "Your payment to PVR was declined. Please retry.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "5",
    type: "success",
    title: "Account Verified",
    description: "Your identity verification was approved successfully.",
    time: "2 days ago",
    read: true,
  },
];

const typeConfig: Record<NotifType, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: "bg-[#28a263]/15",
    icon: (
      <svg className="w-4 h-4 text-[#28a263]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-[#f7cb2e]/10",
    icon: (
      <svg className="w-4 h-4 text-[#f7cb2e]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
  },
  info: {
    bg: "bg-white/5",
    icon: (
      <svg className="w-4 h-4 text-[#a1a1a1]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  error: {
    bg: "bg-[#ff4e3c]/10",
    icon: (
      <svg className="w-4 h-4 text-[#ff4e3c]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
};

const NotificationsDropdown: React.FC = () => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute right-0 top-full mt-2 w-[300px] bg-[#1b1b1b] rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-white/5 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <h3 className="text-white text-[13px] font-semibold font-inter">Notifications</h3>
        {unreadCount > 0 && (
          <span className="bg-[#ff4e3c]/20 text-[#ff4e3c] text-[9px] font-inter font-medium px-2 py-0.5 rounded-full">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* Notification list */}
      <ul>
        {notifications.slice(0, 5).map((notif) => {
          const config = typeConfig[notif.type];
          return (
            <li
              key={notif.id}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-white/5 ${
                !notif.read ? "bg-white/[0.03]" : ""
              }`}
            >
              {/* Icon */}
              <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                {config.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[12px] font-inter leading-tight ${!notif.read ? "text-white font-medium" : "text-[#a1a1a1]"}`}>
                    {notif.title}
                  </p>
                  <span className="text-[#5f6868] text-[9px] font-inter shrink-0 mt-0.5">{notif.time}</span>
                </div>
                <p className="text-[#5f6868] text-[10.5px] font-inter mt-0.5 leading-snug">{notif.description}</p>
              </div>

              {/* Unread dot */}
              {!notif.read && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#28a263] shrink-0 mt-1.5" />
              )}
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/5">
      <button className="w-full text-center text-[#28a263] text-[11px] font-inter hover:text-[#3dbd76] transition-colors">
        See all notifications
      </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
