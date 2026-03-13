# 🎯 Da Nang Chill Finder — Project Vision & Roadmap

> **Mục tiêu cốt lõi**: Implement full **Recommendation System** + **Ranking System** từ zero, học và hiểu hết tất cả công nghệ liên quan thông qua một sản phẩm thực tế.

---

## 🧠 Các hệ thống cần build

### 1. Recommendation System (Gợi ý)

| Phase | Kỹ thuật | Mô tả | Tech |
|---|---|---|---|
| **1A** | Content-Based Filtering | Gợi ý cafes có description/vibe tương tự | pgvector, OpenAI Embeddings |
| **1B** | Collaborative Filtering | "Người giống bạn cũng thích quán X" | Supabase + custom SQL |
| **1C** | Hybrid Approach | Kết hợp 1A + 1B + popularity signals | Weighted scoring |

**Concepts cần nắm**:
- Vector Embeddings (text → numbers)
- Cosine Similarity vs Euclidean Distance
- pgvector: Index types (IVFFlat, HNSW), performance tuning
- Cold start problem (user mới chưa có data)
- Implicit vs Explicit feedback

### 2. Ranking System (Xếp hạng)

| Phase | Kỹ thuật | Mô tả | Tech |
|---|---|---|---|
| **2A** | Popularity-Based | Sort by views, likes, click-through rate | Supabase aggregate queries |
| **2B** | Wilson Score | Reddit-style ranking (tính cả uncertainty) | Custom SQL function |
| **2C** | Time-Decay Ranking | Viral trước nhưng "nguội" dần theo thời gian | HackerNews-style algorithm |
| **2D** | Personalized Ranking | Kết hợp global rank + user preference | Hybrid scoring |

**Concepts cần nắm**:
- Wilson Score Interval (confidence-based ranking)
- Bayesian Average (IMDb-style rating)
- Time-decay functions (gravity, exponential decay)
- Multi-factor scoring (engagement × relevance × freshness)

### 3. Anonymous User Tracking (Nhận dạng người dùng)

| Phase | Kỹ thuật | Mô tả | Tech |
|---|---|---|---|
| **3A** | LocalStorage | Lưu preferences client-side | Browser API |
| **3B** | FingerprintJS | Nhận dạng cross-session, qua incognito | @fingerprintjs/fingerprintjs |
| **3C** | Server-side Profiles | Lưu behavior history trên Supabase | visitor_preferences table |

---

## 🏗️ Implementation Roadmap

```
Phase 0 (✅ DONE) — MVP Shell
├── Next.js 16 + Shadcn UI + Tailwind
├── Mock data (6 cafes)
├── UI: Hero, FilterBar, CafeCard, SimilarVibeSheet
└── Deploy: GitHub + Vercel

Phase 1 — Supabase + Real Data
├── Connect Supabase database
├── Seed real cafe data (20+ cafes Đà Nẵng)
├── CRUD operations (admin panel?)
└── Image upload (Supabase Storage)

Phase 2 — Basic Recommendation
├── OpenAI Embeddings → generate vectors cho mỗi cafe
├── pgvector: Store embeddings, create HNSW index
├── "Find Similar Vibe" → real cosine similarity search
├── RPC function: match_cafes()
└── Learning: embedding space visualization

Phase 3 — Anonymous Personalization
├── FingerprintJS integration
├── visitor_preferences table
├── Track: implicit signals (views, clicks, time spent)
├── "Gợi ý cho bạn" section dựa trên behavior
└── Learning: implicit vs explicit feedback

Phase 4 — Ranking System
├── Add metrics: views, likes, saves, click-through rate
├── Implement Wilson Score ranking
├── Time-decay "trending" feed
├── A/B test: popularity vs personalized ranking
└── Learning: ranking algorithm comparison

Phase 5 — Advanced RecSys
├── Collaborative filtering (user-user similarity)
├── Hybrid: content-based + collaborative + popularity
├── Cold start handling (new users, new cafes)
├── Diversity injection (avoid filter bubble)
└── Learning: recommendation quality metrics (precision, recall, serendipity)

Phase 6 — Scale & Optimize
├── Caching layer (Redis/Upstash)
├── Background jobs (embedding generation)
├── Analytics dashboard (which recs get clicked?)
├── Rate limiting + abuse prevention
└── Performance: pgvector index tuning
```

---

## 📚 Technology Map

```
Frontend          Backend/API         Database           AI/ML
─────────         ───────────         ────────           ─────
Next.js 16        Server Actions      Supabase           OpenAI Embeddings
React 19          API Routes          PostgreSQL         pgvector
Shadcn UI         Edge Functions      pgvector           Cosine Similarity
Tailwind v4                           Row Level Security Collaborative Filtering
FingerprintJS                                            Ranking Algorithms

DevOps            Analytics
──────            ─────────
Vercel            Anonymous Tracking
GitHub Actions    Implicit Feedback
Supabase CLI      A/B Testing
                  Wilson Score
```

---

## 💡 Nguyên tắc phát triển

1. **Learn by building** — Mỗi phase học 1-2 concept mới, implement ngay
2. **Production-first** — Mọi thứ đều deploy thật, không chỉ local
3. **Data-driven** — Đo lường impact của mỗi feature bằng analytics
4. **Modular** — Mỗi system (rec, ranking, tracking) tách rời, test được độc lập
