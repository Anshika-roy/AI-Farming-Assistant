import { Sun, CloudSun, CloudRain, Cloud } from 'lucide-react'

const map = {
  sunny: { Icon: Sun, className: 'text-clay-500' },
  'partly-cloudy': { Icon: CloudSun, className: 'text-clay-400' },
  rainy: { Icon: CloudRain, className: 'text-sky-600' },
  cloudy: { Icon: Cloud, className: 'text-ink-500' },
}

export default function WeatherIcon({ condition, size = 20 }) {
  const { Icon, className } = map[condition] ?? map.sunny
  return <Icon size={size} className={className} />
}
