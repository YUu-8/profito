import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import projects from '../data/projects'

/* ─────────────────────────────────────────────────────────
   GlowCard — identical to Home.jsx
───────────────────────────────────────────────────────── */
function GlowCard({ children, className, glowColor = '#3B82F6', onClick }) {
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const cfg = { stiffness: 240, damping: 22 }
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [13, -13]), cfg)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-13, 13]), cfg)
  const scale   = useSpring(1, { stiffness: 180, damping: 16 })

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top)  / r.height
    mx.set(px - 0.5); my.set(py - 0.5)
    setSpot({ x: px * 100, y: py * 100, on: true })
  }
  function onEnter() { scale.set(1.07) }
  function onLeave() {
    mx.set(0); my.set(0); scale.set(1)
    setSpot(s => ({ ...s, on: false }))
  }

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        rotateX, rotateY, scale,
        transformStyle: 'preserve-3d',
        boxShadow: spot.on
          ? `0 0 0 1px ${glowColor}55, 0 32px 80px ${glowColor}35`
          : '0 1px 4px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.35s ease',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: spot.on ? 1 : 0,
          transition: 'opacity 0.3s',
          background: `radial-gradient(circle 220px at ${spot.x}% ${spot.y}%, ${glowColor}28, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Filter config
───────────────────────────────────────────────────────── */
const FILTERS = [
  { key: 'All',    labelKey: 'projects.filter_all' },
  { key: 'ML',     labelKey: 'projects.filter_ml' },
  { key: 'Data',   labelKey: 'projects.filter_data' },
  { key: 'DevOps', labelKey: 'projects.filter_devops' },
]

/* ─────────────────────────────────────────────────────────
   Project card with video-hover-play
───────────────────────────────────────────────────────── */
function ProjectCard({ p, lang, t, onClick }) {
  const videoRef = useRef(null)

  function onVideoEnter() { videoRef.current?.play() }
  function onVideoLeave() {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <GlowCard
      glowColor={p.color}
      className="glass-card rounded-2xl cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* Video or color bar */}
      {p.video ? (
        <div
          className="relative overflow-hidden group/video"
          style={{ height: 168 }}
          onMouseEnter={onVideoEnter}
          onMouseLeave={onVideoLeave}
        >
          <video
            ref={videoRef}
            src={p.video}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 group-hover/video:opacity-0 transition-opacity duration-300">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: `${p.color}cc`, boxShadow: `0 0 20px ${p.color}80` }}
            >
              <svg width="16" height="18" viewBox="0 0 16 18" fill="white">
                <path d="M1 1l14 8L1 17V1z" />
              </svg>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}33)` }}
          />
        </div>
      ) : (
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}33)` }} />
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }}
          />
          <h3 className="font-semibold text-white text-sm">
            {lang === 'zh' ? p.title : lang === 'fr' ? p.titleFr : p.titleEn}
          </h3>
        </div>
        <p
          className="text-gray-400 text-xs leading-relaxed mb-4 flex-1"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {p.description[lang] || p.description.en}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {p.stack.map(s => (
            <span
              key={s}
              className="px-2 py-0.5 text-xs text-gray-400 rounded"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {s}
            </span>
          ))}
        </div>
        {/* Accent bar + View Details */}
        <div
          className="h-px w-full mb-3"
          style={{ background: `linear-gradient(90deg, ${p.color}66, transparent)` }}
        />
        <span
          className="text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: p.color }}
        >
          {t('projects.view_details')} →
        </span>
      </div>
    </GlowCard>
  )
}

/* ─────────────────────────────────────────────────────────
   Projects page
───────────────────────────────────────────────────────── */
export default function Projects() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.categories.includes(activeFilter))

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#07101f' }}>

      {/* Background layers */}
      <div className="line-grid fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      <div className="dot-grid fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="noise-overlay fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-28" style={{ zIndex: 10 }}>

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white">{t('projects.title')}</h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            style={{ originX: 0 }}
            className="mt-3 h-px w-24 bg-gradient-to-r from-blue-400 to-transparent"
          />
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                activeFilter === f.key
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                  : 'glass-card text-gray-400 hover:text-white border-transparent'
              }`}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <ProjectCard
                p={p}
                lang={lang}
                t={t}
                onClick={() => navigate(`/projects/${p.id}`)}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
