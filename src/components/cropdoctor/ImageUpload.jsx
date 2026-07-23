import { useRef, useState } from 'react'
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react'

export default function ImageUpload({ onFile, preview, onClear }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function handleFiles(files) {
    const file = files?.[0]
    if (file) onFile(file)
  }

  return (
    <div>
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-forest-100">
          <img src={preview} alt="Uploaded crop" className="w-full h-64 object-cover" />
          <button
            onClick={onClear}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            handleFiles(e.dataTransfer.files)
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 h-64 rounded-2xl border-2 border-dashed cursor-pointer transition-colors ${
            dragging ? 'border-forest-400 bg-forest-50' : 'border-forest-200 bg-forest-50/40 hover:bg-forest-50'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-forest-100 flex items-center justify-center text-forest-700">
            <UploadCloud size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-ink-900">Drop a crop leaf photo here</p>
            <p className="text-xs text-ink-500 mt-0.5">or click to browse — JPG, PNG up to 10MB</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}
    </div>
  )
}
