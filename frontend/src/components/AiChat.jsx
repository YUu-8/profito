import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

export default function AiChat() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '你好！我是Yuu的AI助手。你可以问我关于她的项目、技能、经历，或者用英语法语也可以！'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post('/api/chat', {
        messages: [...messages, userMsg]
      })
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.reply
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，出现了一点问题，请稍后再试。'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[500px] border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-medium text-dark">{t('ai.title')}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-primary text-white rounded-br-sm'
                : 'bg-gray-100 text-dark rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2.5 rounded-2xl rounded-bl-sm">
              <span className="text-xs text-gray-400">{t('ai.thinking')}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={t('ai.placeholder')}
          className="flex-1 text-sm px-4 py-2 border border-gray-200 rounded-full outline-none focus:border-primary transition-colors"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-primary text-white text-sm rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {t('ai.send')}
        </button>
      </div>
    </div>
  )
}
