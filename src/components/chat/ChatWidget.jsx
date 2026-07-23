import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sprout, Mic, Send, X, Loader2 } from 'lucide-react'
import QuickActions from './QuickActions'
import { sendChatMessage } from '../../data/mockApi'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', text: "Hi Ramesh! I'm your AI Farming Assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

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
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-forest-700 text-white shadow-lift flex items-center justify-center hover:bg-forest-800"
        aria-label="Open AI Assistant chat"
      >
        {open ? <X size={22} /> : <Sprout size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] bg-white rounded-2xl shadow-lift border border-forest-100 flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 bg-forest-700 text-white">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <Sprout size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">AI Farming Assistant</p>
                <p className="text-[11px] text-forest-100/80">Online now</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[85%] text-sm px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    m.role === 'assistant'
                      ? 'bg-forest-50 text-ink-900 rounded-tl-sm'
                      : 'bg-forest-700 text-white ml-auto rounded-tr-sm'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-ink-500 text-xs">
                  <Loader2 size={14} className="animate-spin" /> Thinking...
                </div>
              )}
            </div>

            <div className="px-4 pb-2">
              <QuickActions
                onSelect={(_, label) => handleSend(label)}
                className="pb-2"
              />
            </div>

            <div className="p-3 border-t border-ink-900/5 flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
                <Mic size={16} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your crops..."
                className="flex-1 text-sm bg-forest-50 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-forest-300"
              />
              <button
                onClick={() => handleSend()}
                className="w-9 h-9 rounded-full bg-forest-700 text-white flex items-center justify-center shrink-0 hover:bg-forest-800"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
