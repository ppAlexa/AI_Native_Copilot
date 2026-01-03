from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

# -------------------------
# App setup
# -------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for hackathon demo only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

# -------------------------
# Request schema
# -------------------------
class AnalyzeRequest(BaseModel):
    text: str

# -------------------------
# Load reasoning prompt
# -------------------------
with open("backend/reasoning_prompt.txt", "r") as f:
    REASONING_PROMPT = f.read()

# -------------------------
# Core endpoint
# -------------------------
@app.post("/analyze")
async def analyze_ingredients(req: AnalyzeRequest):
    ingredient_text = req.text.strip()

    if not ingredient_text:
        return {"explanation": "I couldn’t find any ingredient information to analyze."}

    messages = [
        {
            "role": "system",
            "content": REASONING_PROMPT
        },
        {
            "role": "user",
            "content": f"Ingredient text:\n{ingredient_text}"
        }
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.4
        )

        explanation = response["choices"][0]["message"]["content"]

        return {"explanation": explanation}

    except Exception as e:
        return {"explanation": f"ERROR: {str(e)}"}
