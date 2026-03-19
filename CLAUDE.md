# Yuchun Wang — Portfolio Project

## 关于我
- 姓名：王钰淳（Yuchun Wang / Yuu）
- 上海师范大学计算机科学本科（2022-2026）
- 法国ESILV巴黎交换生，数据与AI方向（2025.09-2026.05）
- 上海交通大学 AI微专业 + 创业辅修（2023-2024）
- 语言：中文母语、英语流利（IELTS 6.0）、法语工作级别

## 技术栈
- 前端：React + TailwindCSS + i18next（中/英/法三语）
- 后端：FastAPI + Anthropic Claude API
- 部署目标：Azure（Static Web Apps + Container Apps）
- 其他：Docker、GitHub Actions、PyTorch、LangChain

## 项目结构
portfolio/
├── frontend/        # React + Vite
│   ├── src/
│   │   ├── pages/   # Home, Projects, Resume, Blog, Contact
│   │   ├── components/  # Navbar, AiChat
│   │   ├── i18n/    # zh.json, en.json, fr.json
│   │   └── data/    # projects.js
│   └── public/      # avatar.jpg 放这里
├── backend/         # FastAPI
│   └── main.py      # Claude AI聊天接口
└── docker-compose.yml

## 当前进度
- [x] Hero区域 + 头像翻转效果（正面AI虚拟人，反面真实照片）
- [x] 教育经历section（三语）
- [x] 项目展示section
- [x] AI聊天组件（Claude API）
- [x] 三语切换（i18next）
- [ ] Resume页面
- [ ] Blog页面
- [ ] Contact页面
- [ ] Azure部署

## 开发规范
- 所有新页面必须支持三语（zh/en/fr），翻译放在 i18n/*.json
- 样式用 TailwindCSS，不要写内联style
- 动画用 framer-motion，保持和现有页面一致
- 后端接口统一加 /api/ 前缀