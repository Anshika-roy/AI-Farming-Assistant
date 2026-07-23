import { MapPin, ArrowUpRight } from 'lucide-react'
import Card from '../common/Card'

export default function FarmOverviewCard({ data }) {
  return (
    <Card className="p-5 flex flex-col justify-between overflow-hidden relative min-h-[168px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-ink-500 mb-1">Farm Overview</p>
          <p className="text-2xl font-bold text-ink-900 font-display">
            {data ? `${data.totalAcres} acres` : '—'}
          </p>
          <p className="text-xs text-ink-500 mt-0.5">Total Farm Area</p>
        </div>
        <button className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center text-forest-700 shrink-0">
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* stylised mini map */}
      <div className="mt-3 h-16 rounded-xl bg-gradient-to-br from-forest-100 to-forest-200 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 200 60" preserveAspectRatio="none">
          <path d="M0,40 Q50,10 100,35 T200,20" stroke="#40916C" strokeWidth="2" fill="none" />
          <path d="M0,55 Q60,30 120,50 T200,45" stroke="#2D6A4F" strokeWidth="1.5" fill="none" />
        </svg>
        <MapPin size={16} className="absolute top-3 left-1/2 -translate-x-1/2 text-forest-700" fill="#40916C" />
      </div>
    </Card>
  )
}
