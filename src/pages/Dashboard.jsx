import { useEffect, useState } from 'react'
import { Wheat, Droplet, HeartPulse } from 'lucide-react'
import FarmOverviewCard from '../components/dashboard/FarmOverviewCard'
import StatCard from '../components/dashboard/StatCard'
import AiActionItems from '../components/dashboard/AiActionItems'
import SensorGrid from '../components/dashboard/SensorGrid'
import WeatherForecastCard from '../components/dashboard/WeatherForecastCard'
import { getFarmOverview } from '../data/mockApi'

export default function Dashboard() {
  const [overview, setOverview] = useState(null)

  useEffect(() => {
    getFarmOverview().then(setOverview)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FarmOverviewCard data={overview} />
        <StatCard
          icon={Wheat}
          tone="clay"
          label="Active Crops"
          value={overview?.activeCrops.length ?? '—'}
          sub={overview?.activeCrops.join(', ')}
        />
        <StatCard icon={Droplet} tone="sky" label="Soil Moisture" value="68%" sub="Optimal" />
        <StatCard
          icon={HeartPulse}
          tone="forest"
          label="Health Score"
          value={overview?.healthScore ?? '—'}
          sub={overview?.healthNote}
          big
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AiActionItems />
        <SensorGrid />
      </div>

      <WeatherForecastCard />
    </div>
  )
}
