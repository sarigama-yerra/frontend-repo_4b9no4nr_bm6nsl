import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-500 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-blue-100 mb-6">
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span>Book instructors & engine tours in one place</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Ride the mountains. Your way.
          </h1>
          <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
            Compare certified ski & snowboard instructors. Explore ATV and snowmobile safaris. Book instantly with live availability.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#instructors" className="px-5 py-3 rounded-md bg-white text-slate-900 font-semibold hover:opacity-90 transition">Find instructor</a>
            <a href="#tours" className="px-5 py-3 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">Browse tours</a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto px-4 pb-16"
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Certified pros', value: '150+' },
            { label: 'Tours listed', value: '80+' },
            { label: 'Avg. rating', value: '4.8/5' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-blue-200">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
