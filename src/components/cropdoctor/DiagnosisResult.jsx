import { motion } from 'framer-motion'
import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react'
import Badge from '../common/Badge'

export default function DiagnosisResult({ result }) {
  const isHealthy = result.severity === 'None'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            isHealthy ? 'bg-forest-100 text-forest-700' : 'bg-clay-100 text-clay-600'
          }`}
        >
          {isHealthy ? <ShieldCheck size={20} /> : <AlertTriangle size={20} />}
        </div>
        <div>
          <p className="text-xs text-ink-500">{result.crop}</p>
          <p className="text-lg font-bold text-ink-900 font-display">{result.disease}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-ink-700 mb-1.5">
          <span>Confidence Score</span>
          <span>{result.confidence}%</span>
        </div>
        <div className="h-2 rounded-full bg-forest-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${isHealthy ? 'bg-forest-500' : 'bg-clay-500'}`}
          />
        </div>
      </div>

      <Badge tone={isHealthy ? 'forest' : 'clay'}>Severity: {result.severity}</Badge>

      <div>
        <p className="text-sm font-semibold text-ink-900 mb-2">Recommended Treatment</p>
        <ul className="space-y-2">
          {result.treatment.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-700 leading-relaxed">
              <CheckCircle2 size={15} className="text-forest-600 mt-0.5 shrink-0" />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
