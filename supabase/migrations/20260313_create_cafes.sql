-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Cafes table
CREATE TABLE IF NOT EXISTS cafes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  google_place_id text,
  foody_id text,
  shopee_food_id text,
  name text NOT NULL,
  description text,
  category text DEFAULT 'Chill',
  address text,
  district text DEFAULT 'Hải Châu',
  latitude double precision,
  longitude double precision,
  rating double precision,
  total_ratings int DEFAULT 0,
  price_level int,
  image_url text,
  phone text,
  website text,
  opening_hours jsonb,
  reviews jsonb DEFAULT '[]'::jsonb,
  source text DEFAULT 'google',
  embedding vector(1536),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cafes_category ON cafes(category);
CREATE INDEX IF NOT EXISTS idx_cafes_rating ON cafes(rating DESC);
CREATE INDEX IF NOT EXISTS idx_cafes_district ON cafes(district);

-- Unique constraints for deduplication across sources
CREATE UNIQUE INDEX IF NOT EXISTS idx_cafes_google_place_id ON cafes(google_place_id) WHERE google_place_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_cafes_foody_id ON cafes(foody_id) WHERE foody_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_cafes_shopee_food_id ON cafes(shopee_food_id) WHERE shopee_food_id IS NOT NULL;

-- RLS: Allow read for all, write only for service_role
ALTER TABLE cafes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON cafes FOR SELECT USING (true);
