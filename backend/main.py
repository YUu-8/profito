from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import anthropic
import os

app = FastAPI(title="Yuu Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-domain.com"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# ── AI Chat ───────────────────────────────────────────────────

SYSTEM_PROMPT = """你是王钰淳（Yuu）的AI助手，代表她回答关于她的问题。
用第一人称回答，语气友好、专业、真实。可以用中文、英语或法语回答，根据用户的语言自动切换。

关于王钰淳的信息：
- 上海师范大学计算机科学本科（2022-2026）
- 法国ESILV巴黎工程师学校交换生（数据与AI方向，2025-2026）
- 上海交通大学人工智能微专业+创业辅修（2023-2026）
- 技术栈：Python、FastAPI、Docker、GitHub Actions、PyTorch、XGBoost、LangChain、Azure OpenAI
- 主要项目：F1赛道ML分析（R²=0.92）、OEE生产线预测（IBM AI黑客马拉松Top10）、Flickr地理数据Dashboard
- 实习：公安部第三研究所科研成果转化实习生（2024）
- 语言：中文母语、英语流利（IELTS 6.0）、法语工作级别
- 求职方向：AI/ML工程师、数据工程师，目标城市：欧洲（斯德哥尔摩/阿姆斯特丹）或上海
- 性格：积极主动、喜欢学习新技术、有跨文化工作经验

如果被问到不确定的事情，诚实说不太清楚，不要编造信息。
回答保持简洁，一般2-4句话即可。"""

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@app.post("/api/chat")
async def chat(req: ChatRequest):
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=500,
        system=SYSTEM_PROMPT,
        messages=[{"role": m.role, "content": m.content} for m in req.messages]
    )
    return {"reply": response.content[0].text}

# ── Health check ──────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"status": "ok"}

# ── Blog posts (placeholder) ──────────────────────────────────

BLOG_POSTS = [
    {
        "id": 1,
        "title": "从法国看AI工程：ESILV交换生活与技术成长",
        "titleEn": "AI Engineering from Paris: My ESILV Exchange Experience",
        "titleFr": "L'ingénierie IA depuis Paris : Mon échange à l'ESILV",
        "date": "2026-03-01",
        "summary": {
            "zh": "在法国学习AI的半年里，我参加了IBM黑客马拉松、学习了MLOps，也理解了跨文化团队合作的意义。",
            "en": "Six months studying AI in France — IBM hackathon, MLOps courses, and what I learned about cross-cultural teamwork.",
            "fr": "Six mois d'études en IA en France — hackathon IBM, cours MLOps, et leçons sur le travail en équipe interculturelle."
        },
        "tags": ["AI", "MLOps", "Paris", "Exchange"]
    }
]

@app.get("/api/blog")
async def get_blog():
    return BLOG_POSTS

# ── Contact form ───────────────────────────────────────────────

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def contact(req: ContactRequest):
    # TODO: configure email sending (e.g. SendGrid / SMTP)
    print(f"[Contact] {req.name} <{req.email}>: {req.message}")
    return {"status": "ok"}
