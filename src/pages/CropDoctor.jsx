import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import ImageUpload from '../components/cropdoctor/ImageUpload'
import DiagnosisResult from '../components/cropdoctor/DiagnosisResult'
import { diagnoseCropImage } from '../data/mockApi'

export default function CropDoctor() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleFile(f) {
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
  }

  function handleClear() {
    setFile(null)
    setPreview(null)
    setResult(null)
  }

  async function handleDiagnose() {
    setLoading(true)
    const res = await diagnoseCropImage(file)
    setResult(res)
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card className="p-5">
        <p className="text-sm font-semibold text-ink-900 mb-3">Upload Crop Photo</p>
        <ImageUpload onFile={handleFile} preview={preview} onClear={handleClear} />
        <Button
          className="w-full mt-4"
          icon={loading ? Loader2 : Sparkles}
          disabled={!file || loading}
          onClick={handleDiagnose}
        >
          {loading ? 'Analyzing image...' : 'Run AI Diagnosis'}
        </Button>
        <p className="text-[11px] text-ink-500 mt-3 leading-relaxed">
          Tip: take a close-up photo in natural daylight, focused on the affected leaf area, for the most accurate result.
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-ink-900 mb-3">Diagnosis Result</p>
        {loading && (
          <div className="h-64 flex flex-col items-center justify-center gap-3 text-ink-500">
            <Loader2 size={26} className="animate-spin text-forest-600" />
            <p className="text-sm">Scanning leaf pattern with AI model...</p>
          </div>
        )}
        {!loading && !result && (
          <div className="h-64 flex flex-col items-center justify-center gap-2 text-ink-400 text-center px-6">
            <Sparkles size={28} />
            <p className="text-sm">Upload a photo and run diagnosis to see results here.</p>
          </div>
        )}
        {!loading && result && <DiagnosisResult result={result} />}
      </Card>
    </div>
  )
}
