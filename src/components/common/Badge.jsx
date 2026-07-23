const toneStyles = {
  forest: 'bg-forest-100 text-forest-700',
  clay: 'bg-clay-100 text-clay-600',
  sky: 'bg-sky-100 text-sky-600',
  berry: 'bg-berry-100 text-berry-600',
  neutral: 'bg-ink-900/5 text-ink-700',
}

export default function Badge({ children, tone = 'forest', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${toneStyles[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
