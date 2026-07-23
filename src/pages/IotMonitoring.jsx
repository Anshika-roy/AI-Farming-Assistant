import { useState } from 'react'
import { Droplet, Thermometer, Wind, FlaskConical } from 'lucide-react'
import SensorCard from '../components/iot/SensorCard'
import SensorHistoryPanel from '../components/iot/SensorHistoryPanel'
import AlertsList from '../components/iot/AlertsList'

const sensors = [
  { id: 'moisture', label: 'Soil Moisture', icon: Droplet, value: 68, unit: '%', status: 'Optimal', tone: 'sky', plot: 'A' },
  { id: 'temperature', label: 'Temperature', icon: Thermometer, value: 28, unit: '°C', status: 'Normal', tone: 'berry', plot: 'A' },
  { id: 'humidity', label: 'Humidity', icon: Wind, value: 60, unit: '%', status: 'Normal', tone: 'sky', plot: 'B' },
  { id: 'ph', label: 'Soil pH', icon: FlaskConical, value: 6.5, unit: '', status: 'Slightly Acidic', tone: 'forest', plot: 'B' },
]

export default function IotMonitoring() {
  const [selected, setSelected] = useState('moisture')
  const activeSensor = sensors.find((s) => s.id === selected)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensors.map((s) => (
          <SensorCard key={s.id} sensor={s} selected={selected === s.id} onSelect={setSelected} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SensorHistoryPanel sensor={activeSensor} />
        </div>
        <AlertsList />
      </div>
    </div>
  )
}
