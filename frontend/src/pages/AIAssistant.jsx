import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react'

export default function AIAssistant(){
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const suggestions = [
    "What causes eczema?",
    "How to prevent fungal infections?",
    "Is melanoma dangerous?",
    "Tips for acne-prone skin",
    "When should I see a dermatologist?",
    "How to treat sunburn at home?"
  ]

  const responses = {
    "what causes eczema?": "Eczema (atopic dermatitis) is caused by a combination of immune system activation, genetic factors, environmental triggers, and skin barrier dysfunction. Common triggers include harsh soaps, allergens, cold/dry weather, and stress. Treatment involves moisturizing frequently, avoiding triggers, and using prescribed topical creams.",
    "how to prevent fungal infections?": "To prevent fungal skin infections: 1) Keep your skin clean and dry, especially in skin folds. 2) Change socks and underwear daily. 3) Wear footwear in public locker rooms/showers. 4) Choose breathable, moisture-wicking fabrics. 5) Avoid sharing personal items like towels or hairbrushes.",
    "is melanoma dangerous?": "Yes, melanoma is the most serious form of skin cancer because it can spread (metastasize) to other organs if not caught early. Monitor your skin using the ABCDE guidelines (Asymmetry, Border irregularity, Color changes, Diameter > 6mm, Evolving). Seek a dermatologist review immediately if you spot warning signs.",
    "tips for acne-prone skin": "Tips for managing acne-prone skin: 1) Wash your face twice daily with a gentle, non-comedogenic cleanser. 2) Avoid popping or picking lesions. 3) Use oil-free, non-comedogenic cosmetics. 4) Use over-the-counter products containing salicylic acid or benzoyl peroxide. 5) Consult a dermatologist for personalized treatments.",
    "when should i see a dermatologist?": "You should see a dermatologist if you have a changing or bleeding mole, persistent skin conditions that don't improve with over-the-counter care, severe acne, suspicious growths, or sudden, painful rashes.",
    "how to treat sunburn at home?": "To soothe a sunburn at home: 1) Apply cool, damp compresses to the skin. 2) Apply pure aloe vera gel or alcohol-free moisturizer. 3) Drink plenty of water to hydrate. 4) Take ibuprofen or acetaminophen if needed for discomfort. 5) Do not peel loose skin and protect affected areas from sun."
  }

  const handleSend = (text) => {
    if (!text.trim()) return

    const userMsg = { id: Date.now(), sender: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const normalizedText = text.trim().toLowerCase().replace(/[?.]/g, '')
      let replyText = "I'm a medical assistant trained to discuss skin conditions. For specific concerns, I highly recommend scheduling a consultation with a certified dermatologist."
      
      // Look for a close match in responses
      for (const [key, value] of Object.entries(responses)) {
        if (normalizedText.includes(key) || key.includes(normalizedText)) {
          replyText = value
          break
        }
      }

      const botMsg = { id: Date.now() + 1, sender: 'bot', text: replyText }
      setMessages(prev => [...prev, botMsg])
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="max-w-4xl mx-auto space-y-8 flex flex-col h-[calc(100vh-4rem)]">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">AI Medical Assistant</h2>
        <p className="text-slate-400 font-semibold text-sm mt-1">
          Ask me anything about skin health and conditions
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden relative min-h-[450px]">
        {messages.length === 0 ? (
          /* Empty Chat View / Suggestions */
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Sparkles className="w-8 h-8 stroke-[1.5]" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-700">How can I help?</h3>
              <p className="text-slate-400 font-medium text-sm">
                Ask me about skin conditions, symptoms, or skincare advice
              </p>
            </div>

            {/* Suggestions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full pt-4">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="px-4 py-3 bg-slate-50 border border-slate-100 hover:bg-[#1aa4a4]/5 hover:border-[#1aa4a4]/20 rounded-xl text-left text-xs font-bold text-slate-600 hover:text-[#1aa4a4] transition-all duration-200"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Active Chat Stream */
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex items-start gap-3.5 max-w-[80%] ${
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  m.sender === 'user' ? 'bg-[#00a8cc] text-white' : 'bg-teal-50 text-[#1aa4a4]'
                }`}>
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-[#00a8cc] text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-3.5 max-w-[80%]">
                <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#1aa4a4] shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 rounded-tl-none flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Chat Input Area */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(inputValue)
            }}
            className="flex items-center gap-3"
          >
            <input 
              type="text"
              placeholder="Ask about skin conditions..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1aa4a4] transition-all duration-150"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-[#00a8cc] hover:bg-[#008cb0] text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/10 hover:shadow-lg transition-all duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
