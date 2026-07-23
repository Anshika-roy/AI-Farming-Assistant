import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../common/Card'
import SectionHeader from '../common/SectionHeader'
import Skeleton from '../common/Skeleton'
import { getSensorHistory } from '../../data/mockApi'

export default function SensorHistoryPanel({ sensor }) {
  const [history, setHistory] = useState(null)

  useEffect(() => {
    setHistory(null)
    getSensorHistory(sensor.id).then(setHistory)
  }, [sensor.id])

  const hex = { sky: '#3B82C4', berry: '#D4657A', forest: '#40916C', clay: '#D4A017' }[sensor.tone]

  return (
    <Card className="p-5">
      <SectionHeader
        title={`${sensor.label} — 24hr History`}
        subtitle={`Plot ${sensor.plot} · updated moments ago`}
      />
      <div className="h-64">
        {!history ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`grad-${sensor.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={hex} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={hex} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDF6EF" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#6B786F' }} interval={3} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B786F' }} axisLine={false} tickLine={false} width={32} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #D8F3DC', fontSize: 12 }}
                labelStyle={{ color: '#3A4A40' }}
              />
              <Area type="monotone" dataKey="v" stroke={hex} strokeWidth={2} fill={`url(#grad-${sensor.id})`} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
}
