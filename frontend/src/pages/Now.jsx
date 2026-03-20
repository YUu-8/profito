import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { STATUS, ACTIVITIES, LEARNING_TAGS } from '../data/now'

/* ── GlowCard ──────────────────────────────────────────────── */
function GlowCard({ children, className = '', glowColor = '#3B82F6' }) {
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })
  const cfg = { stiffness: 240, damping: 22 }
  const mx  = useMotionValue(0)
  const my  = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), cfg)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), cfg)
  const scale   = useSpring(1, { stiffness: 180, damping: 16 })

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top)  / r.height - 0.5)
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true })
  }
  function onEnter() { scale.set(1.04) }
  function onLeave() { mx.set(0); my.set(0); scale.set(1); setSpot(s => ({ ...s, on: false })) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{
        rotateX, rotateY, scale,
        transformStyle: 'preserve-3d',
        boxShadow: spot.on
          ? `0 0 0 1px ${glowColor}55, 0 28px 70px ${glowColor}28`
          : '0 1px 4px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.3s ease',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {spot.on && (
        <div className="pointer-events-none absolute inset-0 z-10" style={{
          background: `radial-gradient(180px circle at ${spot.x}% ${spot.y}%, ${glowColor}15, transparent 70%)`,
        }} />
      )}
      {children}
    </motion.div>
  )
}

/* ── Lightbox ──────────────────────────────────────────────── */
function Lightbox({ images, startIndex, title, onClose }) {
  const [current, setCurrent] = useState(startIndex)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % images.length)
      if (e.key === 'ArrowLeft')  setCurrent(c => (c - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* Main image */}
      <motion.img
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={images[current]}
        alt={`${title} ${current + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      />

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl leading-none transition-colors">
        ×
      </button>

      {/* Prev / Next (only if multiple images) */}
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >‹</button>
          <button
            onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >›</button>
          {/* Dot indicators */}
          <div className="absolute bottom-5 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i) }}
                className="w-2 h-2 rounded-full transition-colors"
                style={{ background: i === current ? '#fff' : 'rgba(255,255,255,0.3)' }}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

/* ── Activity card ─────────────────────────────────────────── */
const GLOW_COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B']

function ActivityCard({ activity, index, lang }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const title  = activity.title[lang] || activity.title.en
  const desc   = activity.desc[lang]  || activity.desc.en
  const date   = activity.date[lang]  || activity.date.en
  const color  = GLOW_COLORS[index % GLOW_COLORS.length]
  const images = activity.images || []

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
      >
        <GlowCard
          glowColor={color}
          className="glass-card rounded-2xl h-full flex flex-col"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Images: side by side, scroll if overflow */}
          {images.length > 0 && (
            <div
              className="flex gap-2 overflow-x-auto p-3 pb-0"
              style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
              onClick={e => e.stopPropagation()}
            >
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${title} ${idx + 1}`}
                  onClick={() => setLightboxIndex(idx)}
                  className="rounded-lg object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
                  style={{
                    height: 260,
                    flex: `1 1 calc(${100 / images.length}% - 8px)`,
                    minWidth: 220,
                    scrollSnapAlign: 'start',
                  }}
                />
              ))}
            </div>
          )}

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <p className="text-xs mb-3" style={{ color: color + 'cc' }}>{date}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{activity.emoji}</span>
              <h3 className="text-white font-semibold text-sm">{title}</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
          </div>
        </GlowCard>
      </motion.div>

      {/* Lightbox portal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}

/* ── Main page ─────────────────────────────────────────────── */
export default function Now() {
  const { t, i18n } = useTranslation()
  const lang   = i18n.language
  const status = STATUS[lang] || STATUS.en

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#07101f' }}>
      {/* Background layers */}
      <div className="noise-overlay" />
      <div className="dot-grid" />
      <div className="line-grid" />

      {/* Aurora blobs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none fixed rounded-full blur-3xl opacity-20"
        style={{ width: 520, height: 520, top: '-10%', left: '-8%',
          background: 'radial-gradient(circle, #3B82F6 0%, #1E3A8A 60%, transparent 100%)' }}
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none fixed rounded-full blur-3xl opacity-15"
        style={{ width: 420, height: 420, bottom: '5%', right: '-5%',
          background: 'radial-gradient(circle, #6366F1 0%, #4338CA 60%, transparent 100%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-24" style={{ zIndex: 10 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-blue-400 text-xs uppercase tracking-widest mb-3">
            {t('now.eyebrow')}
          </p>
          <h1 className="text-5xl font-bold text-white mb-4">{t('now.title')}</h1>
          <p className="text-gray-400 text-sm max-w-md">{t('now.subtitle')}</p>
        </motion.div>

        {/* ── Status bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card rounded-2xl p-6 mb-14 flex flex-wrap gap-6 items-center"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
            </span>
            <span className="text-white text-sm font-medium">{status.value}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>📍</span><span>{status.city}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>🗓️</span><span>{status.since}</span>
          </div>
        </motion.div>

        {/* ── Recent activities ── */}
        <div className="mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="text-xs uppercase tracking-widest text-blue-400 mb-6"
          >
            {t('now.doing_title')}
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ACTIVITIES.map((act, i) => (
              <div key={act.id} className={act.images?.length > 0 ? 'sm:col-span-2' : ''}>
                <ActivityCard activity={act} index={i} lang={lang} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Learning tags ── */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="text-xs uppercase tracking-widest text-blue-400 mb-6"
          >
            {t('now.learning_title')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {LEARNING_TAGS.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-3 py-1.5 text-sm text-gray-300 rounded-full cursor-default hover:text-blue-300 transition-colors"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
