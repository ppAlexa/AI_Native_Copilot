# AI_Native_Copilot

**AI-native copilot that helps users understand what actually matters in food ingredient lists at the moment of decision.**

---

## Overview

Food ingredient labels are designed for regulatory compliance, not human understanding. Users are often left overthinking long ingredient lists without clarity on whether anything truly matters for them.

**AI_Native_Copilot** addresses this by acting as a *reasoning companion*, not a database or scoring system. It focuses attention only on ingredients that are meaningfully relevant and explains them with context and uncertainty.

---

## Core Idea

Instead of listing or rating ingredients, the AI:

* Identifies at most **1–2 relevant ingredients**
* Explains **why people worry** about them
* Clarifies **who should care and who likely doesn’t**
* Explicitly states **what is known vs uncertain**

If nothing warrants attention, the AI clearly says so.

---

## Basic Workflow

1. User uploads a product image or pastes an ingredient list
2. OCR extracts ingredient text (if image is used)
3. The AI reasons over the ingredient list using a constrained prompt
4. The AI delivers a short, relevance-focused explanation
5. User leaves knowing whether they need to care — and why

No filters, menus, or follow-up questions.

---

## Why This Is AI-Native

* **AI speaks first** — users don’t need to ask questions
* **Inference over configuration** — concerns are inferred automatically
* **Relevance filtering** — avoids exhaustive analysis
* **Reasoning, not labels** — no “good/bad” or “safe/unsafe” tags
* **Honest uncertainty** — avoids false certainty or alarmism

---
## Technical Snapshot

**Frontend**

* Minimal HTML / CSS / JavaScript
* Text input + image upload
* Client-side OCR

**Backend**

* FastAPI
* Single reasoning endpoint
* One LLM call per request
* Prompt treated as a first-class artifact

---

## Project Status

Functional prototype focused on **experience design and AI reasoning**, not scale or coverage.

---

*AI_Native_Copilot demonstrates how AI can reduce cognitive load and support decisions without overstepping.*
