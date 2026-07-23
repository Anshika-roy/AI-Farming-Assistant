// ---------------------------------------------------------------------------
// mockApi.js
// A single, swappable mock API layer. Every function returns a Promise, so
// swapping in a real backend later only means editing this file — every
// component already calls it as if it were async network I/O.
// ---------------------------------------------------------------------------

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms))

// ---- Farm summary --------------------------------------------------------
export async function getFarmOverview() {
  await delay(300)
  return {
    totalAcres: 12.5,
    location: 'Nashik, Maharashtra',
    activeCrops: ['Wheat', 'Rice', 'Maize'],
    healthScore: 'Good',
    healthNote: 'Your crops are healthy',
  }
}

export async function getSoilMoisture() {
  await delay(300)
  return { value: 68, status: 'Optimal' }
}

// ---- AI action items ------------------------------------------------------
export async function getAiActions() {
  await delay(400)
  return [
    {
      id: 'act-1',
      icon: 'leaf',
      title: 'Apply Urea Fertilizer',
      detail: 'Recommended for your Wheat crop during this growth stage.',
      status: 'Due',
      tone: 'clay',
    },
    {
      id: 'act-2',
      icon: 'shield',
      title: 'Low Pest Risk',
      detail: 'No major pest threat detected in your crops this week.',
      status: 'Good',
      tone: 'forest',
    },
    {
      id: 'act-3',
      icon: 'droplet',
      title: 'Irrigation Suggested',
      detail: 'Soil moisture is optimal. Next irrigation suggested in 2 days.',
      status: 'Upcoming',
      tone: 'sky',
    },
  ]
}

// ---- Real-time sensors ------------------------------------------------------
export async function getSensorSnapshot() {
  await delay(300)
  return [
    { id: 'moisture', label: 'Soil Moisture', value: 68, unit: '%', status: 'Optimal', tone: 'sky' },
    { id: 'temperature', label: 'Temperature', value: 28, unit: '°C', status: 'Normal', tone: 'berry' },
    { id: 'humidity', label: 'Humidity', value: 60, unit: '%', status: 'Normal', tone: 'sky' },
    { id: 'ph', label: 'Soil pH', value: 6.5, unit: '', status: 'Slightly Acidic', tone: 'forest' },
  ]
}

// Generates a plausible-looking 24-point time series for a sensor.
function seriesFor(base, spread) {
  return Array.from({ length: 24 }, (_, i) => ({
    t: `${i}:00`,
    v: Math.round((base + Math.sin(i / 3) * spread + (Math.random() - 0.5) * spread * 0.4) * 10) / 10,
  }))
}

export async function getSensorHistory(sensorId) {
  await delay(400)
  const map = {
    moisture: seriesFor(65, 8),
    temperature: seriesFor(27, 4),
    humidity: seriesFor(58, 10),
    ph: seriesFor(6.5, 0.4),
  }
  return map[sensorId] ?? seriesFor(50, 10)
}

export async function getSensorAlerts() {
  await delay(300)
  return [
    { id: 'a1', level: 'info', message: 'Soil moisture stable at optimal range for 3 days.', time: '2h ago' },
    { id: 'a2', level: 'warning', message: 'Humidity trending upward — monitor for fungal risk.', time: '5h ago' },
    { id: 'a3', level: 'info', message: 'Soil pH within ideal range for wheat.', time: '1d ago' },
  ]
}

// ---- Weather ----------------------------------------------------------------
export async function getCurrentWeather() {
  await delay(300)
  return {
    tempC: 28,
    condition: 'Partly Cloudy',
    min: 20,
    max: 31,
    humidity: 60,
    wind: 11,
    rainChance: 20,
  }
}

export async function getWeeklyForecast() {
  await delay(400)
  return [
    { day: 'Today', condition: 'partly-cloudy', max: 31, min: 20, rain: 20 },
    { day: 'Fri', condition: 'sunny', max: 32, min: 21, rain: 5 },
    { day: 'Sat', condition: 'rainy', max: 29, min: 19, rain: 70 },
    { day: 'Sun', condition: 'rainy', max: 28, min: 20, rain: 80 },
    { day: 'Mon', condition: 'sunny', max: 30, min: 21, rain: 10 },
    { day: 'Tue', condition: 'partly-cloudy', max: 29, min: 20, rain: 30 },
    { day: 'Wed', condition: 'sunny', max: 31, min: 22, rain: 5 },
  ]
}

// ---- AI Chat ------------------------------------------------------------
export async function sendChatMessage(message) {
  await delay(700)
  const canned = [
    "Based on your soil moisture readings, I'd hold off irrigation for another 2 days.",
    'Your wheat crop is in the tillering stage — a nitrogen top-dress now will help.',
    'Current humidity levels are a touch high. Keep an eye out for early blight symptoms.',
    "That's within normal range for this season in your region. No action needed today.",
  ]
  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    text: canned[Math.floor(Math.random() * canned.length)],
  }
}

// ---- Crop Doctor ----------------------------------------------------------
export async function diagnoseCropImage(_file) {
  await delay(1600)
  const results = [
    {
      disease: 'Leaf Blight (Early Stage)',
      confidence: 87,
      severity: 'Moderate',
      crop: 'Wheat',
      treatment: [
        'Apply a copper-based fungicide within the next 48 hours.',
        'Remove and destroy visibly infected leaves to slow spread.',
        'Avoid overhead irrigation until symptoms subside.',
        'Re-inspect the field in 5–7 days for improvement.',
      ],
    },
    {
      disease: 'Healthy Leaf',
      confidence: 96,
      severity: 'None',
      crop: 'Rice',
      treatment: [
        'No treatment needed — crop shows no signs of disease.',
        'Continue current irrigation and fertilization schedule.',
      ],
    },
  ]
  return results[Math.floor(Math.random() * results.length)]
}

// ---- Recommendations / Records / Cost (used by lighter pages) -----------
export async function getRecommendations() {
  await delay(300)
  return [
    { id: 'r1', title: 'Rotate to legumes next season', detail: 'Improves nitrogen levels in Plot B after wheat harvest.' },
    { id: 'r2', title: 'Install drip irrigation on Plot A', detail: 'Could reduce water usage by up to 30%.' },
    { id: 'r3', title: 'Soil test recommended', detail: "It's been 8 months since your last soil test." },
  ]
}

export async function getFarmRecords() {
  await delay(300)
  return [
    { id: 'f1', date: '2026-07-18', activity: 'Fertilizer applied', crop: 'Wheat', notes: 'Urea, 40kg' },
    { id: 'f2', date: '2026-07-10', activity: 'Irrigation', crop: 'Rice', notes: 'Flood irrigation, 2hrs' },
    { id: 'f3', date: '2026-06-29', activity: 'Sowing', crop: 'Maize', notes: 'Plot C, hybrid seed' },
  ]
}

export async function getCostEstimate() {
  await delay(300)
  return {
    items: [
      { label: 'Seeds', amount: 8500 },
      { label: 'Fertilizer', amount: 12400 },
      { label: 'Irrigation', amount: 6200 },
      { label: 'Labor', amount: 15800 },
      { label: 'Pesticides', amount: 4300 },
    ],
    projectedRevenue: 68000,
  }
}
