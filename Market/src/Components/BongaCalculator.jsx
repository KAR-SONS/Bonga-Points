import React,{useState} from 'react'

const BongaCalculator = () => {
    const [bongaPoints, setBongaPoints] = useState('');
    const [kshAmount, setKshAmount] = useState(0);
    const [mode, setMode] = useState('points');

    const RATE = 0.12

    const handleBongaChange = (value) => {
    setBongaPoints(value)
    if (mode === 'points') {
      const points = parseFloat(value) || 0
      setKshAmount((points * RATE).toFixed(2))
    }
}

    const handleKshChange = (value) => {
    setKshAmount(value)
    if (mode === 'ksh') {
      const ksh = parseFloat(value) || 0
      setBongaPoints((ksh / RATE).toFixed(0))
    }
  }

    const toggleMode = () => {
    if (mode === 'points') {
      setMode('ksh')
    } else {
      setMode('points')
      const ksh = parseFloat(kshAmount) || 0
      setBongaPoints((ksh / RATE).toFixed(0))
      setKshAmount('')
    }
  }

  const commonAmounts = [1000, 5000, 10000, 25000, 50000]

  return (
     <div className="space-y-8">
      {/* Main Calculator */}
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Bonga Points Input */}
          <div>
            <label className="block text-sm font-semibold text-[#0f172a] mb-3">
              Bonga Points
            </label>
            <div className="relative">
              <input
                type="number"
                value={bongaPoints}
                onChange={(e) => handleBongaChange(e.target.value)}
                placeholder="Enter points"
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-[#1ea84c] bg-[#ffffff] text-[#0f172a] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#1ea84c] focus:border-transparent transition-all text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#666666]">
                pts
              </span>
            </div>
          </div>

          {/* Conversion Arrow */}
          <div className="flex items-end justify-center pb-3">
            <button
              onClick={toggleMode}
              className="p-2 rounded-lg bg-[#1ea84c]/10 hover:bg-[#1ea84c]/20 text-[#1ea84c] transition-colors"
              title="Switch calculation direction"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* KSH Amount Input */}
          <div className="sm:col-start-2">
            <label className="block text-sm font-semibold text-[#0f172a] mb-3">
              Cash in Hand (KSH)
            </label>
            <div className="relative">
              <input
                type="number"
                value={kshAmount}
                onChange={(e) => handleKshChange(e.target.value)}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border border-[#1ea84c] bg-[#ffffff] text-[#0f172a] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#1ea84c] focus:border-transparent transition-all text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#666666]">
                KSH
              </span>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="rounded-lg bg-[#f5f5f5]/40 p-4 border border-[#e5e5e5]">
          <p className="text-sm text-[#666666]">Exchange Rate</p>
          <p className="text-2xl font-bold text-[#1ea84c] mt-1">
            1 point = KSH {RATE}
          </p>
        </div>
      </div>

      {/* Quick Amounts */}
      <div>
        <p className="text-sm font-semibold text-[#0f172a] mb-3">Quick Examples</p>
        <div className="grid grid-cols-2 gap-2">
          {commonAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setBongaPoints(amount.toString())
                setKshAmount((amount * RATE).toFixed(2))
              }}
              className="p-3 rounded-lg border border-[#e5e5e5] hover:border-[#1ea84c] bg-[#ffffff] hover:bg-[#1ea84c]/5 transition-all text-center"
            >
              <p className="text-sm text-[#666666]">
                {amount.toLocaleString()} pts
              </p>
              <p className="font-semibold text-[#0f172a]">
                KSH {(amount * RATE).toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Breakdown */}
      {(parseInt(bongaPoints) > 0 || parseFloat(kshAmount) > 0) && (
        <div className="rounded-lg bg-[#f5f5f5]/5 border border-[#e5e5e5] p-6 space-y-3">
          <h3 className="font-semibold text-[#0f172a]">Conversion Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#666666]">Bonga Points</span>
              <span className="font-semibold text-[#0f172a]">
                {parseInt(bongaPoints) > 0 ? bongaPoints : '0'} points
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Exchange Rate</span>
              <span className="font-medium text-[#0f172a]">
                KSH {RATE} / point
              </span>
            </div>
            <div className="border-t border-[#e5e5e5] pt-2 flex justify-between">
              <span className="text-[#0f172a] font-semibold">Total KSH</span>
              <span className="text-lg font-bold text-[#1ea84c]">
                KSH {parseFloat(kshAmount) > 0 ? kshAmount : '0'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="rounded-lg bg-[#f5f5f5]/30 p-4 space-y-2 border border-[#e5e5e5]">
        <p className="text-sm text-[#666666]">
          💡 <strong>Pro Tip:</strong> This calculator shows the exact conversion. The final amount you receive may vary slightly depending on M-Pesa charges.
        </p>
      </div>
    </div>
  )
}

export default BongaCalculator