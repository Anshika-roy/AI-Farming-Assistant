import { Leaf, Stethoscope, CloudSun, TrendingUp } from 'lucide-react'

const actions = [
  { id: 'crop-advice', label: 'Crop Advice', icon: Leaf },
  { id: 'disease-check', label: 'Disease Check', icon: Stethoscope },
  { id: 'weather-update', label: 'Weather Update', icon: CloudSun },
  { id: 'market-price', label: 'Market Price', icon: TrendingUp },
]

export default function QuickActions({ onSelect, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {actions.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect?.(id, label)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-forest-50 border border-forest-100 text-forest-700 hover:bg-forest-100 transition-colors"
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  )
}
