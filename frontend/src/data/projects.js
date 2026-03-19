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
    demo: null,
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
  }
]

export default projects
