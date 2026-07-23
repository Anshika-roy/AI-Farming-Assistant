import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-forest-700 text-white hover:bg-forest-800',
  secondary: 'bg-forest-100 text-forest-700 hover:bg-forest-200',
  outline: 'bg-white text-ink-700 border border-ink-900/10 hover:bg-forest-50',
  ghost: 'bg-transparent text-ink-700 hover:bg-ink-900/5',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  )
}
