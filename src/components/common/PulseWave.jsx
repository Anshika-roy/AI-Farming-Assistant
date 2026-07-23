// A tiny animated "living" sparkline — the signature motif reused across
// sensor cards to suggest continuously-updating field data.
export default function PulseWave({ color = '#3B82C4', className = '' }) {
  return (
    <svg viewBox="0 0 120 28" className={`w-full h-7 ${className}`} preserveAspectRatio="none">
      <path
        d="M0,18 C10,6 20,26 30,14 C40,4 50,22 60,12 C70,4 80,20 90,10 C100,2 110,16 120,8"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-wave"
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  )
}
