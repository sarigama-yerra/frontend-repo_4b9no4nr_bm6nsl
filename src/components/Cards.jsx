import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function InstructorCards() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchItems = async (params = {}) => {
    setLoading(true)
    const qs = new URLSearchParams(params).toString()
    const res = await fetch(`${API}/api/instructors?${qs}`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div>
      {loading && <div className="text-blue-200">Loading...</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <motion.div key={it.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="h-44 bg-slate-800" style={{ backgroundImage: `url(${it.photo_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{it.name}</h3>
                <div className="flex items-center gap-1 text-yellow-300"><Star className="w-4 h-4 fill-yellow-300" /> {it.rating}</div>
              </div>
              <div className="text-blue-200 text-sm mt-1">{it.sport} • {it.level}</div>
              <div className="flex items-center gap-1 text-blue-300 text-sm mt-1"><MapPin className="w-4 h-4" /> {it.location}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-blue-100"><span className="text-white font-semibold">${'{'}it.hourly_rate{'}'}</span>/hr</div>
                <a href={`#book?type=instructor&id=${'{'}it.id{'}'}`} className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition">Book</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function TourCards() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchItems = async (params = {}) => {
    setLoading(true)
    const qs = new URLSearchParams(params).toString()
    const res = await fetch(`${API}/api/tours?${qs}`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div>
      {loading && <div className="text-blue-200">Loading...</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <motion.div key={it.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="h-44 bg-slate-800" style={{ backgroundImage: `url(${it.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{it.title}</h3>
                <div className="flex items-center gap-1 text-yellow-300"><Star className="w-4 h-4 fill-yellow-300" /> {it.rating}</div>
              </div>
              <div className="text-blue-200 text-sm mt-1 capitalize">{it.type}</div>
              <div className="flex items-center gap-1 text-blue-300 text-sm mt-1"><MapPin className="w-4 h-4" /> {it.location}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-blue-100"><span className="text-white font-semibold">${'{'}it.price_per_person{'}'}</span>/person</div>
                <a href={`#book?type=tour&id=${'{'}it.id{'}'}`} className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition">Book</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
