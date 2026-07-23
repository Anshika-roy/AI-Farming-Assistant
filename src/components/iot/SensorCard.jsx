import { useEffect, useState } from 'react'
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Skeleton from '../common/Skeleton'
import { getSensorHistory } from '../../data/mockApi'

const toneHex = { sky: '#3B82C4', berry: '#D4657A', forest: '#40916C', clay: '#D4A017' }

export default function SensorCard({ sensor, onSelect, selected }) {
  const [history, setHistory] = useState(null)
  const Icon = sensor.icon

  useEffect(() => {
    getSensorHistory(sensor.id).then(setHistory)
  }, [sensor.id])

  return (
    <Card
      onClick={() => onSelect?.(sensor.id)}
      className={`p-5 cursor-pointer ${selected ? 'ring-2 ring-forest-400' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${toneHex[sensor.tone]}1A`, color: toneHex[sensor.tone] }}
          >
            <Icon size={17} />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900">{sensor.label}</p>
            <p className="text-[11px] text-ink-500">Plot {sensor.plot}</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulseSoft" />
          <span className="text-[10px] font-semibold text-forest-600 uppercase tracking-wide">Live</span>
        </span>
      </div>

      <div className="flex items-end justify-between mb-2">
        <p className="text-2xl font-bold text-ink-900 font-display">
          {sensor.value}
          <span className="text-sm font-medium text-ink-500">{sensor.unit}</span>
        </p>
        <Badge tone={sensor.tone === 'clay' ? 'clay' : sensor.tone === 'berry' ? 'berry' : sensor.tone === 'sky' ? 'sky' : 'forest'}>
          {sensor.status}
        </Badge>
      </div>

      <div className="h-14">
        {!history ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
              <Line
                type="monotone"
                dataKey="v"
                stroke={toneHex[sensor.tone]}
                strokeWidth={2}
                dot={false}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
}
