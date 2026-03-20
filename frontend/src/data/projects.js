// ================================================================
// PROJECTS DATA — 在这里添加/修改项目
// ================================================================
// 添加新项目：在数组末尾复制一个对象，填入内容
// 字段说明：
//   id          — 唯一整数，依次递增
//   title/En/Fr — 三语标题
//   description — { zh, en, fr } 简介（首页卡片用）
//   stack       — 技术栈标签数组
//   github      — GitHub 仓库链接（null = 不显示）
//   demo        — 在线 Demo 链接（null = 不显示）
//   video       — 演示视频路径，放 public/videos/（null = 不显示）
//   pdf         — 报告 PDF 路径，放 public/reports/（null = 不显示）
//   color       — 卡片主题色（十六进制）
//   categories  — 用于筛选，可选值: 'ML' | 'AI' | 'Data' | 'DevOps' | 'Frontend' | 'Backend'
//   background  — { zh, en, fr } 详情页：项目背景
//   role        — { zh, en, fr } 详情页：我的角色
//   challenges  — [{ zh, en, fr }] 详情页：技术难点
//   metrics     — [{ label, value }] 详情页：关键指标
// ================================================================

const projects = [
  {
    id: 1,
    title: "F1 最快圈速赛道 ML 分析",
    titleEn: "F1 Fastest Lap ML Analysis",
    titleFr: "Analyse ML des Tours les Plus Rapides en F1",
    description: {
      zh: "融合FastF1遥测数据，训练XGBoost/随机森林/线性回归模型预测赛道平均速度，R²达0.92。封装为生产级REST API，配置GitHub Actions实现全自动CI/CD。",
      en: "Merged FastF1 telemetry data for feature engineering. Trained XGBoost/Random Forest/Linear Regression models to predict track average speed, achieving R²=0.92. Deployed as production REST API with full CI/CD pipeline.",
      fr: "Fusion de données télémétriques FastF1 pour l'ingénierie des features. Modèles XGBoost/Random Forest/Régression linéaire pour prédire la vitesse moyenne, R²=0.92."
    },
    stack: ["Python", "XGBoost", "FastAPI", "Docker", "GitHub Actions"],
    github: "https://github.com/YUu-8/ML-Analysis-of-F1-Fastest-Lap-Circuits",
    demo: null,
    video: "/videos/F1.mov",
    color: "#E10600",
    categories: ['ML', 'DevOps'],
    background: {
      zh: "F1最快圈速受轮胎、天气、赛道条件等数十个变量影响。本项目构建了完整的生产级ML管道，从FastF1遥测API摄取数据并进行特征工程，预测赛道平均速度。",
      en: "Formula 1 lap times are influenced by dozens of variables — tire compounds, sector splits, weather, car setup. This project builds a production ML pipeline that ingests FastF1 telemetry API data, engineers features, and predicts average circuit speed.",
      fr: "Les temps au tour de F1 sont influencés par des dizaines de variables. Ce projet construit un pipeline ML de production ingérant les données de l'API télémétrique FastF1 pour prédire la vitesse moyenne des circuits."
    },
    role: {
      zh: "独立完成——FastF1 API数据摄取、特征工程（区段差值、轮胎寿命、天气合并）、模型对比（XGBoost/随机森林/线性回归）、FastAPI+Docker REST API部署、GitHub Actions全自动CI/CD。",
      en: "Sole engineer — data ingestion pipeline with FastF1 API, feature engineering (sector deltas, tire age, weather merge), model comparison (XGBoost vs Random Forest vs Linear Regression), REST API deployment with FastAPI + Docker, full CI/CD via GitHub Actions.",
      fr: "Ingénieur unique — pipeline FastF1, feature engineering, comparaison de modèles, déploiement API REST FastAPI/Docker, CI/CD GitHub Actions."
    },
    challenges: [
      {
        zh: "多源遥测数据（圈速、天气、轮胎）的粒度不同，需要精确的时间对齐合并策略。",
        en: "Merging multi-source telemetry data (lap timing, weather, tire data) with different granularities required careful time-aligned joining.",
        fr: "La fusion de données télémétriques multi-sources à différentes granularités nécessitait un alignement temporel précis."
      },
      {
        zh: "在22场比赛的有限数据集上，防止跨赛道数据泄露同时实现鲁棒交叉验证。",
        en: "Preventing data leakage across circuits while achieving robust cross-validation on a limited 22-race dataset.",
        fr: "Éviter les fuites de données entre circuits tout en réalisant une validation croisée robuste sur seulement 22 courses."
      }
    ],
    metrics: [
      { label: "R² Score", value: "0.92" },
      { label: "Models Compared", value: "3" },
      { label: "CI/CD Pipeline", value: "✓ Live" }
    ],
    pdf: null
  },
  {
    id: 2,
    title: "OEE 生产线预测",
    titleEn: "OEE Production Line Prediction",
    titleFr: "Prédiction OEE Ligne de Production",
    description: {
      zh: "基于IBM Watsonx构建工业传感器数据二分类ML流水线，准确率达99.8%。引入LIME框架进行可解释性分析。IBM AI黑客马拉松 Top 10。",
      en: "Built a binary classification ML pipeline on IBM Watsonx for industrial sensor data with 99.8% accuracy. Integrated LIME for explainability. Top 10 at IBM AI Hackathon Paris.",
      fr: "Pipeline ML de classification binaire sur IBM Watsonx pour données industrielles, précision 99.8%. LIME pour l'explicabilité. Top 10 au Hackathon IBM AI Paris."
    },
    stack: ["Python", "IBM Watsonx", "LIME", "Scikit-learn"],
    github: "https://github.com/YUu-8/OEE-Prediction-for-Production-Lines",
    demo: null,
    video: "/videos/OEE.mov",
    color: "#1A56A0",
    categories: ['ML', 'AI'],
    background: {
      zh: "IBM AI黑客马拉松巴黎站（Top 10）：工业制造客户需要利用生产线实时传感器数据，在OEE故障发生前进行预测。",
      en: "IBM AI Hackathon Paris (Top 10): An industrial manufacturing client needed to predict Overall Equipment Effectiveness (OEE) failures before they occur, using real-time sensor data from production lines.",
      fr: "Hackathon IBM AI Paris (Top 10) : Un client industriel avait besoin de prédire les défaillances OEE avant qu'elles surviennent, en utilisant des données de capteurs en temps réel."
    },
    role: {
      zh: "在IBM Watsonx上设计ML管道，训练二分类模型，集成LIME可解释性框架，向IBM工程师展示成果。",
      en: "ML pipeline design on IBM Watsonx, binary classification model training, LIME integration for explainability, presentation of results to IBM engineers.",
      fr: "Conception du pipeline ML sur IBM Watsonx, entraînement du modèle de classification binaire, intégration LIME pour l'explicabilité, présentation aux ingénieurs IBM."
    },
    challenges: [
      {
        zh: "传感器故障事件严重类别不平衡，需要SMOTE过采样和阈值调整，避免模型总是预测'无故障'。",
        en: "Severe class imbalance in sensor failure events required SMOTE oversampling and threshold tuning to avoid predicting 'no failure' 100% of the time.",
        fr: "Le déséquilibre de classe sévère nécessitait un suréchantillonnage SMOTE et un ajustement de seuil."
      },
      {
        zh: "使用LIME特征重要性为非ML工程师提供可解释性——展示哪些传感器触发了预测故障。",
        en: "Making the model interpretable for non-ML engineers using LIME feature importance — showing which sensors triggered a predicted failure.",
        fr: "Rendre le modèle interprétable pour les ingénieurs non-ML via l'importance des features LIME."
      }
    ],
    metrics: [
      { label: "Accuracy", value: "99.8%" },
      { label: "Hackathon Rank", value: "Top 10" },
      { label: "Explainability", value: "LIME ✓" }
    ],
    pdf: null
  },
  {
    id: 3,
    title: "Flickr 地理数据分析 Dashboard",
    titleEn: "Flickr Geodata Analytics Dashboard",
    titleFr: "Tableau de Bord Géodonnées Flickr",
    description: {
      zh: "对英国图书馆3000+条众包地理标注数据进行ETL处理，应用K-Means聚类和ARIMA预测，构建Python Dash交互式四图联动仪表板。",
      en: "ETL processing of 3000+ British Library crowdsourced geodata. K-Means clustering for hotspot detection, ARIMA forecasting. Built interactive 4-chart Python Dash dashboard.",
      fr: "Traitement ETL de 3000+ données géographiques. Clustering K-Means, prévisions ARIMA. Tableau de bord interactif Python Dash à 4 graphiques liés."
    },
    stack: ["Python Dash", "Plotly", "K-Means", "ARIMA"],
    github: "https://github.com/YUu-8/Flickr-Geodata-Dashboard",
    demo: "https://flickr-geodata-dashboard.onrender.com/",
    video: "/videos/dashbord.mov",
    color: "#059669",
    categories: ['Data'],
    background: {
      zh: "英国图书馆发布了3000+条众包地理标注的英国地标照片。本项目构建交互式分析仪表板，揭示空间聚类模式和时间上传趋势。",
      en: "The British Library published 3,000+ crowdsourced geo-tagged photographs of UK landmarks. This project builds an interactive analytics dashboard to uncover spatial clustering patterns and temporal upload trends.",
      fr: "La British Library a publié 3000+ photos géolocalisées. Ce projet construit un tableau de bord analytique interactif pour découvrir les patterns de clustering spatial et les tendances temporelles."
    },
    role: {
      zh: "完整ETL管道（数据清洗、地理坐标归一化）、K-Means聚类热点检测、ARIMA时间序列预测、Python Dash交互式四图联动仪表板。",
      en: "Full ETL pipeline (data cleaning, geo-coordinate normalization), K-Means clustering for hotspot detection, ARIMA time-series forecasting, Python Dash interactive 4-chart dashboard with cross-filter linking.",
      fr: "Pipeline ETL complet, clustering K-Means pour détection de hotspots, prévisions ARIMA, tableau de bord Python Dash interactif à 4 graphiques liés."
    },
    challenges: [
      {
        zh: "众包数据中地理坐标和元数据质量不一，需要多步验证和异常值去除。",
        en: "Inconsistent geo-coordinates and metadata quality in crowdsourced data required multi-step validation and outlier removal.",
        fr: "La qualité inconsistante des coordonnées géographiques nécessitait une validation en plusieurs étapes."
      },
      {
        zh: "在无标注数据的情况下选择最优K值——使用肘部法则+轮廓系数分析，确定K=7个聚类。",
        en: "Choosing optimal K for clustering without ground-truth labels — used elbow method + silhouette analysis to justify K=7 clusters.",
        fr: "Choisir le K optimal sans labels — méthode du coude + analyse de silhouette pour justifier K=7."
      }
    ],
    metrics: [
      { label: "Data Points", value: "3,000+" },
      { label: "Clusters Found", value: "K=7" },
      { label: "Charts", value: "4 Linked" }
    ],
    pdf: null
  },
  // ── 新增项目从这里往下追加 ─────────────────────────────────
  {
    id: 4,
    title: "ReelEcho 媒体收藏平台",
    titleEn: "ReelEcho Media Collection Platform",
    titleFr: "Plateforme de Collection Médias ReelEcho",
    description: {
      zh: "MERN 全栈媒体管理平台，负责收藏界面 UI 与后端开发。集成 GitHub Actions CI/CD，测试覆盖率 ≥80%，支持团队协作工作流。",
      en: "Full-stack MERN media platform. Built the favourites/collection UI and backend. Integrated GitHub Actions CI/CD with ≥80% test coverage enforced via Vitest + Supertest.",
      fr: "Plateforme média MERN full-stack. Développement de l'interface de collection et du backend. CI/CD GitHub Actions avec couverture de tests ≥80% via Vitest + Supertest."
    },
    stack: ["React", "Node.js", "Express", "MongoDB", "Vitest", "GitHub Actions"],
    github: "https://github.com/YUu-8/ReelEcho",
    demo: null,
    video: "/videos/Reelecho.mov",
    color: "#0EA5E9",
    categories: ['Frontend', 'Backend', 'DevOps'],
    background: {
      zh: "ReelEcho 是一个面向多人协作学习的 MERN 全栈媒体管理平台。项目从一开始就内置 DevOps 实践——自动化路由挂载（减少合并冲突）、CI 测试门禁、与 Jira 兼容的分支命名规范，真实模拟企业级协作流程。",
      en: "ReelEcho is a collaborative MERN full-stack media platform built with DevOps principles from day one — auto-mounted routes to minimise merge conflicts, CI coverage gates, and a Jira-compatible branching workflow that mirrors real-world team engineering.",
      fr: "ReelEcho est une plateforme média MERN collaborative construite avec des principes DevOps dès le départ — routes auto-montées pour minimiser les conflits de fusion, portes CI de couverture, et un workflow de branchement compatible Jira."
    },
    role: {
      zh: "负责收藏功能前端 UI（React 组件、状态管理、响应式布局）和对应 Express 后端路由（CRUD + Mongoose 数据模型）；参与 GitHub Actions CI 流水线配置，确保单元/集成测试覆盖率达标。",
      en: "Owned the favourites/collection feature end-to-end: React UI components, state management, responsive layout, and the corresponding Express REST routes with Mongoose data models. Contributed to GitHub Actions CI pipeline ensuring unit and integration test coverage thresholds.",
      fr: "Développement de bout en bout de la fonctionnalité de collection : composants React, gestion d'état, mise en page responsive, et routes REST Express avec modèles de données Mongoose. Contribution au pipeline CI GitHub Actions."
    },
    challenges: [
      {
        zh: "多人协作时的 Git 合并冲突：通过自动化路由挂载机制，每个功能模块独立注册路由，避免频繁修改同一入口文件。",
        en: "Managing Git merge conflicts in a multi-contributor codebase — solved with an auto-mounted route system where each feature registers its own router, eliminating simultaneous edits to a single entry file.",
        fr: "Gestion des conflits de fusion Git dans une base de code multi-contributeurs — résolu avec un système de routes auto-montées où chaque fonctionnalité enregistre son propre routeur."
      },
      {
        zh: "在 CI 环境中对 MongoDB 进行集成测试：配置 Supertest + 内存数据库，确保每次 PR 的测试覆盖率 ≥80%。",
        en: "Integration testing against MongoDB in CI — configured Supertest with an in-memory database so every PR enforces ≥80% line/function coverage before merging.",
        fr: "Tests d'intégration contre MongoDB en CI — configuration de Supertest avec une base de données en mémoire pour enforcer ≥80% de couverture sur chaque PR."
      }
    ],
    metrics: [
      { label: "Test Coverage", value: "≥ 80%" },
      { label: "Stack", value: "MERN" },
      { label: "CI/CD", value: "GitHub Actions ✓" }
    ],
    pdf: null
  }
]

export default projects
