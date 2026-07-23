import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import ChatWidget from '../chat/ChatWidget'

const titles = {
  '/': { title: 'Dashboard', subtitle: "Here's what's happening in your farm today." },
  '/chat': { title: 'AI Chat Assistant', subtitle: 'Ask anything about your crops and farm.' },
  '/voice': { title: 'Voice Assistant', subtitle: 'Talk to AgriMind hands-free.' },
  '/crop-doctor': { title: 'Crop Doctor', subtitle: 'Upload a photo to detect crop diseases instantly.' },
  '/iot': { title: 'IoT Monitoring', subtitle: 'Live sensor data across your farm.' },
  '/weather': { title: 'Weather', subtitle: 'Forecasts to help you plan field work.' },
  '/recommendations': { title: 'Recommendations', subtitle: 'AI insights tailored to your farm.' },
  '/records': { title: 'Farm Records', subtitle: 'A history of activity across your plots.' },
  '/cost-estimator': { title: 'Cost Estimator', subtitle: 'Track spend and projected returns.' },
  '/settings': { title: 'Settings', subtitle: 'Manage your account and preferences.' },
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const meta = titles[location.pathname] ?? { title: 'AgriMind' }

  return (
    <div className="flex min-h-screen bg-forest-50">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col pb-24">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 px-5 sm:px-8 pb-8">
          <Outlet />
        </main>
      </div>
      <ChatWidget />
    </div>
  )
}
