import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import AiAssistant from './pages/AiAssistant'
import VoiceAssistant from './pages/VoiceAssistant'
import CropDoctor from './pages/CropDoctor'
import IotMonitoring from './pages/IotMonitoring'
import Weather from './pages/Weather'
import Recommendations from './pages/Recommendations'
import FarmRecords from './pages/FarmRecords'
import CostEstimator from './pages/CostEstimator'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<AiAssistant />} />
        <Route path="/voice" element={<VoiceAssistant />} />
        <Route path="/crop-doctor" element={<CropDoctor />} />
        <Route path="/iot" element={<IotMonitoring />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/records" element={<FarmRecords />} />
        <Route path="/cost-estimator" element={<CostEstimator />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
