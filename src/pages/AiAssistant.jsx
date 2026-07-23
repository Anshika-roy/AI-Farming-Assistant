import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sprout, Mic, Send, Loader2, User } from 'lucide-react'
import Card from '../components/common/Card'
import QuickActions from '../components/chat/QuickActions'
import { sendChatMessage } from '../data/mockApi'

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi Ramesh! Ask me anything about crop care, pests, irrigation timing, or fertilizer schedules for your farm.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function handleSend(text) {
    const content = text ?? input
    if (!content.trim()) return
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text: content }])
    setInput('')
    setLoading(true)
    const reply = await sendChatMessage(content)
    setMessages((m) => [...m, reply])
    setLoading(false)
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-160px)] max-h-[720px]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.role === 'assistant' ? 'bg-forest-700 text-white' : 'bg-ink-900/10 text-ink-700'
              }`}
            >
              {m.role === 'assistant' ? <Sprout size={15} /> : <User size={15} />}
            </div>
            <div
              className={`max-w-[75%] text-sm px-4 py-3 rounded-2xl leading-relaxed ${
                m.role === 'assistant'
                  ? 'bg-forest-50 text-ink-900 rounded-bl-sm'
                  : 'bg-forest-700 text-white rounded-br-sm'
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-ink-500 text-xs pl-10">
            <Loader2 size={14} className="animate-spin" /> AgriMind is thinking...
          </div>
        )}
      </div>

      <div className="px-5 sm:px-6 pb-3">
        <QuickActions onSelect={(_, label) => handleSend(label)} />
      </div>

      <div className="p-4 border-t border-ink-900/5 flex items-center gap-2">
        <button className="w-10 h-10 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center shrink-0 hover:bg-forest-100">
          <Mic size={17} />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about crops, pests, irrigation, fertilizer..."
          className="flex-1 text-sm bg-forest-50 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-forest-300"
        />
        <button
          onClick={() => handleSend()}
          className="w-10 h-10 rounded-full bg-forest-700 text-white flex items-center justify-center shrink-0 hover:bg-forest-800"
        >
          <Send size={16} />
        </button>
      </div>
    </Card>
  )
}
