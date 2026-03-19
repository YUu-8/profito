import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import axios from 'axios'

const GITHUB = 'https://github.com/YUu-8'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'ok' | 'err'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await axios.post('/api/contact', form)
      setStatus('ok')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('err')
    }
  }

  const inputCls = 'w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-primary focus:bg-white transition-colors'

  return (
    <div className="min-h-screen bg-light pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-dark mb-2">{t('contact.title')}</h1>
          <p className="text-gray-500">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white rounded-2xl p-7 shadow-sm border border-gray-100 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                {t('contact.name_label')}
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                {t('contact.email_label')}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                {t('contact.message_label')}
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={`${inputCls} resize-none`}
              />
            </div>

            {status === 'ok' && (
              <p className="text-sm text-green-600 bg-green-50 rounded-xl px-4 py-2.5">
                {t('contact.success')}
              </p>
            )}
            {status === 'err' && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2.5">
                {t('contact.error')}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full px-5 py-2.5 bg-primary text-white text-sm rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? '...' : t('contact.send')}
            </button>
          </motion.form>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Email</p>
              <a
                href={`mailto:${t('contact.email_address')}`}
                className="text-sm text-primary hover:underline break-all"
              >
                {t('contact.email_address')}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">GitHub</p>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                github.com/YUu-8
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                Location
              </p>
              <p className="text-sm text-dark">{t('contact.location')}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
