import { useEffect, useState } from 'react'
import { Menu, Bell, ChevronDown, CloudSun } from 'lucide-react'
import { getCurrentWeather } from '../../data/mockApi'

export default function Topbar({ title, subtitle, onMenuClick }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getCurrentWeather().then(setWeather)
  }, [])

  return (
    <header className="sticky top-0 z-30 bg-forest-50/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 sm:px-8 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-forest-100 text-ink-700"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-ink-900">{title}</h1>
            {subtitle && <p className="text-sm text-ink-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {weather && (
            <div className="hidden md:flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-soft">
              <CloudSun size={18} className="text-clay-500" />
              <div className="leading-tight">
                <p className="text-sm font-bold text-ink-900">{weather.tempC}°C</p>
                <p className="text-[11px] text-ink-500">{weather.condition}</p>
              </div>
            </div>
          )}
          <button className="hidden sm:flex items-center gap-1.5 bg-white rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 shadow-soft">
            🌐 English
            <ChevronDown size={14} />
          </button>
          <button className="relative bg-white rounded-xl p-2.5 shadow-soft text-ink-700 hover:text-forest-700">
            <Bell size={18} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-berry-500" />
          </button>
        </div>
      </div>
    </header>
  )
}
