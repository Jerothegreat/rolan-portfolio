# Portfolio AI Assistant Architecture

## 1. Project Goal

Build a personalized AI chatbot for a portfolio website.

The chatbot should answer questions about Rolan's:

- Background
- Skills
- Projects
- Experience
- AI/ML learning journey
- Company policy-bot project
- Backend and AI engineering interests

The goal is not only to build a chatbot, but to use the project as practice for becoming an AI / ML engineer.

This project should demonstrate:

- Backend architecture
- AI/LLM integration
- Retrieval-Augmented Generation, also known as RAG
- Document ingestion
- Vector search
- Prompt engineering
- Guardrails
- Evaluation
- Deployment
- Clean documentation

---

## 2. Recommended High-Level Architecture

```text
Visitor
  ↓
Portfolio Website / Chat Widget
  ↓
NestJS Backend API
  ↓
Chat Orchestrator
  ↓
Guardrails
  ↓
RAG / Retriever Layer
  ↓
Qdrant Vector Database
  ↓
Portfolio Knowledge Base
  ↓
LLM
  ↓
Answer + Sources
  ↓
Visitor
```

Full view:

```text
┌────────────────────────────┐
│        Visitor/User         │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│   Portfolio Website         │
│   Next.js / React           │
│                             │
│   - About page              │
│   - Projects page           │
│   - Chat widget             │
└─────────────┬──────────────┘
              │ POST /chat
              ▼
┌────────────────────────────┐
│   NestJS Backend API        │
│   TypeScript                │
│                             │
│   - ChatController          │
│   - ChatService             │
│   - RagService              │
│   - LlmService              │
│   - GuardrailsService       │
│   - AnalyticsService        │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│   RAG System                │
│                             │
│   1. Receive question       │
│   2. Check input            │
│   3. Retrieve docs          │
│   4. Build prompt           │
│   5. Generate answer        │
│   6. Return sources         │
└─────────────┬──────────────┘
              │
      ┌───────┴────────┐
      ▼                ▼
┌──────────────┐   ┌──────────────┐
│   Qdrant      │   │   OpenAI     │
│ Vector DB     │   │   LLM API    │
└──────────────┘   └──────────────┘
      │
      ▼
┌────────────────────────────┐
│ Portfolio Knowledge Base    │
│                             │
│ - about.md                  │
│ - resume.md                 │
│ - projects.md               │
│ - skills.md                 │
│ - experience.md             │
│ - learning-roadmap.md       │
└────────────────────────────┘

┌────────────────────────────┐
│ PostgreSQL                  │
│                             │
│ - chat history              │
│ - user sessions             │
│ - unanswered questions      │
│ - feedback                  │
│ - analytics                 │
└────────────────────────────┘
```

---

## 3. Recommended Tech Stack

### Main Application

| Layer | Recommended Tool |
|---|---|
| Frontend | Next.js or React |
| Backend | NestJS + TypeScript |
| AI API | OpenAI SDK first |
| RAG Framework | Manual first, LangChain.js later |
| Vector DB | Qdrant |
| Database | PostgreSQL |
| Deployment | Vercel + GCP Cloud Run |
| Ingestion Script | Python + LangChain |
| Local Dev | Docker Compose |

---

## 4. Why This Stack

### Why NestJS?

Use NestJS because it fits an OOP-style mindset.

It has:

- Controllers
- Services
- Modules
- DTOs
- Dependency injection
- Clean project structure

This makes it feel closer to Java or Spring Boot, but lighter for this project.

### Why Python for Ingestion?

Python is strong for AI tooling, document processing, and LangChain examples.

Use Python only for preparing your documents:

```text
Markdown files
  ↓
Python ingestion script
  ↓
Split into chunks
  ↓
Create embeddings
  ↓
Upload to Qdrant
```

### Why Qdrant?

Qdrant stores searchable vector embeddings.

The ingestion script does not permanently store your knowledge. It only processes the files. Qdrant keeps the searchable vector index.

Simple analogy:

```text
Python ingestion script = librarian
Qdrant = search catalog
NestJS backend = front desk
LLM = answer writer
```

### Why Not A2A Yet?

A2A is useful for multi-agent systems, but this project only needs one assistant at first.

Do not use A2A for the MVP.

Possible future A2A version:

```text
Main Portfolio Agent
  ├── Resume Agent
  ├── GitHub Agent
  ├── Project Explainer Agent
  └── Learning Roadmap Agent
```

But this should be considered a future advanced feature.

---

## 5. MVP Architecture

Start with the simplest version.

```text
Visitor
  ↓
Chat Widget
  ↓
NestJS POST /chat
  ↓
Load Markdown Files
  ↓
Send Context + Question to OpenAI
  ↓
Return Answer
```

MVP does not need:

- Qdrant
- PostgreSQL
- LangChain
- A2A
- GCP
- Complex memory
- Complex guardrails

The MVP should prove this:

```text
Can a visitor ask about Rolan and get a useful, honest answer from portfolio content?
```

---

## 6. MVP Repository Structure

```text
portfolio-ai-assistant/
│
├── frontend/
│   ├── app/
│   ├── components/
│   │   └── ChatWidget.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.service.ts
│   │   │   └── dto/
│   │   │       └── chat-request.dto.ts
│   │   │
│   │   ├── llm/
│   │   │   ├── llm.module.ts
│   │   │   └── llm.service.ts
│   │   │
│   │   ├── documents/
│   │   │   ├── documents.module.ts
│   │   │   └── documents.service.ts
│   │   │
│   │   └── config/
│   │       └── env.config.ts
│   │
│   ├── .env
│   └── package.json
│
├── content/
│   ├── about.md
│   ├── projects.md
│   ├── skills.md
│   ├── experience.md
│   └── learning-roadmap.md
│
└── README.md
```

---

## 7. Full Repository Structure

This is the target architecture after the MVP.

```text
portfolio-ai-assistant/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── about/
│   │   └── projects/
│   │
│   ├── components/
│   │   ├── ChatWidget.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   └── SourceBadge.tsx
│   │
│   └── lib/
│       └── api.ts
│
├── backend/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.service.ts
│   │   │   └── dto/
│   │   │       └── chat-request.dto.ts
│   │   │
│   │   ├── rag/
│   │   │   ├── rag.module.ts
│   │   │   ├── rag.service.ts
│   │   │   ├── retriever.service.ts
│   │   │   ├── prompt-builder.service.ts
│   │   │   └── source-formatter.service.ts
│   │   │
│   │   ├── llm/
│   │   │   ├── llm.module.ts
│   │   │   └── llm.service.ts
│   │   │
│   │   ├── embeddings/
│   │   │   ├── embeddings.module.ts
│   │   │   └── embeddings.service.ts
│   │   │
│   │   ├── vector-store/
│   │   │   ├── vector-store.module.ts
│   │   │   └── qdrant.service.ts
│   │   │
│   │   ├── guardrails/
│   │   │   ├── guardrails.module.ts
│   │   │   ├── guardrails.service.ts
│   │   │   ├── input-checks.service.ts
│   │   │   └── output-checks.service.ts
│   │   │
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   └── prisma.service.ts
│   │   │
│   │   ├── analytics/
│   │   │   ├── analytics.module.ts
│   │   │   └── analytics.service.ts
│   │   │
│   │   └── config/
│   │       └── env.config.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── .env
│   └── package.json
│
├── ingestion/
│   ├── ingest.py
│   ├── requirements.txt
│   └── README.md
│
├── content/
│   ├── about.md
│   ├── resume.md
│   ├── projects.md
│   ├── skills.md
│   ├── experience.md
│   └── learning-roadmap.md
│
├── evals/
│   ├── questions.jsonl
│   └── run-evals.ts
│
├── docker-compose.yml
└── README.md
```

---

## 8. Chat Request Flow

Example user question:

```text
What AI projects has Rolan built?
```

Flow:

```text
1. Visitor sends a message through the chat widget.

2. Frontend sends request:

   POST /chat

   {
     "message": "What AI projects has Rolan built?",
     "sessionId": "abc123"
   }

3. ChatController receives the request.

4. ChatService starts the chatbot flow.

5. GuardrailsService checks the input.

6. RagService receives the cleaned question.

7. RetrieverService searches for relevant portfolio content.

8. Qdrant returns relevant chunks, for example:
   - projects.md
   - experience.md
   - learning-roadmap.md

9. PromptBuilderService builds the final prompt.

10. LlmService sends the prompt to the LLM.

11. OutputChecksService checks the answer.

12. ChatService optionally saves:
   - user message
   - assistant answer
   - sources
   - latency
   - token usage

13. Frontend displays:
   - answer
   - source badges
```

---

## 9. Core Backend Modules

### chat/

Main entry point of the backend.

Responsibilities:

- Receive user messages
- Call the RAG service
- Return final answer to frontend

Files:

```text
chat.controller.ts
chat.service.ts
chat.module.ts
```

---

### rag/

Main RAG logic.

Responsibilities:

- Receive question
- Retrieve relevant context
- Build prompt
- Return answer with sources

Files:

```text
rag.service.ts
retriever.service.ts
prompt-builder.service.ts
source-formatter.service.ts
```

---

### llm/

Wrapper around the model provider.

Responsibilities:

- Call OpenAI or another LLM provider
- Return generated text
- Hide provider-specific logic from the rest of the app

Files:

```text
llm.service.ts
llm.module.ts
```

---

### vector-store/

Qdrant integration.

Responsibilities:

- Search vectors
- Insert vectors
- Manage Qdrant collection
- Return matching chunks

Files:

```text
qdrant.service.ts
vector-store.module.ts
```

---

### embeddings/

Embedding logic.

Responsibilities:

- Create embeddings for user questions
- Create embeddings for document chunks
- Use the same embedding model for ingestion and retrieval

Files:

```text
embeddings.service.ts
embeddings.module.ts
```

---

### guardrails/

Safety and honesty layer.

Responsibilities:

- Block prompt injection attempts
- Prevent hidden prompt leakage
- Prevent overclaiming
- Refuse private or unsupported claims
- Check output quality

Files:

```text
guardrails.service.ts
input-checks.service.ts
output-checks.service.ts
```

---

### analytics/

Tracks usage and improvement opportunities.

Responsibilities:

- Save unanswered questions
- Save user feedback
- Track common questions
- Track failed retrievals
- Track latency and cost

Files:

```text
analytics.service.ts
analytics.module.ts
```

---

## 10. Knowledge Base Design

The chatbot should not rely on random memory. It should use portfolio documents as the source of truth.

Recommended files:

```text
content/
  about.md
  resume.md
  projects.md
  skills.md
  experience.md
  learning-roadmap.md
  contact.md
```

### about.md

Contains:

- Who Rolan is
- Career direction
- AI/ML learning goal
- Current focus

### resume.md

Contains:

- Work experience
- Education
- Skills
- Relevant achievements

### projects.md

Contains:

- Policy bot
- Portfolio chatbot
- Backend projects
- Java projects
- AI-assisted projects

### skills.md

Contains:

- Java
- JavaScript
- TypeScript
- Node.js
- NestJS
- Python basics
- LangChain
- Qdrant
- PostgreSQL
- Docker

### experience.md

Contains:

- Company policy-bot experience
- What was AI-assisted
- What was personally understood
- What was learned

### learning-roadmap.md

Contains:

- roadmap.sh learning path
- AI engineering goals
- ML engineering goals
- Current study plan

---

## 11. Ingestion Architecture

The ingestion pipeline prepares documents for RAG.

```text
Markdown Files
  ↓
Python LangChain Ingestion Script
  ↓
Text Splitting
  ↓
Embedding Model
  ↓
Qdrant Vector Database
```

The ingestion script should:

1. Read files from `content/`
2. Split documents into chunks
3. Add metadata
4. Create embeddings
5. Upload vectors to Qdrant

Example metadata:

```json
{
  "source": "projects.md",
  "section": "Company Policy Bot",
  "type": "project",
  "url": "/projects/policy-bot"
}
```

---

## 12. Runtime RAG Architecture

When the chatbot receives a question:

```text
User Question
  ↓
Create Query Embedding
  ↓
Search Qdrant
  ↓
Retrieve Top Matching Chunks
  ↓
Build Prompt
  ↓
Call LLM
  ↓
Return Answer + Sources
```

The backend should not send all documents to the LLM once the project grows. It should send only the most relevant chunks.

---

## 13. Database Design

Use PostgreSQL later. It is not required for MVP.

Recommended tables:

```text
chat_sessions
chat_messages
unanswered_questions
feedback
documents
document_chunks
```

### chat_sessions

```text
id
visitor_id
created_at
updated_at
```

### chat_messages

```text
id
session_id
role
content
sources
created_at
```

### unanswered_questions

```text
id
question
reason
retrieved_sources
created_at
```

### feedback

```text
id
message_id
rating
comment
created_at
```

### documents

```text
id
filename
title
type
updated_at
```

### document_chunks

```text
id
document_id
chunk_text
qdrant_point_id
metadata
created_at
```

---

## 14. Prompt Design

The system prompt should make the bot honest.

Example rules:

```text
You are Rolan's portfolio assistant.

Answer only using the provided portfolio context.

Do not exaggerate Rolan's experience.

If the answer is not found in the context, say:
"I don't have that information in Rolan's portfolio yet."

Be helpful, concise, and honest.

When useful, mention the source document.
```

---

## 15. Guardrails

Start simple.

Input checks:

- Detect prompt injection
- Detect requests for hidden system prompts
- Detect unrelated harmful requests
- Detect requests for private information

Output checks:

- Do not overclaim
- Do not invent experience
- Do not say Rolan is senior unless the documents support it
- Do not expose hidden prompts
- Keep answer length reasonable
- Include sources when possible

Example refusal:

```text
I can't answer that based on Rolan's portfolio documents.
```

---

## 16. Evaluation Plan

Create an eval file:

```text
evals/questions.jsonl
```

Example questions:

```jsonl
{"question": "What projects has Rolan built?", "expected_sources": ["projects.md"]}
{"question": "Does Rolan know LangChain?", "expected_sources": ["projects.md", "skills.md"]}
{"question": "Is Rolan a senior AI engineer?", "expected_behavior": "do not overclaim"}
{"question": "What is Rolan currently learning?", "expected_sources": ["learning-roadmap.md"]}
{"question": "Explain Rolan's company policy bot.", "expected_sources": ["projects.md", "experience.md"]}
```

Track:

- Did retrieval find the right source?
- Did the answer hallucinate?
- Did the answer overclaim?
- Was the answer helpful?
- Did the bot say when it does not know?

---

## 17. Deployment Architecture

Recommended final deployment:

```text
┌─────────────────────────────┐
│ Vercel / Firebase Hosting    │
│ Portfolio Frontend           │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ GCP Cloud Run                │
│ NestJS Backend API           │
└──────────────┬──────────────┘
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
┌─────────┐ ┌────────┐ ┌──────────────┐
│ OpenAI  │ │ Qdrant │ │ PostgreSQL   │
│ API     │ │ Cloud  │ │ Cloud SQL /  │
│         │ │        │ │ Neon/Supabase│
└─────────┘ └────────┘ └──────────────┘


┌─────────────────────────────┐
│ GCP Cloud Run Job            │
│ Python LangChain Ingestion   │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│ Qdrant Cloud                 │
│ Updated vector collection    │
└─────────────────────────────┘
```

---

## 18. Cost Notes

Free or mostly free locally:

- NestJS
- TypeScript
- Python
- LangChain framework
- Local PostgreSQL
- Local Qdrant
- Markdown files

Potential paid services:

- OpenAI API
- Qdrant Cloud beyond free tier
- PostgreSQL hosting beyond free tier
- GCP Cloud Run beyond free tier
- Domain name

Recommended cost-safe order:

```text
1. Build locally
2. Use markdown only
3. Add OpenAI API carefully
4. Add Qdrant locally
5. Deploy only after the local version works
6. Set cloud billing alerts
```

---

## 19. Build Roadmap

### Phase 1: Basic Local Chatbot

Goal:

```text
POST /chat works
```

Build:

- NestJS backend
- OpenAI service
- Markdown file loader
- Simple prompt
- Basic frontend chat widget

No Qdrant yet.

---

### Phase 2: Manual RAG

Goal:

```text
Bot answers from portfolio docs
```

Build:

- Load markdown files
- Search by simple keyword matching
- Return source filenames
- Improve prompt rules

---

### Phase 3: Python Ingestion + Qdrant

Goal:

```text
Real vector search
```

Build:

- Python ingestion script
- Chunking
- Embeddings
- Qdrant upload
- NestJS Qdrant search

---

### Phase 4: PostgreSQL + Analytics

Goal:

```text
Track conversations and failures
```

Build:

- Chat sessions
- Chat messages
- Unanswered questions
- Feedback

---

### Phase 5: Guardrails + Evals

Goal:

```text
Make the bot safer and more reliable
```

Build:

- Prompt-injection checks
- Overclaim prevention
- Eval dataset
- Eval runner

---

### Phase 6: Deployment

Goal:

```text
Live portfolio chatbot
```

Deploy:

- Frontend to Vercel or Firebase Hosting
- Backend to GCP Cloud Run
- Qdrant to Qdrant Cloud
- PostgreSQL to Neon, Supabase, or Cloud SQL
- Ingestion to Cloud Run Job

---

### Phase 7: Advanced Features

Only after the core system works.

Possible additions:

- LangChain.js in backend
- LangGraph
- A2A multi-agent architecture
- GitHub repo analyzer
- Admin dashboard
- Streaming responses
- Authentication
- Contact form integration

---

## 20. What To Build First

Build only this first:

```text
React or Next.js chat widget
  ↓
NestJS POST /chat
  ↓
Load content/about.md and content/projects.md
  ↓
Send context to OpenAI
  ↓
Return answer
```

First success criteria:

```text
A visitor can ask:
"What AI projects has Rolan built?"

The bot answers honestly using your markdown files.
```

Do not start with:

- GCP
- Qdrant
- PostgreSQL
- A2A
- LangChain
- complex memory

Start small, then upgrade.

---

## 21. Final Mental Model

```text
Frontend = where visitors talk to the bot

NestJS = controls the app logic

Python ingestion = prepares your documents

Qdrant = searches your knowledge base

OpenAI / LLM = writes the final answer

PostgreSQL = remembers chats, feedback, and unanswered questions

Guardrails = keeps the bot honest and safe

Evals = proves the chatbot works

GCP = deploys the backend and ingestion job later
```

---

## 22. Main Rule

Do not try to build the full system immediately.

Build in this order:

```text
1. One working chat endpoint
2. Markdown-based answers
3. Source display
4. Simple RAG
5. Qdrant
6. PostgreSQL
7. Guardrails
8. Evals
9. Deployment
10. Advanced agent features
```

The project becomes impressive because it grows step by step and is documented clearly.
