import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion'

/* ─────────────────────────────────────────────────────────
   GlowCard — identical to Home.jsx
───────────────────────────────────────────────────────── */
function GlowCard({ children, className, glowColor = '#3B82F6' }) {
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
   SectionHeading — identical to Home.jsx
───────────────────────────────────────────────────────── */
function SectionHeading({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <h2 className="text-2xl font-bold text-white">{children}</h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.25 }}
        style={{ originX: 0 }}
        className="mt-2 h-px w-20 bg-gradient-to-r from-blue-400 to-transparent"
      />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Skills data
───────────────────────────────────────────────────────── */
// Radar chart — exactly 6 axes
const SKILLS = [
  { label: 'Python / ML',    value: 90, color: '#3B82F6' },
  { label: 'Data Analysis',  value: 85, color: '#06B6D4' },
  { label: 'LLM / NLP',      value: 75, color: '#8B5CF6' },
  { label: 'Backend / API',  value: 78, color: '#10B981' },
  { label: 'Frontend',       value: 65, color: '#F59E0B' },
  { label: 'MLOps & DevOps', value: 72, color: '#EF4444' },
]

// Skill bars — more granular breakdown
const SKILL_BARS = [
  { label: 'Python',          value: 92, color: '#3B82F6' },
  { label: 'PyTorch / ML',    value: 88, color: '#3B82F6' },
  { label: 'Data Analysis',   value: 85, color: '#06B6D4' },
  { label: 'LLM / LangChain', value: 78, color: '#8B5CF6' },
  { label: 'FastAPI',         value: 80, color: '#10B981' },
  { label: 'Docker',          value: 75, color: '#06B6D4' },
  { label: 'CI/CD (GitHub Actions)', value: 72, color: '#EF4444' },
  { label: 'MLOps',           value: 70, color: '#EF4444' },
  { label: 'React / Vite',    value: 65, color: '#F59E0B' },
  { label: 'Azure / Cloud',   value: 65, color: '#6366F1' },
  { label: 'SQL',             value: 78, color: '#10B981' },
]

/* ─────────────────────────────────────────────────────────
   Hexagonal Radar Chart (SVG)
───────────────────────────────────────────────────────── */
function RadarChart() {
  const size   = 320
  const cx     = size / 2
  const cy     = size / 2
  const radius = 110
  const levels = 4
  const n      = SKILLS.length

  // JS-interpolated progress — most reliable SVG animation approach
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const controls = animate(0, 1, {
      duration: 0.9,
      ease: 'easeOut',
      delay: 0.3,
      onUpdate: v => setProgress(v),
    })
    return controls.stop
  }, [])

  function getPoint(level, index) {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = (radius * level) / levels
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  // Polygon vertices scaled by current progress (grows from center)
  function polygonPoints() {
    return SKILLS.map((s, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const r = radius * (s.value / 100) * progress
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
    }).join(' ')
  }

  function getDataPointPos(index) {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = radius * (SKILLS[index].value / 100) * progress
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  function getPercentLabelPos(index) {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = radius * (SKILLS[index].value / 100) + 14
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  function getLabelPos(index) {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    return { x: cx + (radius + 28) * Math.cos(angle), y: cy + (radius + 28) * Math.sin(angle) }
  }

  function getTextAnchor(index) {
    const cosA = Math.cos((Math.PI * 2 * index) / n - Math.PI / 2)
    if (Math.abs(cosA) < 0.15) return 'middle'
    return cosA > 0 ? 'start' : 'end'
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(59,130,246,0.35)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0.2)" />
        </radialGradient>
      </defs>

      {/* Concentric hexagonal grid rings */}
      {Array.from({ length: levels }).map((_, li) => {
        const pts = Array.from({ length: n }).map((__, i) => getPoint(li + 1, i))
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'
        return <path key={li} d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      })}

      {/* Axis lines */}
      {Array.from({ length: n }).map((_, i) => {
        const edge = getPoint(levels, i)
        return <line key={i} x1={cx} y1={cy} x2={edge.x} y2={edge.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      })}

      {/* Data polygon — points interpolated from center via JS */}
      <polygon
        points={polygonPoints()}
        fill="url(#radarFill)"
        stroke="#3B82F6"
        strokeWidth="2"
      />

      {/* Data point circles — move with polygon */}
      {SKILLS.map((_, i) => {
        const pt = getDataPointPos(i)
        return (
          <circle
            key={i}
            cx={pt.x} cy={pt.y} r={progress > 0.05 ? 4 : 0}
            fill="#3B82F6"
            style={{ filter: 'drop-shadow(0 0 6px #3B82F6)' }}
          />
        )
      })}

      {/* Percentage labels */}
      {SKILLS.map((s, i) => {
        const pt = getPercentLabelPos(i)
        return (
          <text
            key={i}
            x={pt.x} y={pt.y}
            textAnchor={getTextAnchor(i)}
            dominantBaseline="middle"
            fill="#93C5FD"
            fontSize="9"
            fontWeight="600"
            opacity={progress}
          >
            {s.value}%
          </text>
        )
      })}

      {/* Axis labels outside the chart */}
      {SKILLS.map((s, i) => {
        const pt = getLabelPos(i)
        return (
          <text
            key={i}
            x={pt.x}
            y={pt.y}
            textAnchor={getTextAnchor(i)}
            dominantBaseline="middle"
            fill="#CBD5E1"
            fontSize="11"
            fontWeight="500"
          >
            {s.label}
          </text>
        )
      })}
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────
   Skill Bar
───────────────────────────────────────────────────────── */
function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300 font-medium">{skill.label}</span>
        <span className="text-xs text-gray-400 font-mono">{skill.value}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Language colors
───────────────────────────────────────────────────────── */
const LANG_COLORS = {
  Python:     '#3B82F6',
  JavaScript: '#F1E05A',
  TypeScript: '#2B7489',
  R:          '#198CE7',
  HTML:       '#E34C26',
  CSS:        '#563D7C',
}
function langColor(lang) {
  return LANG_COLORS[lang] || '#6B7280'
}

/* ─────────────────────────────────────────────────────────
   GitHub Stats Section
───────────────────────────────────────────────────────── */
function GitHubStats({ t }) {
  const [repos, setRepos]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/users/YUu-8/repos?per_page=100&sort=stars')
      .then(res => {
        if (!res.ok) throw new Error('rate limited')
        return res.json()
      })
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-7 h-7 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="text-center py-10 text-sm rounded-xl"
        style={{
          color: '#FCA5A5',
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
      >
        {t('blog.api_error')}
      </div>
    )
  }

  // Compute summary stats
  const langCounts = {}
  repos.forEach(r => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1
  })
  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)

  // Top 5 languages for bar
  const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0)
  const top5Langs = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({ lang, count, pct: Math.round((count / totalLangRepos) * 100) }))

  return (
    <div className="space-y-10">

      {/* Contribution calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl p-6 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Contribution Activity</p>
        <img
          src="https://ghchart.rshah.org/3B82F6/YUu-8"
          alt="GitHub contribution chart"
          className="w-full"
          style={{ filter: 'brightness(1.15) contrast(1.1)' }}
        />
      </motion.div>

      {/* Commit activity graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <img
          src="https://github-readme-activity-graph.vercel.app/graph?username=YUu-8&theme=react-dark&hide_border=true&color=3B82F6&line=3B82F6&point=6366F1&area=true&area_color=3B82F680"
          alt="GitHub activity graph"
          className="w-full"
        />
      </motion.div>

      {/* Top repos grid */}
      <div>
        <h3 className="text-base font-semibold text-gray-300 mb-5">{t('blog.top_repos')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {topRepos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <GlowCard glowColor="#3B82F6" className="glass-card rounded-2xl p-5 flex flex-col h-full cursor-default">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-blue-300 text-sm hover:text-blue-200 hover:underline transition-colors leading-snug"
                  >
                    {repo.name}
                  </a>
                  <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                    ⭐ {repo.stargazers_count}
                  </span>
                </div>
                <p
                  className="text-gray-400 text-xs leading-relaxed flex-1 mb-3"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {repo.description || '—'}
                </p>
                {repo.language && (
                  <span
                    className="self-start px-2 py-0.5 text-xs rounded font-medium"
                    style={{
                      background: `${langColor(repo.language)}22`,
                      border: `1px solid ${langColor(repo.language)}55`,
                      color: langColor(repo.language) === '#F1E05A' ? '#92811a' : langColor(repo.language),
                    }}
                  >
                    {repo.language}
                  </span>
                )}
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Language breakdown */}
      <div>
        <h3 className="text-base font-semibold text-gray-300 mb-5">{t('blog.languages')}</h3>
        <div className="space-y-3">
          {top5Langs.map((item, i) => (
            <motion.div
              key={item.lang}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-300 font-medium">{item.lang}</span>
                <span className="text-xs text-gray-500 font-mono">{item.pct}%</span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: langColor(item.lang),
                    opacity: item.lang === 'JavaScript' ? 0.75 : 1,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Blog (Skills & Open Source)
───────────────────────────────────────────────────────── */
export default function Blog() {
  const { t } = useTranslation()

  useEffect(() => { window.scrollTo(0, 0) }, [])

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
          className="mb-16"
        >
          <h1 className="text-4xl font-bold text-white">{t('blog.title')}</h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            style={{ originX: 0 }}
            className="mt-3 h-px w-24 bg-gradient-to-r from-blue-400 to-transparent"
          />
        </motion.div>

        {/* ── Skills Section ──────────────────────────── */}
        <section className="mb-24">
          <SectionHeading>{t('blog.skills_title')}</SectionHeading>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Radar chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="shrink-0 flex flex-col items-center"
            >
              <p className="text-xs text-gray-500 mb-4 tracking-widest uppercase">{t('blog.radar_title')}</p>
              <div
                className="rounded-2xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <RadarChart />
              </div>
            </motion.div>

            {/* Skill bars */}
            <div className="flex-1 w-full pt-8">
              {SKILL_BARS.map((skill, i) => (
                <SkillBar key={skill.label} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── GitHub Section ──────────────────────────── */}
        <section>
          <SectionHeading>{t('blog.github_title')}</SectionHeading>
          <GitHubStats t={t} />
        </section>

      </div>
    </div>
  )
}
