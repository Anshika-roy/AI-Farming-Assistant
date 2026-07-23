import { useEffect, useState } from 'react'
import Card from '../common/Card'
import SectionHeader from '../common/SectionHeader'
import Skeleton from '../common/Skeleton'
import WeatherIcon from '../weather/WeatherIcon'
import { getCurrentWeather, getWeeklyForecast } from '../../data/mockApi'

export default function WeatherForecastCard() {
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState(null)

  useEffect(() => {
    getCurrentWeather().then(setCurrent)
    getWeeklyForecast().then((d) => setForecast(d.slice(0, 5)))
  }, [])

  return (
    <Card className="p-5">
      <SectionHeader
        title="Weather Forecast"
        action={<button className="text-xs font-semibold text-forest-700 hover:underline">View Full Forecast</button>}
      />
      <div className="flex items-center gap-6 flex-wrap">
        {!current ? (
          <Skeleton className="h-16 w-40" />
        ) : (
          <div className="flex items-center gap-3 pr-6 border-r border-ink-900/5">
            <WeatherIcon condition="partly-cloudy" size={38} />
            <div>
              <p className="text-2xl font-bold text-ink-900 font-display">{current.tempC}°C</p>
              <p className="text-xs text-ink-500">{current.condition}</p>
              <p className="text-[11px] text-ink-500">
                Min {current.min}°C | Max {current.max}°C
              </p>
            </div>
          </div>
        )}

        <div className="flex-1 grid grid-cols-5 gap-2 min-w-[280px]">
          {!forecast &&
            [1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-20" />)}
          {forecast?.map((d) => (
            <div key={d.day} className="flex flex-col items-center gap-1 text-center">
              <p className="text-xs font-semibold text-ink-700">{d.day}</p>
              <WeatherIcon condition={d.condition} size={22} />
              <p className="text-xs font-bold text-ink-900">{d.max}°C</p>
              <p className="text-[11px] text-ink-500">{d.min}°C</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
