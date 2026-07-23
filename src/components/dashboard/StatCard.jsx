import { ArrowUpRight } from 'lucide-react'
import Card from '../common/Card'

const toneBg = {
  clay: 'bg-clay-100 text-clay-600',
  sky: 'bg-sky-100 text-sky-600',
  forest: 'bg-forest-100 text-forest-700',
  berry: 'bg-berry-100 text-berry-600',
}

export default function StatCard({ icon: Icon, tone = 'forest', label, value, sub, big }) {
  return (
    <Card className="p-5 flex flex-col justify-between min-h-[168px]">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toneBg[tone]}`}>
          <Icon size={19} />
        </div>
        <button className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center text-forest-700">
          <ArrowUpRight size={16} />
        </button>
      </div>
      <div>
        <p className="text-xs font-semibold text-ink-500 mb-1">{label}</p>
        <p className={`font-bold text-ink-900 font-display ${big ? 'text-2xl' : 'text-xl'}`}>{value}</p>
        {sub && <p className="text-xs text-ink-500 mt-0.5">{sub}</p>}
      </div>
    </Card>
  )
}
