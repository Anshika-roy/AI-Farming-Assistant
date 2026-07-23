import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet, Thermometer, Wind, FlaskConical } from 'lucide-react'
import Card from '../common/Card'
import SectionHeader from '../common/SectionHeader'
import Skeleton from '../common/Skeleton'
import PulseWave from '../common/PulseWave'
import { getSensorSnapshot } from '../../data/mockApi'

const iconMap = { moisture: Droplet, temperature: Thermometer, humidity: Wind, ph: FlaskConical }
const colorMap = {
  moisture: { text: 'text-sky-600', bg: 'bg-sky-100', hex: '#3B82C4' },
  temperature: { text: 'text-berry-600', bg: 'bg-berry-100', hex: '#D4657A' },
  humidity: { text: 'text-sky-600', bg: 'bg-sky-100', hex: '#3B82C4' },
  ph: { text: 'text-forest-700', bg: 'bg-forest-100', hex: '#40916C' },
}

export default function SensorGrid() {
  const [sensors, setSensors] = useState(null)

  useEffect(() => {
    getSensorSnapshot().then(setSensors)
    const interval = setInterval(() => {
      getSensorSnapshot().then(setSensors)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-5">
      <SectionHeader
        title="Real-Time Field Insights"
        action={<button className="text-xs font-semibold text-forest-700 hover:underline">View All</button>}
      />
      <div className="grid grid-cols-2 gap-3">
        {!sensors &&
          [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 w-full" />)}

        {sensors?.map((s, i) => {
          const Icon = iconMap[s.id]
          const c = colorMap[s.id]
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-ink-900/5 p-3.5 bg-forest-50/40"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${c.bg} ${c.text}`}>
                  <Icon size={14} />
                </div>
                <p className="text-xs font-semibold text-ink-700">{s.label}</p>
              </div>
              <p className="text-xl font-bold text-ink-900 font-display">
                {s.value}
                {s.unit}
              </p>
              <p className="text-[11px] text-ink-500 mb-1">{s.status}</p>
              <PulseWave color={c.hex} />
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
