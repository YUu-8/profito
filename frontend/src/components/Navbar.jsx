import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'zh', label: '中' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const links = [
    { to: '/',         key: 'home' },
    { to: '/projects', key: 'projects' },
    { to: '/skills',   key: 'skills' },
    { to: '/resume',   key: 'resume' },
    { to: '/contact',  key: 'contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link to="/" className="font-bold text-dark text-lg tracking-tight">
          Yuu <span className="text-primary">·</span> 王钰淳
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.key}
              to={l.to}
              className={`text-sm transition-colors ${
                location.pathname === l.to
                  ? 'text-primary font-medium'
                  : 'text-gray-500 hover:text-dark'
              }`}
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </div>

        {/* Language switcher */}
        <div className="flex items-center gap-1">
          {LANGS.map(lang => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                i18n.language === lang.code
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-dark'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
