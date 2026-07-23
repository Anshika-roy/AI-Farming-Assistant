import { useState } from 'react'
import { User, Bell, Globe, Shield } from 'lucide-react'
import Card from '../components/common/Card'
import SectionHeader from '../components/common/SectionHeader'

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-forest-600' : 'bg-ink-900/15'}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

export default function Settings() {
  const [notifs, setNotifs] = useState(true)
  const [alerts, setAlerts] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)

  return (
    <div className="max-w-2xl space-y-5">
      <Card className="p-5">
        <SectionHeader
          title={
            <span className="flex items-center gap-2">
              <User size={16} className="text-forest-600" /> Account
            </span>
          }
        />
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-forest-400 flex items-center justify-center text-forest-950 font-bold text-xl">
            RY
          </div>
          <div>
            <p className="font-semibold text-ink-900">Ramesh Yadav</p>
            <p className="text-sm text-ink-500">Farm ID: FYD12345 · Nashik, Maharashtra</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <SectionHeader
          title={
            <span className="flex items-center gap-2">
              <Bell size={16} className="text-forest-600" /> Notifications
            </span>
          }
        />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-900">Push notifications</p>
              <p className="text-xs text-ink-500">Get notified about urgent farm actions</p>
            </div>
            <Toggle checked={notifs} onChange={setNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-900">Sensor alerts</p>
              <p className="text-xs text-ink-500">Alerts for abnormal soil or weather readings</p>
            </div>
            <Toggle checked={alerts} onChange={setAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-900">Weekly summary report</p>
              <p className="text-xs text-ink-500">A digest of farm health every Monday</p>
            </div>
            <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <SectionHeader
          title={
            <span className="flex items-center gap-2">
              <Globe size={16} className="text-forest-600" /> Language & Region
            </span>
          }
        />
        <select className="w-full sm:w-64 px-3 py-2.5 rounded-xl border border-ink-900/10 text-sm text-ink-700 bg-white">
          <option>English</option>
          <option>हिंदी (Hindi)</option>
          <option>मराठी (Marathi)</option>
        </select>
      </Card>

      <Card className="p-5">
        <SectionHeader
          title={
            <span className="flex items-center gap-2">
              <Shield size={16} className="text-forest-600" /> Privacy & Data
            </span>
          }
        />
        <p className="text-sm text-ink-500 leading-relaxed">
          Your farm sensor data is stored securely and never shared with third parties without consent.
        </p>
      </Card>
    </div>
  )
}
