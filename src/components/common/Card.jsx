import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, as: Comp = motion.div, ...props }) {
  return (
    <Comp
      className={`bg-white rounded-2xl shadow-soft border border-forest-100/60 ${
        hover ? 'hover:shadow-card transition-shadow duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
