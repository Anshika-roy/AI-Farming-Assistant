export default function SectionHeader({ title, action, subtitle }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-base font-bold text-ink-900">{title}</h2>
        {subtitle && <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
