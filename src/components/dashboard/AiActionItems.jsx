import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Droplet, Sparkles } from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import SectionHeader from '../common/SectionHeader'
import Skeleton from '../common/Skeleton'
import { getAiActions } from '../../data/mockApi'

const icons = { leaf: Leaf, shield: ShieldCheck, droplet: Droplet }
const badgeTone = { Due: 'clay', Good: 'forest', Upcoming: 'sky' }
const iconTone = {
  clay: 'bg-clay-100 text-clay-600',
  forest: 'bg-forest-100 text-forest-700',
  sky: 'bg-sky-100 text-sky-600',
  berry: 'bg-berry-100 text-berry-600',
}

export default function AiActionItems() {
  const [actions, setActions] = useState(null)

  useEffect(() => {
    getAiActions().then(setActions)
  }, [])

  return (
    <Card className="p-5">
      <SectionHeader
        title={
          <span className="flex items-center gap-2">
            <Sparkles size={16} className="text-forest-600" /> AI Action Items
          </span>
        }
        action={
          <button className="text-xs font-semibold text-forest-700 hover:underline">View All</button>
        }
      />
      <div className="space-y-3">
        {!actions &&
          [1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}

        {actions?.map((item, i) => {
          const Icon = icons[item.icon]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-forest-50 transition-colors"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconTone[item.tone]}`}>
                <Icon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink-900">{item.title}</p>
                  <Badge tone={badgeTone[item.status]}>{item.status}</Badge>
                </div>
                <p className="text-xs text-ink-500 mt-0.5 leading-relaxed">{item.detail}</p>
                <button className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-ink-900/10 text-ink-700 hover:bg-forest-50">
                  View Details
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
