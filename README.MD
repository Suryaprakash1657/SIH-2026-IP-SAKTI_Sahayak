# IP-SAKTI Sahayak (Ministry of Ayush)

[![SIH 2026](https://img.shields.io/badge/SIH-2026-brightgreen.svg)](https://www.sih.gov.in/)
[![Problem ID](https://img.shields.io/badge/Problem%20ID-SIH26045-blue.svg)](https://www.sih.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20pgvector-336791.svg)](https://github.com/pgvector/pgvector)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20(Python)-009688.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black.svg)](https://nextjs.org/)

An enterprise-grade, multilingual AI legal assistant and compliance portal designed specifically for the Indian Ayush ecosystem. **IP-SAKTI Sahayak** bridges traditional Ayurvedic medicine and modern IP jurisprudence by deploying a zero-hallucination, guarded hybrid RAG architecture to guide innovators through patentability, biodiversity compliance, and export regulations.

---

## The Problem Statement

Innovators, doctors, MSMEs, and startups within the Ayurvedic sector routinely encounter complex statutory barriers when attempting to protect their products:
* **Traditional Knowledge Patent Bar:** Classical herbal remedies documented in ancient texts are strictly unpatentable under **Section 3(p)** of the Indian Patents Act, 1970.
* **Admixture Obstacles:** Simple combinations of known medicinal plants are barred under **Section 3(e)** as mere admixtures, requiring rigorous proof of unexpected therapeutic synergism.
* **Jurisdictional Divergence:** Compliance for domestic commercialization under the **Biological Diversity Act (BDA 2023/2024)** and **FSSAI Ayurveda-Aahar** operates on distinct principles compared to export regimes like the **WIPO GRATK Treaty (2024)**, **US FDA Botanical Drug Guidance**, and the **EU THMPD Directive**.
* **Hallucination Risks:** Generic conversational LLMs frequently fabricate case laws, cite non-existent statutory subsections, or mix international health claims with Indian regulations, creating severe compliance liabilities.

---

## Solution Architecture: Guarded Hybrid RAG

```
[ User Input (Speech/Text/PDF) ]
                 │
                 ▼
     [ Next.js 14 Web Portal ] ──(Bhashini / Web Speech)
                 │
                 ▼
     [ FastAPI Async Gateway ]
                 │
  ┌──────────────┴──────────────┐
  ▼                             ▼
[Diagnostic Rule Engine]   [Guarded Hybrid Search (PostgreSQL)]
(First Schedule Checker)     ├── Sparse: BM25 / tsvector (Exact Sections)
                             ├── Dense: pgvector HNSW (bge-small-en-v1.5)
                             └── RRF (Reciprocal Rank Fusion)
                                        │
                                ┌───────┴───────┐
                                │ Score >= 0.70?│
                                └───┬───────┬───┘
                         YES ───────┘       └─────── NO
                          │                          │
                          ▼                          ▼
            [Google Gemini 1.5 API]        [Deterministic Fallback]
          (Context-Grounded Inference)     (Abstention & Human Ticket)
                          │
                          ▼
            [Split-Screen PDF.js Panel]
          (Bounding-Box Clause Highlights)
```

---

## Key Features

* **Multilingual Formulation Diagnostic Wizard:** Classifies formulations into Classical Medicine, Proprietary Drug, Phytopharmaceutical, Ayurveda-Aahar, or Cosmetic using Drugs & Cosmetics Act First Schedule text lookups.
* **Synergism & Novelty Calculator:** Evaluates multi-herb lab bioactivity data using the Chou-Talalay Combination Index ($CI < 0.9$) to draft defensible patent claims overcoming **Section 3(e)** objections.
* **Dual-Jurisdiction Statutory Filter:** Uses strict SQL metadata isolation (`WHERE jurisdiction = :mode`) to completely separate Indian statutory law (Patents Act, BDA 2024) from international frameworks (WIPO GRATK, US FDA, EU Directives).
* **Split-Screen Interactive PDF Statute Inspector:** Synchronizes AI-generated legal advice with original gazette notifications and statutes via PDF.js, jumping to and highlighting the exact clause coordinates.
* **TKDL Similarity & Prior-Art Heatmap:** Uses Jaccard similarity and inverted index mapping across ancient formulations to visually surface prior-art risk scores before incurring IP filing expenses.
* **BDA 2024 ABS Exemption & Fee Calculator:** Programmed with the amended Biological Diversity Rules to determine State Biodiversity Board (SBB) intimations, NBA Form 1/2/3 requirements, and benefit-sharing royalties.
* **Alternative IP Pivot & Facilitation Routing:** Recommends brand trademark (Class 5/35), GI, or extraction trade secrets when recipes are barred under Section 3(p). Routes low-confidence queries ($< 0.70$) to accredited Ayush IP Facilitation Centers.
* **Automated Regulatory Dossier Generator:** Compiles evaluation metrics, statutory citations, and draft Indian Patent Office (Form 1/2) submissions into a single PDF dossier using ReportLab.

---

## Technology Stack (Zero-Cost Setup)

| Layer | Technology | Role / Justification |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14, Tailwind CSS, Lucide | Responsive split-screen portal hosted on Vercel. |
| **Backend API** | FastAPI (Python 3.11+), Pydantic | High-performance asynchronous API endpoints hosted on Render / Koyeb. |
| **Database** | PostgreSQL + `pgvector` | Unified relational storage and high-speed HNSW vector search. |
| **Embeddings** | `BAAI/bge-small-en-v1.5` | Lightweight local CPU embeddings without external API costs. |
| **LLM Inference**| Google Gemini 1.5 (Pro / Flash) | Deep statutory grounding, massive legal context windows, and native JSON mode. |
| **Speech / Locales**| Digital India Bhashini APIs / Web Speech | Official Indic language translation and speech recognition. |
| **Document Engine**| PDF.js & ReportLab | In-browser clause highlighting and backend dossier PDF compilation. |

---

## Repository Directory Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── classify.py         # Formulation diagnostic wizard
│   │   │   │   │   ├── synergism.py        # Chou-Talalay Combination Index solver
│   │   │   │   │   ├── bda_calculator.py   # BDA 2024 ABS fee & exemption engine
│   │   │   │   │   └── query.py            # Guarded RAG pipeline
│   │   ├── core/
│   │   │   ├── config.py                   # Environment settings
│   │   │   └── database.py                 # PostgreSQL connection pool
│   │   ├── models/                         # SQLAlchemy / SQLModel definitions
│   │   ├── schemas/                        # Pydantic schemas for request/response
│   │   ├── services/
│   │   │   ├── embedding.py                # BGE CPU embedding pipeline
│   │   │   ├── gemini_service.py           # Gemini 1.5 grounded synthesis
│   │   │   ├── rrf_search.py               # Reciprocal Rank Fusion implementation
│   │   │   └── dossier_generator.py        # ReportLab PDF compilation
│   │   └── main.py                         # Application entrypoint
│   ├── data/
│   │   ├── statutes/                       # Raw gazettes & legislative PDFs
│   │   └── first_schedule_texts.json       # Classical recipe database
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── pdfs/                           # Statutory reference documents
│   ├── src/
│   │   ├── app/
│   │   │   ├── diagnostic/page.tsx         # Multi-step intake wizard
│   │   │   ├── synergism/page.tsx          # Bioactivity synergy calculator UI
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx              # Guarded RAG conversational interface
│   │   │   ├── PDFViewer.tsx               # PDF.js split-screen clause inspector
│   │   │   ├── VoiceInput.tsx              # Bhashini / Web Speech handler
│   │   │   └── Heatmap.tsx                 # TKDL prior-art risk visualization
│   │   └── lib/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

* Python 3.11+
* Node.js 18+ and `npm` / `pnpm`
* PostgreSQL 15+ with the `pgvector` extension installed

### 1. Database Configuration

Create a database and enable the required vector and text search extensions:

```sql
CREATE DATABASE ipsakti;
\c ipsakti;

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE legal_corpus (
    id SERIAL PRIMARY KEY,
    statute_name VARCHAR(255) NOT NULL,
    section_clause VARCHAR(100) NOT NULL,
    jurisdiction VARCHAR(50) NOT NULL, -- 'domestic_india' or 'international_export'
    chunk_content TEXT NOT NULL,
    page_number INT NOT NULL,
    bbox_coordinates JSONB,
    content_tsvector TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', chunk_content)) STORED,
    embedding VECTOR(384)
);

CREATE INDEX ON legal_corpus USING hnsw (embedding vector_cosine_ops);
CREATE INDEX ON legal_corpus USING gin (content_tsvector);
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/ipsakti
GEMINI_API_KEY=your_gemini_api_key
BHASHINI_API_KEY=your_bhashini_key
BHASHINI_USER_ID=your_bhashini_user_id
```

Run database ingest and launch the server:

```bash
# Ingest statutory corpus and populate vectors
python scripts/ingest_statutes.py

# Start FastAPI
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to access the portal.

---

## Guardrails & Privacy Compliance

* **Confidence Threshold Abstention:** If cosine similarity for statutory retrieval drops below `0.70`, the application executes deterministic abstention and raises an escalation ticket rather than generating speculative answers.
* **Digital Personal Data Protection (DPDP) Act, 2023:** Proprietary medicinal formulations submitted for assessment are processed statelessly in memory and are never persisted to disk or used for training without explicit user consent.
* **Statutory Currency:** Pre-indexed datasets are version-tracked to reflect the **Patents (Amendment) Rules, 2024**, **Biological Diversity Rules, 2024**, and the **WIPO GRATK Treaty, 2024**.

---

## Contributing

Contributions are welcome under the standard GitHub workflow:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/SynergismEngine`).
3. Commit your Changes (`git commit -m 'Add Combination Index validation tests'`).
4. Push to the Branch (`git push origin feature/SynergismEngine`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
