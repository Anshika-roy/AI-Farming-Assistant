import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import Card from '../common/Card'
import SectionHeader from '../common/SectionHeader'
import Skeleton from '../common/Skeleton'

export default function RainPrediction({ data }) {
  return (
    <Card className="p-5">
      <SectionHeader title="Rain Prediction" subtitle="Chance of rainfall over the next 7 days" />
      <div className="h-56">
        {!data ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDF6EF" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B786F' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B786F' }} axisLine={false} tickLine={false} width={32} unit="%" />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #D8F3DC', fontSize: 12 }}
                formatter={(v) => [`${v}%`, 'Rain chance']}
              />
              <Bar dataKey="rain" fill="#3B82C4" radius={[6, 6, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
}
