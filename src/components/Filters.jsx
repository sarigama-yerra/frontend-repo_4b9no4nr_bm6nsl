import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Filters({ onSearch }) {
  const [sport, setSport] = useState('')
  const [location, setLocation] = useState('')
  const [q, setQ] = useState('')

  useEffect(() => {
    const id = setTimeout(() => onSearch({ sport, location, q }), 350)
    return () => clearTimeout(id)
  }, [sport, location, q])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <select value={sport} onChange={(e) => setSport(e.target.value)} className="bg-slate-900/60 text-blue-100 border border-white/10 rounded-md px-3 py-2">
          <option value="">All sports</option>
          <option value="Ski">Ski</option>
          <option value="Snowboard">Snowboard</option>
        </select>
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (e.g., Sochi, Rosa Khutor)" className="bg-slate-900/60 text-blue-100 border border-white/10 rounded-md px-3 py-2" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or bio" className="bg-slate-900/60 text-blue-100 border border-white/10 rounded-md px-3 py-2" />
      </div>
    </motion.div>
  )
}
