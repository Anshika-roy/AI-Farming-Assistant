import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Volume2, Sparkles } from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { sendChatMessage } from '../data/mockApi'

const prompts = [
  'What should I do about pests this week?',
  'When should I irrigate next?',
  "What's the weather like tomorrow?",
  'Give me the market price for wheat.',
]

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false)
  const [reply, setReply] = useState(null)
  const [heard, setHeard] = useState('')

  async function simulateVoice(prompt) {
    setHeard(prompt)
    setListening(true)
    setReply(null)
    const res = await sendChatMessage(prompt)
    setListening(false)
    setReply(res.text)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-8 flex flex-col items-center text-center gap-5">
        <div className="relative">
          {listening && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full bg-forest-400/40"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-forest-400/30"
                animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, delay: 0.3 }}
              />
            </>
          )}
          <button
            onClick={() => simulateVoice(prompts[Math.floor(Math.random() * prompts.length)])}
            className="relative w-24 h-24 rounded-full bg-forest-700 text-white flex items-center justify-center shadow-lift hover:bg-forest-800"
          >
            <Mic size={34} />
          </button>
        </div>
        <div>
          <p className="font-semibold text-ink-900">
            {listening ? 'Listening...' : 'Tap to speak with AgriMind'}
          </p>
          <p className="text-sm text-ink-500 mt-1">
            Ask about crop care, weather, pests, or market prices — hands-free.
          </p>
        </div>

        <AnimatePresence>
          {heard && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full text-left bg-forest-50 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-start gap-2">
                <Volume2 size={16} className="text-ink-500 mt-0.5 shrink-0" />
                <p className="text-sm text-ink-700 italic">"{heard}"</p>
              </div>
              {reply ? (
                <div className="flex items-start gap-2 pt-3 border-t border-ink-900/5">
                  <Sparkles size={16} className="text-forest-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-ink-900 leading-relaxed">{reply}</p>
                </div>
              ) : (
                <p className="text-xs text-ink-500 pl-6">Thinking...</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-ink-900 mb-3">Try asking</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {prompts.map((p) => (
            <Button key={p} variant="outline" className="justify-start text-left" onClick={() => simulateVoice(p)}>
              {p}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
