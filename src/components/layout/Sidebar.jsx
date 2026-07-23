import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sprout,
  LayoutDashboard,
  MessageCircle,
  Mic,
  Stethoscope,
  Radio,
  CloudSun,
  Lightbulb,
  BookOpen,
  Calculator,
  Settings as SettingsIcon,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/chat', label: 'AI Chat Assistant', icon: MessageCircle },
  { to: '/voice', label: 'Voice Assistant', icon: Mic },
  { to: '/crop-doctor', label: 'Crop Doctor', icon: Stethoscope, tag: 'New' },
  { to: '/iot', label: 'IoT Monitoring', icon: Radio },
  { to: '/weather', label: 'Weather', icon: CloudSun },
  { to: '/recommendations', label: 'Recommendations', icon: Lightbulb },
  { to: '/records', label: 'Farm Records', icon: BookOpen },
  { to: '/cost-estimator', label: 'Cost Estimator', icon: Calculator },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 shrink-0 bg-gradient-to-b from-forest-900 to-forest-950 text-forest-100 flex flex-col z-50 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 pt-7 pb-6">
          <div className="w-10 h-10 rounded-xl bg-forest-400/20 flex items-center justify-center">
            <Sprout className="text-forest-300" size={22} />
          </div>
          <div>
            <h1 className="text-white font-display font-bold text-[15px] leading-tight">
              AgriMind
            </h1>
            <p className="text-forest-300/70 text-[11px] leading-tight">
              Your Smart Farming Partner
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon, tag }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-forest-400 text-forest-950 font-semibold'
                    : 'text-forest-100/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
                  <span className="flex-1">{label}</span>
                  {tag && (
                    <span className="text-[9px] font-bold uppercase tracking-wide bg-clay-500 text-white px-1.5 py-0.5 rounded-md">
                      {tag}
                    </span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      className="absolute right-1.5 text-forest-950"
                    >
                      <ChevronRight size={14} />
                    </motion.span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profile + plan */}
        <div className="p-3 space-y-2 border-t border-white/10 mt-2">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-forest-400 flex items-center justify-center text-forest-950 font-bold text-sm">
                RY
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-forest-300 border-2 border-forest-900" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">Ramesh Yadav</p>
              <p className="text-[11px] text-forest-300/70">Farm ID: FYD12345</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-clay-500/15 rounded-xl px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-clay-400">Gold Plan</p>
              <p className="text-[10px] text-forest-300/60">Valid till 12 Aug 2026</p>
            </div>
            <ChevronRight size={16} className="text-forest-300/60" />
          </div>
        </div>
      </aside>
    </>
  )
}
