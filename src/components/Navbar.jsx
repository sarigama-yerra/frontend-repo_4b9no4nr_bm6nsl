import { useState } from 'react'
import { Menu, Snowflake, Mountain, Bike } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-slate-900/50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-white">
          <Snowflake className="w-6 h-6 text-blue-400" />
          <span className="font-semibold">Let’s Ride Team</span>
        </a>
        <div className="hidden sm:flex items-center gap-6 text-sm text-blue-200">
          <a href="#instructors" className="hover:text-white transition-colors">Instructors</a>
          <a href="#tours" className="hover:text-white transition-colors">ATV Tours</a>
          <a href="#tours" className="hover:text-white transition-colors">Snowmobile</a>
          <a href="#book" className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors">
            <Mountain className="w-4 h-4" /> Book now
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="sm:hidden text-white">
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden border-t border-white/10"
          >
            <div className="px-4 py-3 space-y-2 text-blue-100">
              <a href="#instructors" onClick={() => setOpen(false)} className="block py-1">Instructors</a>
              <a href="#tours" onClick={() => setOpen(false)} className="block py-1">ATV Tours</a>
              <a href="#tours" onClick={() => setOpen(false)} className="block py-1">Snowmobile</a>
              <a href="#book" onClick={() => setOpen(false)} className="block py-1">Book now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
