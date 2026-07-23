import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import Card from '../components/common/Card'
import Skeleton from '../components/common/Skeleton'
import { getRecommendations } from '../data/mockApi'

export default function Recommendations() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    getRecommendations().then(setItems)
  }, [])

  return (
    <div className="space-y-3 max-w-3xl">
      {!items && [1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
      {items?.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <Card className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-clay-100 text-clay-600 flex items-center justify-center shrink-0">
              <Lightbulb size={19} />
            </div>
            <div>
              <p className="font-semibold text-ink-900">{r.title}</p>
              <p className="text-sm text-ink-500 mt-1 leading-relaxed">{r.detail}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
