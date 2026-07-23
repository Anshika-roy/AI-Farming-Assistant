import { Droplet, Wind, CloudRain } from 'lucide-react'
import Card from '../common/Card'
import WeatherIcon from './WeatherIcon'

export default function CurrentWeather({ data }) {
  if (!data) return <Card className="p-6 h-56 animate-pulse bg-forest-100/50" />

  return (
    <Card className="p-6 bg-gradient-to-br from-forest-700 to-forest-800 text-white overflow-hidden relative">
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-forest-100/80 text-sm">Nashik, Maharashtra</p>
          <p className="text-5xl font-bold font-display mt-1">{data.tempC}°C</p>
          <p className="text-forest-100/90 mt-1">{data.condition}</p>
          <p className="text-forest-100/70 text-sm mt-1">
            Min {data.min}°C · Max {data.max}°C
          </p>
        </div>
        <WeatherIcon condition="partly-cloudy" size={72} />
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Droplet size={16} className="text-forest-200" />
          <div>
            <p className="text-sm font-semibold">{data.humidity}%</p>
            <p className="text-[11px] text-forest-100/70">Humidity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={16} className="text-forest-200" />
          <div>
            <p className="text-sm font-semibold">{data.wind} km/h</p>
            <p className="text-[11px] text-forest-100/70">Wind</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CloudRain size={16} className="text-forest-200" />
          <div>
            <p className="text-sm font-semibold">{data.rainChance}%</p>
            <p className="text-[11px] text-forest-100/70">Rain chance</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
