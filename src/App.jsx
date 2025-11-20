import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Filters from './components/Filters'
import { InstructorCards, TourCards } from './components/Cards'
import Booking from './components/Booking'

function SectionTitle({ id, title, subtitle }) {
  return (
    <div id={id} className="max-w-6xl mx-auto px-4 mb-6">
      <h2 className="text-white text-2xl sm:text-3xl font-semibold">{title}</h2>
      <p className="text-blue-200 text-sm mt-1">{subtitle}</p>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.08),transparent_60%)]" aria-hidden />
      <Navbar />
      <Hero />

      <div className="max-w-6xl mx-auto px-4 space-y-10 pb-24">
        <section>
          <SectionTitle id="instructors" title="Certified ski & snowboard instructors" subtitle="Filter by sport, location and vibe" />
          <Filters onSearch={(params) => window.dispatchEvent(new CustomEvent('search-instructors', { detail: params }))} />
          {/* We re-render InstructorCards by listening to window event for simplicity */}
          <InstructorCardsWrapper />
        </section>

        <section>
          <SectionTitle id="tours" title="ATV & snowmobile tours" subtitle="Curated adventures across Russia" />
          <TourCards />
        </section>

        <footer className="text-center text-blue-300/70 pt-8 border-t border-white/10">
          <p>Powered by Let’s Ride Team • All bookings confirmed by email</p>
        </footer>
      </div>

      <Booking />
    </div>
  )
}

import { useEffect, useState } from 'react'
function InstructorCardsWrapper() {
  const [params, setParams] = useState({})
  useEffect(() => {
    const handler = (e) => setParams(e.detail)
    window.addEventListener('search-instructors', handler)
    return () => window.removeEventListener('search-instructors', handler)
  }, [])
  return <InstructorCards key={JSON.stringify(params)} {...params} />
}

export default App
