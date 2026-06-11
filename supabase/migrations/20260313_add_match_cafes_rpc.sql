-- Phase 2: pgvector RPC + HNSW index
-- Enables AI-powered "Find Similar Vibe" via cosine similarity

-- Step 1: Change vector dimension from 1536 (OpenAI) to 768 (Gemini)
ALTER TABLE cafes ALTER COLUMN embedding TYPE vector(768);

-- Step 2: Create HNSW index for fast cosine similarity search
-- HNSW (Hierarchical Navigable Small World) = graph-based approximate nearest neighbor
-- m = 16: each node connects to 16 neighbors (higher = more accurate but slower inserts)
-- ef_construction = 64: search width during index build (higher = better quality index)
CREATE INDEX IF NOT EXISTS cafes_embedding_hnsw_idx
ON cafes USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Step 3: match_cafes RPC function
-- Called by the app to find cafes with similar "vibe"
-- Uses cosine distance operator <=> to rank by embedding similarity
CREATE OR REPLACE FUNCTION match_cafes(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 5,
  exclude_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  category text,
  image_url text,
  address text,
  district text,
  rating float,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.name,
    c.description,
    c.category,
    c.image_url,
    c.address,
    c.district,
    c.rating::float,
    -- cosine similarity = 1 - cosine distance
    -- <=> is pgvector's cosine distance operator
    (1 - (c.embedding <=> query_embedding))::float AS similarity
  FROM cafes c
  WHERE
    c.embedding IS NOT NULL
    AND c.id != COALESCE(exclude_id, '00000000-0000-0000-0000-000000000000'::uuid)
    AND (1 - (c.embedding <=> query_embedding)) > match_threshold
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
