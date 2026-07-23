import { useEffect, useState } from 'react'
import CurrentWeather from '../components/weather/CurrentWeather'
import ForecastList from '../components/weather/ForecastList'
import RainPrediction from '../components/weather/RainPrediction'
import { getCurrentWeather, getWeeklyForecast } from '../data/mockApi'

export default function Weather() {
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState(null)

  useEffect(() => {
    getCurrentWeather().then(setCurrent)
    getWeeklyForecast().then(setForecast)
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="lg:col-span-2">
        <CurrentWeather data={current} />
      </div>
      <ForecastList data={forecast} />
      <RainPrediction data={forecast} />
    </div>
  )
}
