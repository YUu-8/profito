// ================================================================
// NOW PAGE — 在这里更新你的动态
// ================================================================
// 使用方法：
//   · 新增活动 → 在 ACTIVITIES 数组最前面添加一个对象
//   · 单张图片 → images: ['/now/xxx.jpg']
//   · 多张图片 → images: ['/now/a.jpg', '/now/b.jpg', '/now/c.jpg']
//   · 没有图片 → images: []，显示 emoji 风格卡片
//   · 每条活动都需要 zh / en / fr 三语翻译
// ================================================================

export const STATUS = {
  zh: { value: '正在求职中', city: '法国 · 巴黎', since: '2026 年 3 月' },
  en: { value: 'Open to opportunities', city: 'Paris, France', since: 'March 2026' },
  fr: { value: 'Ouverte aux opportunités', city: 'Paris, France', since: 'Mars 2026' },
}

// ── 活动卡片 ────────────────────────────────────────────────────
// 最新的放最前面
export const ACTIVITIES = [
  {
    id: 'hackathon-mar-2026',
    emoji: '💻',
    images: ['/now/hackathon1.png', '/now/hackathon2.png', '/now/hackathon3.png'],
    date: {
      zh: '2026年3月16–17日',
      en: 'Mar 16–17, 2026',
      fr: '16–17 mars 2026',
    },
    title: {
      zh: '两天黑客马拉松',
      en: '2-Day Hackathon',
      fr: 'Hackathon de 2 jours',
    },
    desc: {
      zh: '和同学一起参加黑客马拉松，48小时内从零构建项目，体验了快速原型开发的乐趣。',
      en: 'Joined a hackathon with classmates, building a project from scratch in 48 hours.',
      fr: 'Participé à un hackathon avec des camarades, construisant un projet en 48 heures.',
    },
  },
  {
    id: 'drone-saclay',
    emoji: '🚁',
    images: ['/now/drone1.jpg', '/now/drone2.jpg', '/now/drone3.jpg'],
    date: {
      zh: '2026年3月14日',
      en: 'Mar 14, 2026',
      fr: '14 mars 2026',
    },
    title: {
      zh: '萨克雷无人机组装',
      en: 'Drone Assembly at Saclay',
      fr: 'Assemblage de drone à Saclay',
    },
    desc: {
      zh: '和队友前往巴黎萨克雷大学，亲手组装无人机——从电路连接到飞控调试全程参与。',
      en: 'Headed to Paris-Saclay with teammates to assemble a drone — from wiring to flight controller setup.',
      fr: 'Direction Paris-Saclay avec l\'équipe pour assembler un drone — du câblage à la configuration du contrôleur.',
    },
  },
  {
    id: 'esilv-exchange',
    emoji: '🎓',
    images: [],
    date: {
      zh: '2025年9月 — 至今',
      en: 'Sep 2025 — Now',
      fr: 'Sep 2025 — Maintenant',
    },
    title: {
      zh: 'ESILV 巴黎交换',
      en: 'ESILV Paris Exchange',
      fr: 'Échange ESILV Paris',
    },
    desc: {
      zh: '在巴黎完成最后一学期，专注 AI、MLOps 与数据工程方向。',
      en: 'Final semester in Paris, specialising in AI, MLOps and Data Engineering.',
      fr: 'Dernier semestre à Paris, spécialisation en IA, MLOps et Data Engineering.',
    },
  },
  {
    id: 'portfolio',
    emoji: '🛠️',
    images: [],
    date: {
      zh: '2026年3月',
      en: 'March 2026',
      fr: 'Mars 2026',
    },
    title: {
      zh: '搭建作品集网站',
      en: 'Building this portfolio',
      fr: 'Construction de ce portfolio',
    },
    desc: {
      zh: '用 React、FastAPI 设计并开发这个作品集网站。',
      en: 'Designing and coding this site with React, FastAPI.',
      fr: 'Conception et développement de ce site avec React, FastAPI ',
    },
  },
]

// ── 正在学习的技术标签 ──────────────────────────────────────────
// 想加新技术直接在数组里追加字符串即可
export const LEARNING_TAGS = [
  'LLM Fine-tuning',
  'LangChain Agents',
  'Azure Deployment',
  'Docker Compose',
  'CI/CD Pipelines',
  'MLflow',
  'Reinforcement Learning',
  'French 🇫🇷',
]
