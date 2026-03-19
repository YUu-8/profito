import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import projects from '../data/projects'

/* ─────────────────────────────────────────────────────────
   GlowCard — 3D 倾斜 + 鼠标追光 + 弹簧缩放
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
   ProjectCard — 支持视频 hover 播放
───────────────────────────────────────────────────────── */
function ProjectCard({ p, lang, t }) {
  const videoRef = useRef(null)

  function onVideoEnter() { videoRef.current?.play() }
  function onVideoLeave() {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <GlowCard glowColor={p.color} className="glass-card rounded-2xl overflow-hidden flex flex-col h-full">
      {/* 视频区域 */}
      {p.video ? (
        <div
          className="relative overflow-hidden cursor-pointer group/video"
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
          {/* 播放提示蒙层 */}
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
          {/* 顶色条 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}33)` }}
          />
        </div>
      ) : (
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}33)` }} />
      )}

      {/* 内容区 */}
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
        <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">
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
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          className="text-xs hover:underline transition-opacity hover:opacity-70"
          style={{ color: p.color }}
        >
          {t('projects.view_code')} →
        </a>
      </div>
    </GlowCard>
  )
}

/* ─────────────────────────────────────────────────────────
   SectionHeading
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

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

/* ─────────────────────────────────────────────────────────
   Home
───────────────────────────────────────────────────────── */
export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#07101f' }}>

      {/* 层1：斜线网格 */}
      <div className="line-grid fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      {/* 层2：点阵 */}
      <div className="dot-grid fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      {/* 层3：噪点纹理 */}
      <div className="noise-overlay fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-32 pb-28 grid md:grid-cols-2 gap-12 items-center" style={{ zIndex: 10 }}>

        {/* Aurora 光晕 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
            className="absolute top-1/2 -left-10 w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)' }}
          />
          {/* 新增：紫粉色光晕 */}
          <motion.div
            animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute top-10 left-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)' }}
          />
        </div>

        {/* 文字区域 */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
          className="relative"
          style={{ zIndex: 10 }}
        >
          <motion.p variants={fadeUp} className="text-blue-400 text-xs mb-3 tracking-widest uppercase">
            {t('home.greeting')}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-6xl font-bold text-white mb-3 leading-tight">
            {t('home.name')}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-blue-300 text-xl font-medium mb-5">
            {t('home.title')}
          </motion.p>
          <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-9 leading-relaxed max-w-md">
            {t('home.subtitle')}
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
            <Link
              to="/projects"
              className="px-6 py-3 bg-blue-500 text-white text-sm rounded-full font-medium transition-all hover:-translate-y-1 active:translate-y-0"
              style={{ boxShadow: '0 0 28px rgba(59,130,246,0.55)' }}
            >
              {t('home.cta_projects')}
            </Link>
            <a
              href="https://github.com/YUu-8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-gray-300 text-sm rounded-full font-medium transition-all hover:-translate-y-1 hover:text-white active:translate-y-0"
              style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}
            >
              GitHub →
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-8">
            {[
              'Python', 'PyTorch', 'Scikit-learn', 'LangChain', 'Hugging Face',
              'FastAPI', 'Docker', 'GitHub Actions', 'CI/CD', 'MLOps',
              'React', 'Azure', 'SQL', 'Pandas', 'XGBoost',
            ].map(s => (
              <motion.span
                key={s}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-3 py-1 text-xs text-gray-400 rounded-full cursor-default transition-colors hover:text-blue-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          {/* 社交链接 */}
          <motion.div variants={fadeUp} className="flex gap-4 mt-5">
            <a
              href="https://github.com/YUu-8"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              github.com/YUu-8
            </a>
            <a
              href="https://www.linkedin.com/in/yuchun-wang-493404386/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-400 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              linkedin.com/in/yuchun-wang
            </a>
          </motion.div>
        </motion.div>

        {/* 头像 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, type: 'spring', bounce: 0.35 }}
          className="flex justify-center relative"
          style={{ zIndex: 10 }}
        >
          <div className="relative">
            {/* 外圈旋转光环 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-6 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #3B82F6, #6366F1, #A78BFA, #38BDF8, #3B82F6)',
                opacity: 0.35,
                filter: 'blur(14px)',
              }}
            />
            {/* 内圈反转 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-1 rounded-full"
              style={{
                background: 'conic-gradient(from 90deg, transparent 70%, rgba(99,102,241,0.7))',
                filter: 'blur(3px)',
              }}
            />

            <div className="flip-card w-64 h-64 cursor-pointer" style={{ position: 'relative', zIndex: 10 }}>
              <div className="flip-card-inner">
                {/* 正面照片 */}
                <div
                  className="flip-card-front w-64 h-64 rounded-full overflow-hidden"
                  style={{
                    border: '2px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 0 40px rgba(59,130,246,0.35)',
                  }}
                >
                  <img
                    src="/avatar-front.jpg"
                    alt="Yuchun Wang"
                    className="w-full h-full"
                    style={{ objectFit: 'cover', objectPosition: 'center center' }}
                  />
                </div>
                {/* 背面照片 */}
                <div
                  className="flip-card-back w-64 h-64 rounded-full overflow-hidden"
                  style={{
                    border: '2px solid rgba(99,102,241,0.6)',
                    boxShadow: '0 0 40px rgba(99,102,241,0.45)',
                  }}
                >
                  <img
                    src="/avatar-back.jpg"
                    alt="Yuchun Wang"
                    className="w-full h-full"
                    style={{ objectFit: 'cover', objectPosition: 'center center' }}
                  />
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* ── Education ────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-20" style={{ zIndex: 10 }}>
        <SectionHeading>{t('education.title')}</SectionHeading>
        <div className="space-y-4">
          {t('education.items', { returnObjects: true }).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <GlowCard glowColor="#3B82F6" className="glass-card rounded-2xl p-5 flex gap-4 cursor-default">
                <div
                  className="w-px self-stretch rounded-full shrink-0"
                  style={{ background: 'linear-gradient(to bottom, #3B82F6, #6366F1, transparent)' }}
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                    <span className="font-semibold text-white text-sm">{item.school}</span>
                    <span className="text-xs text-gray-500 font-mono">{item.period}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{item.degree} · {item.location}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((h, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 text-xs text-blue-300 rounded"
                        style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-20" style={{ zIndex: 10 }}>
        <SectionHeading>{t('projects.title')}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="h-full"
            >
              <ProjectCard p={p} lang={lang} t={t} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── GitHub Contributions ──────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28" style={{ zIndex: 10 }}>
        <SectionHeading>
          {lang === 'zh' ? 'GitHub 贡献' : lang === 'fr' ? 'Contributions GitHub' : 'GitHub Contributions'}
        </SectionHeading>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 overflow-hidden"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-5">
            {lang === 'zh' ? '过去一年的提交活动' : lang === 'fr' ? 'Activité de commits sur l\'année passée' : 'Commit activity over the past year'}
          </p>
          <img
            src="https://ghchart.rshah.org/3B82F6/YUu-8"
            alt="GitHub Contributions"
            className="w-full rounded-lg"
            style={{ filter: 'brightness(1.05)' }}
          />
          <div className="mt-4 flex justify-end">
            <a
              href="https://github.com/YUu-8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              github.com/YUu-8 →
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
