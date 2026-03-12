"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { CafeCard } from "@/components/CafeCard";
import { FilterBar } from "@/components/FilterBar";
import { HeroSection } from "@/components/HeroSection";
import { SimilarVibeSheet } from "@/components/SimilarVibeSheet";
import { getCafesByCategory, getSimilarCafes } from "@/lib/actions";
import type { Cafe, Category } from "@/lib/mockData";
import { Coffee } from "lucide-react";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [isPending, startTransition] = useTransition();

  // Similar vibe state
  const [similarCafes, setSimilarCafes] = useState<Cafe[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loadingSimilarId, setLoadingSimilarId] = useState<string | null>(null);

  // Fetch cafes on category change
  useEffect(() => {
    startTransition(async () => {
      const data = await getCafesByCategory(activeCategory);
      setCafes(data);
    });
  }, [activeCategory]);

  // Handle filter change
  const handleFilterChange = useCallback((category: Category) => {
    setActiveCategory(category);
  }, []);

  // Handle "Find Similar Vibe"
  const handleFindSimilar = useCallback(
    async (cafeId: string) => {
      setLoadingSimilarId(cafeId);
      const source = cafes.find((c) => c.id === cafeId) ?? null;
      setSelectedCafe(source);

      const similar = await getSimilarCafes(cafeId);
      setSimilarCafes(similar);
      setIsSheetOpen(true);
      setLoadingSimilarId(null);
    },
    [cafes]
  );

  // Close sheet
  const handleCloseSheet = useCallback(() => {
    setIsSheetOpen(false);
    setSelectedCafe(null);
    setSimilarCafes([]);
  }, []);

  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <FilterBar
        activeCategory={activeCategory}
        onFilterChange={handleFilterChange}
      />

      {/* Cafe grid */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        {isPending ? (
          <div className="flex items-center justify-center py-20">
            <Coffee className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : cafes.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">Không tìm thấy quán nào 😢</p>
            <p className="text-sm">Thử chọn category khác nhé!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cafes.map((cafe) => (
              <CafeCard
                key={cafe.id}
                cafe={cafe}
                onFindSimilar={handleFindSimilar}
                isLoading={loadingSimilarId === cafe.id}
              />
            ))}
          </div>
        )}
      </section>

      {/* Similar Vibe Sheet */}
      <SimilarVibeSheet
        sourceCafe={selectedCafe}
        similarCafes={similarCafes}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
      />

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-muted-foreground/50">
        <p>
          Da Nang Chill Finder © {new Date().getFullYear()} — Powered by
          AI & <span className="text-pink-400/60">☕</span>
        </p>
      </footer>
    </main>
  );
}
