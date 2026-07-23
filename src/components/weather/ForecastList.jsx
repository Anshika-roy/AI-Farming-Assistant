import Card from '../common/Card'
import SectionHeader from '../common/SectionHeader'
import Skeleton from '../common/Skeleton'
import WeatherIcon from './WeatherIcon'

export default function ForecastList({ data }) {
  return (
    <Card className="p-5">
      <SectionHeader title="7-Day Forecast" />
      <div className="space-y-1">
        {!data && [1, 2, 3, 4, 5, 6, 7].map((i) => <Skeleton key={i} className="h-12 w-full mb-1" />)}
        {data?.map((d) => (
          <div
            key={d.day}
            className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-forest-50 transition-colors"
          >
            <p className="text-sm font-semibold text-ink-900 w-16">{d.day}</p>
            <WeatherIcon condition={d.condition} size={20} />
            <p className="text-xs text-sky-600 font-medium w-14 text-center">{d.rain}%</p>
            <div className="flex items-center gap-2 w-24 justify-end">
              <span className="text-sm font-bold text-ink-900">{d.max}°</span>
              <span className="text-sm text-ink-400">{d.min}°</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
