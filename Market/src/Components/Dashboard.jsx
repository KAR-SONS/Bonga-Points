import React,{useState} from 'react'
import BongaForm from './BongaForm';
import BongaCalculator from './BongaCalculator';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('calc');
  return (
    <main className="min-h-screen bg-[#f9fafb] py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
            {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-[#1ea84c]/10 px-4 py-2">
            <span className="text-md font-semibold text-[#1ea84c]">Bonga Points Marketplace</span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-[#0f172a] sm:text-5xl">
            Convert Your Points to Cash
          </h1>
          <p className="mt-4 text-pretty text-lg text-[#666666]">
            Instant payouts to M-Pesa. No signup required.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex gap-3 border-b border-[#e5e5e5]">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'form'
                ? 'border-b-2 border-[#1ea84c] text-[#0f172a]'
                : 'text-[#666666] hover:text-[#0f172a]'
            }`}
          >
            Sell Bonga Points
          </button>
          <button
            onClick={() => setActiveTab('calc')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'calc'
                ? 'border-b-2 border-[#1ea84c] text-[#0f172a]'
                : 'text-[#666666] hover:text-[#0f172a]'
            }`}
          >
            Calculator
          </button>
        </div>

        {/* Tab Content */}
         <div className="rounded-xl border border-[#1ea84c] bg-[#ffffff] p-8 shadow-sm">
          {activeTab === 'form' && <BongaForm />}
          {activeTab === 'calc' && <BongaCalculator />}
        </div>

        {/* Footer Info */}
        <div className="mt-8 space-y-4 rounded-lg bg-[#f5f5f5]/30 p-6">
          <div className="flex gap-3">
            <div className="text-2xl">✓</div>
            <div>
              <p className="font-semibold text-[#0f172a]">Instant Payouts</p>
              <p className="text-md text-[#666666]">Funds sent directly to your M-Pesa account</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-2xl">✓</div>
            <div>
              <p className="font-semibold text-[#0f172a]">No Signup Needed</p>
              <p className="text-md text-[#666666]">Just enter your details and convert points</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-2xl">✓</div>
            <div>
              <p className="font-semibold text-[#0f172a]">Fair Rates</p>
              <p className="text-md text-[#666666]">1 point = KSH 0.12 (always transparent)</p>
            </div>
          </div>
        </div>
        </div>
    </main>
  )
}

export default Dashboard