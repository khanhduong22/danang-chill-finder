import { mockCafes, type Cafe } from "./mockData";
// import { supabase } from "./supabase";

// ─────────────────────────────────────────────────────────────
// For MVP: uses mock data. Uncomment Supabase calls when ready.
// ─────────────────────────────────────────────────────────────

/**
 * Fetch cafes, optionally filtered by category.
 *
 * When Supabase is connected, replace the mock implementation with:
 * ```ts
 * const query = supabase.from("cafes").select("*");
 * if (category && category !== "All") {
 *   query.eq("category", category);
 * }
 * const { data, error } = await query;
 * if (error) throw error;
 * return data as Cafe[];
 * ```
 */
export async function getCafesByCategory(
  category?: string
): Promise<Cafe[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!category || category === "All") {
    return mockCafes;
  }

  return mockCafes.filter((cafe) => cafe.category === category);
}

/**
 * Find cafes with a similar "vibe" using vector similarity.
 *
 * In production, this calls a Supabase RPC function that uses
 * pgvector's cosine distance operator (`<=>`) to rank cafes
 * by embedding similarity.
 *
 * Example Supabase RPC (create in SQL Editor):
 * ```sql
 * CREATE OR REPLACE FUNCTION match_cafes(
 *   query_embedding vector(1536),
 *   match_threshold float DEFAULT 0.78,
 *   match_count int DEFAULT 5
 * )
 * RETURNS TABLE (
 *   id uuid,
 *   name text,
 *   description text,
 *   category text,
 *   image_url text,
 *   similarity float
 * )
 * LANGUAGE plpgsql
 * AS $$
 * BEGIN
 *   RETURN QUERY
 *   SELECT
 *     cafes.id,
 *     cafes.name,
 *     cafes.description,
 *     cafes.category,
 *     cafes.image_url,
 *     1 - (cafes.embedding <=> query_embedding) AS similarity
 *   FROM cafes
 *   WHERE 1 - (cafes.embedding <=> query_embedding) > match_threshold
 *   ORDER BY cafes.embedding <=> query_embedding
 *   LIMIT match_count;
 * END;
 * $$;
 * ```
 *
 * Then call it with:
 * ```ts
 * const { data, error } = await supabase
 *   .rpc("match_cafes", {
 *     query_embedding: targetCafeEmbedding,
 *     match_threshold: 0.78,
 *     match_count: 5,
 *   });
 * ```
 */
export async function getSimilarCafes(cafeId: string): Promise<Cafe[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock: return cafes from the same category (excluding the source cafe)
  const sourceCafe = mockCafes.find((c) => c.id === cafeId);
  if (!sourceCafe) return [];

  return mockCafes.filter(
    (c) => c.id !== cafeId && c.category === sourceCafe.category
  );
}
