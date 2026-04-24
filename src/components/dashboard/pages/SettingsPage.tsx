import React, { useState } from "react";
import { PageWrapper, PageHeader, FilterTabs } from "../shared";

type SettingsTab = "Profile" | "Account" | "Notifications" | "Security" | "Appearance";

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${checked ? "bg-brand" : "bg-white/10"}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`}
    />
  </button>
);

const Field: React.FC<{ label: string; value: string; type?: string; readOnly?: boolean }> = ({
  label,
  value,
  type = "text",
  readOnly = false,
}) => {
  const [val, setVal] = useState(value);
  return (
    <div>
      <label className="block text-ink-secondary text-[11px] font-inter mb-1.5">{label}</label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        readOnly={readOnly}
        className={`w-full bg-surface-page border border-white/10 rounded-card px-4 py-2.5 text-white text-[12px] font-inter outline-none focus:border-brand transition-colors ${
          readOnly ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-surface-card rounded-card p-5 shadow-panel">
    <h3 className="text-white text-[13px] font-inter font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");

  const [notifs, setNotifs] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyDigest: true,
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
  });

  function toggleNotif(key: keyof typeof notifs) {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [accentColor, setAccentColor] = useState("#28a263");
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const tabs: SettingsTab[] = ["Profile", "Account", "Notifications", "Security", "Appearance"];

  return (
    <PageWrapper>
      <PageHeader title="Settings" subtitle="Manage your account and preferences" />

      <FilterTabs
        tabs={tabs.map((t) => ({ label: t }))}
        active={activeTab}
        onChange={(t) => setActiveTab(t as SettingsTab)}
        raised
      />

      {/* Profile Tab */}
      {activeTab === "Profile" && (
        <div className="space-y-4">
          <Section title="Profile Information">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/5">
              <div className="relative">
                <img
                  src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518709-node-3%3A831-1776729517136.png"
                  alt="Avatar"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
              <div>
                <p className="text-white text-[13px] font-inter font-medium">Jenny Wilson</p>
                <p className="text-ink-muted text-[11px] font-inter mt-0.5">Itaibrahca31@gmail.com</p>
                <button className="text-brand text-[10.5px] font-inter mt-1 hover:text-white transition-colors">
                  Change avatar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" value="Jenny" />
              <Field label="Last Name" value="Wilson" />
              <Field label="Email Address" value="Itaibrahca31@gmail.com" type="email" />
              <Field label="Phone Number" value="+1 (555) 012-3456" type="tel" />
              <Field label="Job Title" value="Product Manager" />
              <Field label="Company" value="Uifry Inc." />
            </div>

            <div className="mt-4">
              <label className="block text-ink-secondary text-[11px] font-inter mb-1.5">Bio</label>
              <textarea
                defaultValue="Passionate product manager focused on building delightful user experiences."
                rows={3}
                className="w-full bg-surface-page border border-white/10 rounded-card px-4 py-2.5 text-white text-[12px] font-inter outline-none focus:border-brand transition-colors resize-none"
              />
            </div>
          </Section>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 rounded-card text-[12px] font-inter text-ink-secondary hover:text-white bg-white/5 hover:bg-white/10 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 rounded-card text-[12px] font-inter text-white bg-brand hover:bg-brand/90 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Account Tab */}
      {activeTab === "Account" && (
        <div className="space-y-4">
          <Section title="Account Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Username" value="jenny_wilson" />
              <Field label="Account ID" value="USR-001291" readOnly />
              <Field label="Plan" value="Pro Membership" readOnly />
              <Field label="Billing Cycle" value="Monthly · Renews May 1" readOnly />
            </div>
          </Section>

          <Section title="Danger Zone">
            <div className="space-y-3">
              {[
                { label: "Deactivate Account", desc: "Temporarily disable your account", action: "Deactivate", color: "#f59e0b" },
                { label: "Delete Account", desc: "Permanently delete all data — this cannot be undone", action: "Delete", color: "#ff4e3c" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-surface-page rounded-card">
                  <div>
                    <p className="text-white text-[12.5px] font-inter font-medium">{item.label}</p>
                    <p className="text-ink-muted text-[10.5px] font-inter mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    className="text-[11px] font-inter px-3 py-1.5 rounded border transition-colors"
                    style={{ color: item.color, borderColor: `${item.color}40` }}
                  >
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "Notifications" && (
        <div className="space-y-4">
          <Section title="Email Notifications">
            <div className="space-y-4">
              {[
                { key: "emailAlerts" as const, label: "Email Alerts", desc: "Receive important alerts via email" },
                { key: "weeklyDigest" as const, label: "Weekly Digest", desc: "Weekly summary of your account activity" },
                { key: "productUpdates" as const, label: "Product Updates", desc: "News about features and improvements" },
                { key: "marketingEmails" as const, label: "Marketing Emails", desc: "Tips, tutorials, and promotional content" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-[12.5px] font-inter font-medium">{item.label}</p>
                    <p className="text-ink-muted text-[10.5px] font-inter mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={notifs[item.key]} onChange={() => toggleNotif(item.key)} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Push &amp; SMS">
            <div className="space-y-4">
              {[
                { key: "pushNotifications" as const, label: "Push Notifications", desc: "Browser push notifications" },
                { key: "smsAlerts" as const, label: "SMS Alerts", desc: "Critical alerts sent via SMS" },
                { key: "securityAlerts" as const, label: "Security Alerts", desc: "Login and security change notifications" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-[12.5px] font-inter font-medium">{item.label}</p>
                    <p className="text-ink-muted text-[10.5px] font-inter mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={notifs[item.key]} onChange={() => toggleNotif(item.key)} />
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "Security" && (
        <div className="space-y-4">
          <Section title="Password">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Current Password" value="" type="password" />
              <div />
              <Field label="New Password" value="" type="password" />
              <Field label="Confirm New Password" value="" type="password" />
            </div>
            <button className="mt-4 px-4 py-2 rounded-card text-[12px] font-inter text-white bg-brand hover:bg-brand/90 transition-colors">
              Update Password
            </button>
          </Section>

          <Section title="Two-Factor Authentication">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white text-[12.5px] font-inter font-medium">Two-Factor Authentication</p>
                <p className="text-ink-muted text-[10.5px] font-inter mt-0.5">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Toggle checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
            </div>
            {twoFA && (
              <div className="bg-surface-page rounded-card p-4 border border-brand/20">
                <p className="text-brand text-[11px] font-inter font-medium mb-1">2FA is enabled ✓</p>
                <p className="text-ink-muted text-[10.5px] font-inter">
                  Your account is protected with authenticator app verification.
                </p>
              </div>
            )}
          </Section>

          <Section title="Active Sessions">
            <div className="flex items-center justify-between mb-3">
              <Toggle checked={loginAlerts} onChange={() => setLoginAlerts(!loginAlerts)} />
              <p className="text-ink-secondary text-[11px] font-inter ml-3">Notify me of new logins</p>
            </div>
            {[
              { device: "Chrome on macOS", location: "New York, USA", time: "Now · Current session", current: true },
              { device: "Safari on iPhone 15", location: "New York, USA", time: "Apr 23, 2026", current: false },
              { device: "Firefox on Windows", location: "London, UK", time: "Apr 21, 2026", current: false },
            ].map((s) => (
              <div key={s.device} className="flex items-center justify-between p-3 bg-surface-page rounded-card mb-2 last:mb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${s.current ? "bg-brand" : "bg-[#5f6868]"}`} />
                  <div>
                    <p className="text-white text-[11.5px] font-inter font-medium">{s.device}</p>
                    <p className="text-ink-muted text-[10px] font-inter">{s.location} · {s.time}</p>
                  </div>
                </div>
                {!s.current && (
                  <button className="text-danger text-[10px] font-inter hover:text-white transition-colors">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </Section>
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === "Appearance" && (
        <div className="space-y-4">
          <Section title="Theme">
            <div className="grid grid-cols-3 gap-3">
              {(["dark", "light", "system"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-4 rounded-card border transition-all ${
                    theme === t
                      ? "border-brand bg-brand/10"
                      : "border-white/10 bg-surface-page hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-full h-12 rounded mb-2 ${
                      t === "dark" ? "bg-surface-page" : t === "light" ? "bg-[#f5f5f5]" : "bg-gradient-to-r from-[#141414] to-[#f5f5f5]"
                    }`}
                  />
                  <p className={`text-[11.5px] font-inter capitalize ${theme === t ? "text-brand" : "text-ink-secondary"}`}>
                    {t}
                  </p>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Accent Color">
            <div className="flex items-center gap-3 flex-wrap">
              {["#28a263", "#8b5cf6", "#f59e0b", "#3b82f6", "#ff4e3c", "#06b6d4"].map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    accentColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#1b1b1b] scale-110" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </Section>

          <Section title="Display">
            <div className="space-y-4">
              {[
                { label: "Compact Mode", desc: "Reduce spacing for denser information display" },
                { label: "Animations", desc: "Enable transition animations throughout the UI" },
                { label: "Show Tooltips", desc: "Display helpful tooltips on hover" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-[12.5px] font-inter font-medium">{item.label}</p>
                    <p className="text-ink-muted text-[10.5px] font-inter mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={true} onChange={() => {}} />
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}
    </PageWrapper>
  );
};

export default SettingsPage;
