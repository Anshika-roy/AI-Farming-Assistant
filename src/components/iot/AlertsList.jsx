import { useEffect, useState } from 'react'
import { AlertTriangle, Info } from 'lucide-react'
import Card from '../common/Card'
import SectionHeader from '../common/SectionHeader'
import Skeleton from '../common/Skeleton'
import { getSensorAlerts } from '../../data/mockApi'

export default function AlertsList() {
  const [alerts, setAlerts] = useState(null)

  useEffect(() => {
    getSensorAlerts().then(setAlerts)
  }, [])

  return (
    <Card className="p-5">
      <SectionHeader title="Alerts & Notifications" />
      <div className="space-y-2.5">
        {!alerts && [1, 2, 3].map((i) => <Skeleton key={i} className="h-14 w-full" />)}
        {alerts?.map((a) => (
          <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl bg-forest-50/60">
            {a.level === 'warning' ? (
              <AlertTriangle size={16} className="text-clay-500 mt-0.5 shrink-0" />
            ) : (
              <Info size={16} className="text-sky-600 mt-0.5 shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-sm text-ink-900 leading-relaxed">{a.message}</p>
              <p className="text-[11px] text-ink-500 mt-0.5">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
