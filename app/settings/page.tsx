import { FadeIn } from "@/components/layout/FadeIn"
import { Settings, User, Moon, Bell, Globe, Shield } from "lucide-react"

const settingSections = [
  {
    id: "appearance",
    title: "Appearance",
    icon: Moon,
    items: [
      { label: "Dark mode", value: "Always on", disabled: true },
      { label: "Compact layout", value: "Off", disabled: false }
    ]
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Email updates", value: "On", disabled: false },
      { label: "Push notifications", value: "Off", disabled: false }
    ]
  },
  {
    id: "language",
    title: "Language & Region",
    icon: Globe,
    items: [
      { label: "Language", value: "English", disabled: false },
      { label: "Timezone", value: "UTC+7", disabled: false }
    ]
  },
  {
    id: "privacy",
    title: "Privacy",
    icon: Shield,
    items: [
      { label: "Save chat history", value: "On", disabled: false },
      { label: "Share usage data", value: "Off", disabled: false }
    ]
  }
]

export default function SettingsPage() {
  return (
    <FadeIn className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-white/[0.06]">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Settings</h1>
            <p className="text-sm text-gray-500">Manage your preferences and account</p>
          </div>
        </div>

        {/* Profile */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/[0.08] flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-white">Example</p>
              <p className="text-sm text-gray-500">Guest account</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map(section => (
            <div
              key={section.id}
              className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
                <section.icon className="w-4 h-4 text-gray-400" />
                <h2 className="font-medium text-gray-200">{section.title}</h2>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="px-5 py-4 flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <button
                      disabled={item.disabled}
                      className="text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {item.value}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
