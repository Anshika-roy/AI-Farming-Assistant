import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Card from '../components/common/Card'
import SectionHeader from '../components/common/SectionHeader'
import Skeleton from '../components/common/Skeleton'
import { getCostEstimate } from '../data/mockApi'

const colors = ['#2D6A4F', '#40916C', '#74C69D', '#D4A017', '#3B82C4']

export default function CostEstimator() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getCostEstimate().then(setData)
  }, [])

  const totalCost = data?.items.reduce((s, i) => s + i.amount, 0) ?? 0
  const profit = (data?.projectedRevenue ?? 0) - totalCost

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card className="p-5">
        <SectionHeader title="Expense Breakdown" />
        <div className="h-64">
          {!data ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.items} dataKey="amount" nameKey="label" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {data.items.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data?.items.map((item, i) => (
            <div key={item.label} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
              <span className="text-ink-700">{item.label}</span>
              <span className="ml-auto font-semibold text-ink-900">₹{item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionHeader title="Projected Returns" />
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-forest-50">
            <span className="text-sm text-ink-700">Total Estimated Cost</span>
            <span className="font-bold text-ink-900">₹{totalCost.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-forest-50">
            <span className="text-sm text-ink-700">Projected Revenue</span>
            <span className="font-bold text-ink-900">₹{(data?.projectedRevenue ?? 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-forest-700 text-white">
            <span className="text-sm">Estimated Profit</span>
            <span className="font-bold">₹{profit.toLocaleString()}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
