from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from pathlib import Path

# -------------------------
# App setup
# -------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# OpenAI client (NEW API)
# -------------------------
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# -------------------------
# Request schema
# -------------------------
class AnalyzeRequest(BaseModel):
    text: str

# -------------------------
# Load reasoning prompt
# -------------------------
BASE_DIR = Path(__file__).resolve().parent
PROMPT_PATH = BASE_DIR / "reasoning_prompt.txt"
REASONING_PROMPT = PROMPT_PATH.read_text()

# -------------------------
# Core endpoint
# -------------------------
@app.post("/analyze")
async def analyze_ingredients(req: AnalyzeRequest):
    if not req.text.strip():
        return {"explanation": "I couldn’t find any ingredient information to analyze."}

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0.4,
        messages=[
            {"role": "system", "content": REASONING_PROMPT},
            {"role": "user", "content": f"Ingredient text:\n{req.text}"}
        ],
    )

    return {"explanation": response.choices[0].message.content}
