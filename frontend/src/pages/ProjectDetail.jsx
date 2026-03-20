import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import projects from '../data/projects'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
})

/* ── GitHub icon ──────────────────────────────────── */
function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)

  const p = projects.find(x => x.id === Number(id))

  // prev / next
  const idx  = projects.findIndex(x => x.id === Number(id))
  const prev = projects[idx - 1] || null
  const next = projects[idx + 1] || null

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!p) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5" style={{ background: '#07101f' }}>
        <p className="text-gray-400">Project not found.</p>
        <button
          onClick={() => navigate('/projects')}
          className="px-5 py-2 text-sm text-gray-300 rounded-full border border-white/10 hover:text-white transition-colors"
        >
          {t('projects.back')}
        </button>
      </div>
    )
  }

  const title = lang === 'zh' ? p.title : lang === 'fr' ? p.titleFr : p.titleEn

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#07101f' }}>

      {/* Background layers */}
      <div className="line-grid fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      <div className="dot-grid fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="noise-overlay fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <div
        className="relative pt-20 pb-0 overflow-hidden"
        style={{ zIndex: 10 }}
      >
        {/* Colour wash behind hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${p.color}28, transparent 70%)`,
          }}
        />
        {/* Top border line in project colour */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12">

          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => navigate('/projects')}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {t('projects.back')}
          </motion.button>

          {/* Category badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {p.categories.map(cat => (
              <span
                key={cat}
                className="px-3 py-1 text-xs rounded-full font-medium tracking-wide"
                style={{ background: `${p.color}20`, border: `1px solid ${p.color}50`, color: p.color }}
              >
                {cat}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8"
          >
            {p.description[lang] || p.description.en}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-300 rounded-full transition-all hover:text-white hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}
            >
              <IconGitHub /> GitHub
            </a>
            {p.pdf && (
              <a
                href={p.pdf}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-full font-medium transition-all hover:-translate-y-0.5"
                style={{ background: `${p.color}22`, border: `1px solid ${p.color}55`, color: p.color }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                {t('projects.view_report')}
              </a>
            )}
          </motion.div>

          {/* Stack chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {p.stack.map(s => (
              <span
                key={s}
                className="px-2.5 py-1 text-xs text-gray-400 rounded-md"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────── */}
      <div className="relative max-w-5xl mx-auto px-6 pb-28" style={{ zIndex: 10 }}>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {p.metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${p.color}30` }}
            >
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{m.label}</p>
              <p className="text-2xl font-bold" style={{ color: p.color }}>{m.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Video */}
        {p.video && (
          <motion.div
            {...fadeUp(0)}
            className="mb-10 rounded-2xl overflow-hidden relative"
            style={{ border: `1px solid ${p.color}25`, boxShadow: `0 0 60px ${p.color}15` }}
          >
            <video
              ref={videoRef}
              src={p.video}
              className="w-full block"
              style={{ maxHeight: '520px', objectFit: 'cover' }}
              controls
              muted
              loop
              playsInline
              onCanPlay={() => setVideoReady(true)}
            />
            {!videoReady && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#07101f' }}>
                <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${p.color} transparent transparent transparent` }} />
              </div>
            )}
          </motion.div>
        )}

        {/* Live Demo Embed */}
        {p.demo && (
          <motion.div
            {...fadeUp(0)}
            className="mb-10 rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${p.color}25`, boxShadow: `0 0 60px ${p.color}15` }}
          >
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: `${p.color}12`, borderBottom: `1px solid ${p.color}20` }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-gray-400 uppercase tracking-widest">Live Demo</span>
              </div>
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1 rounded-full transition-colors"
                style={{ color: p.color, background: `${p.color}15` }}
              >
                Open ↗
              </a>
            </div>
            <iframe
              src={p.demo}
              title="Live Demo"
              className="w-full"
              style={{ height: '560px', border: 'none', background: '#fff' }}
              loading="lazy"
              allow="fullscreen"
            />
          </motion.div>
        )}

        {/* 2-column content */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Left — main sections (2/3) */}
          <div className="md:col-span-2 space-y-5">

            {/* Background */}
            <motion.div {...fadeUp(0.05)}>
              <div
                className="rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${p.color}20` }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: p.color }} />
                  <h2 className="font-semibold text-white text-base">{t('projects.background')}</h2>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {p.background[lang] || p.background.en}
                </p>
              </div>
            </motion.div>

            {/* Role */}
            <motion.div {...fadeUp(0.1)}>
              <div
                className="rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${p.color}20` }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: p.color }} />
                  <h2 className="font-semibold text-white text-base">{t('projects.role_label')}</h2>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {p.role[lang] || p.role.en}
                </p>
              </div>
            </motion.div>

            {/* Challenges */}
            <motion.div {...fadeUp(0.15)}>
              <div
                className="rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${p.color}20` }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: p.color }} />
                  <h2 className="font-semibold text-white text-base">{t('projects.challenges')}</h2>
                </div>
                <ul className="space-y-4">
                  {p.challenges.map((c, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
                      />
                      <p className="text-gray-400 text-sm leading-relaxed">{c[lang] || c.en}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right — sidebar (1/3) */}
          <div className="space-y-5">

            {/* Key results */}
            <motion.div {...fadeUp(0.1)}>
              <div
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${p.color}20` }}
              >
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">{t('projects.results')}</h3>
                <ul className="space-y-3">
                  {p.metrics.map((m, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-gray-400">{m.label}</span>
                      <span className="text-sm font-bold tabular-nums" style={{ color: p.color }}>{m.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Tech stack */}
            <motion.div {...fadeUp(0.15)}>
              <div
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid rgba(255,255,255,0.07)` }}
              >
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map(s => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-xs text-gray-300 rounded-md"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Links */}
            <motion.div {...fadeUp(0.2)}>
              <div
                className="rounded-2xl p-6 space-y-3"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid rgba(255,255,255,0.07)` }}
              >
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Links</h3>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <IconGitHub />
                  <span className="truncate">{p.github.replace('https://github.com/', '')}</span>
                </a>
                {p.pdf && (
                  <a
                    href={p.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-80"
                    style={{ color: p.color }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                    </svg>
                    Report PDF
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Prev / Next navigation ──────────────────── */}
        {(prev || next) && (
          <motion.div
            {...fadeUp(0.2)}
            className="mt-16 pt-8 flex items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {prev ? (
              <button
                onClick={() => navigate(`/projects/${prev.id}`)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-0.5">Previous</p>
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    {i18n.language === 'zh' ? prev.title : i18n.language === 'fr' ? prev.titleFr : prev.titleEn}
                  </p>
                </div>
              </button>
            ) : <div />}

            {next ? (
              <button
                onClick={() => navigate(`/projects/${next.id}`)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group text-right"
              >
                <div className="text-right">
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-0.5">Next</p>
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    {i18n.language === 'zh' ? next.title : i18n.language === 'fr' ? next.titleFr : next.titleEn}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ) : <div />}
          </motion.div>
        )}

      </div>
    </div>
  )
}
