import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Key,
  Palette,
  Save,
  Check,
  Loader2,
  Mail,
  Smartphone,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
  { id: "preferences", label: "Preferences", icon: Palette },
];

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-foreground-muted text-sm mt-1">
          Manage your account, preferences, and API access
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profile Photo</p>
                      <p className="text-xs text-foreground-muted">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name || ""}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground focus:outline-none focus:border-primary/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email || ""}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground focus:outline-none focus:border-primary/50 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Company</label>
                    <input
                      type="text"
                      placeholder="Acme Inc"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Bio</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email Notifications", desc: "Receive updates about workflow completions and failures", checked: true },
                    { icon: Smartphone, label: "Push Notifications", desc: "Get real-time alerts on your device", checked: false },
                    { icon: Bell, label: "Weekly Digest", desc: "Summary of your weekly activity and usage", checked: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-hover transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-foreground-muted mt-0.5">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                        <div className="w-9 h-5 bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-4">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-success" />
                    <div>
                      <p className="text-sm font-medium">2FA is enabled</p>
                      <p className="text-xs text-foreground-muted">Using authenticator app</p>
                    </div>
                  </div>
                  <button className="text-sm text-danger hover:text-danger/80 transition-colors">
                    Disable
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-4">API Keys</h3>
                <div className="space-y-3">
                  {[
                    { name: "Production", key: "fm_live_••••••••••••••••••••••••", created: "Jan 15, 2025" },
                    { name: "Development", key: "fm_dev_••••••••••••••••••••••••", created: "Feb 1, 2025" },
                  ].map((apiKey) => (
                    <div key={apiKey.name} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated">
                      <div>
                        <p className="text-sm font-medium">{apiKey.name}</p>
                        <p className="text-xs text-foreground-muted font-mono mt-0.5">{apiKey.key}</p>
                        <p className="text-xs text-foreground-muted mt-0.5">Created {apiKey.created}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-hover transition-colors">
                          Copy
                        </button>
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors">
                          Revoke
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors">
                  Generate New API Key
                </button>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-4">Appearance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover transition-colors">
                    <div>
                      <p className="text-sm font-medium">Theme</p>
                      <p className="text-xs text-foreground-muted">Choose your preferred color scheme</p>
                    </div>
                    <select className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-sm focus:outline-none focus:border-primary/50">
                      <option>Dark</option>
                      <option>Light</option>
                      <option>System</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover transition-colors">
                    <div>
                      <p className="text-sm font-medium">Language</p>
                      <p className="text-xs text-foreground-muted">Interface language</p>
                    </div>
                    <select className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-sm focus:outline-none focus:border-primary/50">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover transition-colors">
                    <div>
                      <p className="text-sm font-medium">Timezone</p>
                      <p className="text-xs text-foreground-muted">Display times in your local timezone</p>
                    </div>
                    <select className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-sm focus:outline-none focus:border-primary/50">
                      <option>UTC-8 (PST)</option>
                      <option>UTC-5 (EST)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (CET)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : saved ? (
                <Check className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
