import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Booking() {
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState({ type: '', id: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const hash = new URLSearchParams((window.location.hash || '').replace('#', ''))
    const type = hash.get('type') || ''
    const id = hash.get('id') || ''
    if (type && id) {
      setParams({ type, id })
      setOpen(true)
    }
    const onHash = () => {
      const h = new URLSearchParams((window.location.hash || '').replace('#', ''))
      const t = h.get('type') || ''
      const i = h.get('id') || ''
      setParams({ type: t, id: i })
      setOpen(Boolean(t && i))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const [form, setForm] = useState({
    date: '',
    time: '',
    participants: 1,
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_type: params.type === 'instructor' ? 'instructor' : 'tour',
          item_id: params.id,
          ...form
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Booking failed')
      setStatus({ ok: true, message: 'Booking request created! We will contact you shortly.' })
      setForm({ date: '', time: '', participants: 1, name: '', email: '', phone: '', notes: '' })
      window.location.hash = ''
      setOpen(false)
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur" onClick={() => { setOpen(false); window.location.hash = '' }} />
          <motion.form onSubmit={submit} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="relative w-full max-w-lg bg-slate-900 border border-white/10 p-6 rounded-xl">
            <h3 className="text-white text-xl font-semibold mb-1">Complete your booking</h3>
            <p className="text-blue-200 text-sm mb-4">Confirm details and we’ll secure your spot.</p>

            <div className="grid grid-cols-2 gap-3">
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="col-span-1 bg-slate-800 text-blue-100 border border-white/10 rounded-md px-3 py-2" />
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="col-span-1 bg-slate-800 text-blue-100 border border-white/10 rounded-md px-3 py-2" />
              <input min={1} type="number" value={form.participants} onChange={(e) => setForm({ ...form, participants: Number(e.target.value) })} className="col-span-2 bg-slate-800 text-blue-100 border border-white/10 rounded-md px-3 py-2" placeholder="Participants" />
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="col-span-1 bg-slate-800 text-blue-100 border border-white/10 rounded-md px-3 py-2" placeholder="Your name" />
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="col-span-1 bg-slate-800 text-blue-100 border border-white/10 rounded-md px-3 py-2" placeholder="Email" />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="col-span-2 bg-slate-800 text-blue-100 border border-white/10 rounded-md px-3 py-2" placeholder="Phone (optional)" />
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="col-span-2 bg-slate-800 text-blue-100 border border-white/10 rounded-md px-3 py-2" placeholder="Notes (optional)" />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button type="button" onClick={() => { setOpen(false); window.location.hash = '' }} className="px-4 py-2 rounded-md border border-white/10 text-blue-100 hover:bg-white/5">Cancel</button>
              <button disabled={loading} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60">{loading ? 'Booking...' : 'Confirm booking'}</button>
            </div>

            {status && (
              <div className={`mt-3 text-sm ${status.ok ? 'text-green-300' : 'text-red-300'}`}>{status.message}</div>
            )}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
