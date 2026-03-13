import { supabase } from "./supabase";
import { mockCafes, type Cafe } from "./mockData";

/**
 * Fetch cafes from Supabase, with mock data fallback.
 */
export async function getCafesByCategory(
  category?: string
): Promise<Cafe[]> {
  try {
    let query = supabase
      .from("cafes")
      .select("id, name, description, category, image_url, address, district, rating, total_ratings, opening_hours, phone")
      .order("rating", { ascending: false, nullsFirst: false });

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error.message);
      return fallbackToMock(category);
    }

    if (!data || data.length === 0) {
      return fallbackToMock(category);
    }

    return data as Cafe[];
  } catch {
    return fallbackToMock(category);
  }
}

function fallbackToMock(category?: string): Cafe[] {
  if (!category || category === "All") return mockCafes;
  return mockCafes.filter((c) => c.category === category);
}

/**
 * Find cafes with a similar "vibe".
 *
 * Current: returns cafes from the same category.
 * Phase 2: will use pgvector cosine similarity via match_cafes RPC.
 *
 * ```sql
 * CREATE OR REPLACE FUNCTION match_cafes(
 *   query_embedding vector(1536),
 *   match_threshold float DEFAULT 0.78,
 *   match_count int DEFAULT 5
 * )
 * RETURNS TABLE (
 *   id uuid, name text, description text,
 *   category text, image_url text, similarity float
 * )
 * LANGUAGE plpgsql AS $$
 * BEGIN
 *   RETURN QUERY
 *   SELECT cafes.id, cafes.name, cafes.description,
 *          cafes.category, cafes.image_url,
 *          1 - (cafes.embedding <=> query_embedding) AS similarity
 *   FROM cafes
 *   WHERE 1 - (cafes.embedding <=> query_embedding) > match_threshold
 *   ORDER BY cafes.embedding <=> query_embedding
 *   LIMIT match_count;
 * END; $$;
 * ```
 */
export async function getSimilarCafes(cafeId: string): Promise<Cafe[]> {
  try {
    // Get source cafe's category
    const { data: source } = await supabase
      .from("cafes")
      .select("category")
      .eq("id", cafeId)
      .single();

    if (!source) return [];

    const { data, error } = await supabase
      .from("cafes")
      .select("id, name, description, category, image_url, address, rating")
      .eq("category", source.category)
      .neq("id", cafeId)
      .order("rating", { ascending: false, nullsFirst: false })
      .limit(5);

    if (error || !data) {
      // Fallback to mock
      const sourceMock = mockCafes.find((c) => c.id === cafeId);
      if (!sourceMock) return [];
      return mockCafes.filter((c) => c.id !== cafeId && c.category === sourceMock.category);
    }

    return data as Cafe[];
  } catch {
    const sourceMock = mockCafes.find((c) => c.id === cafeId);
    if (!sourceMock) return [];
    return mockCafes.filter((c) => c.id !== cafeId && c.category === sourceMock.category);
  }
}
