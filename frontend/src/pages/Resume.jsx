import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const PDF_MAP = {
  zh: '/resume-CN.pdf',
  en: '/resume-EN.pdf',
  fr: '/resume-FR.pdf',
}

const LANG_LABEL = {
  zh: '中文版',
  en: 'English',
  fr: 'Français',
}

export default function Resume() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const pdfSrc = PDF_MAP[lang] || PDF_MAP['en']

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#07101f' }}>

      {/* Background layers */}
      <div className="line-grid fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      <div className="dot-grid fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="noise-overlay fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-12" style={{ zIndex: 10 }}>

        {/* Header bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">
              王钰淳 <span className="text-gray-500 font-normal mx-1">·</span> Yuchun Wang
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {t('resume.title')}
              <span
                className="ml-2 px-2 py-0.5 text-xs rounded-full font-medium"
                style={{
                  background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#93C5FD',
                }}
              >
                {LANG_LABEL[lang] || 'English'}
              </span>
            </p>
          </div>

          <a
            href={pdfSrc}
            download
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
            style={{
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.35)',
              color: '#93C5FD',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            {t('resume.download')}
          </a>
        </motion.div>

        {/* PDF viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 60px rgba(59,130,246,0.08)',
          }}
        >
          <object
            key={pdfSrc}
            data={pdfSrc}
            type="application/pdf"
            className="w-full"
            style={{ height: 'calc(100vh - 180px)', minHeight: '600px', display: 'block' }}
          >
            {/* Fallback for browsers that can't render PDF inline */}
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <p className="text-gray-400 text-sm">无法在浏览器内预览 PDF</p>
              <a
                href={pdfSrc}
                download
                className="px-5 py-2.5 rounded-full text-sm font-medium"
                style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#93C5FD' }}
              >
                {t('resume.download')}
              </a>
            </div>
          </object>
        </motion.div>

        <p className="text-center text-xs text-gray-600 mt-4">
          {t('resume.preview_title')} · {LANG_LABEL[lang]} · {' '}
          <a href={pdfSrc} download className="text-blue-400 hover:underline">{t('resume.download')}</a>
        </p>

      </div>
    </div>
  )
}
