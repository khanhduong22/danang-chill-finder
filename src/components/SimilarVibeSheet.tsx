"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Cafe } from "@/lib/mockData";
import { ArrowRight, X } from "lucide-react";

interface SimilarVibeSheetProps {
  sourceCafe: Cafe | null;
  similarCafes: Cafe[];
  isOpen: boolean;
  onClose: () => void;
}

export function SimilarVibeSheet({
  sourceCafe,
  similarCafes,
  isOpen,
  onClose,
}: SimilarVibeSheetProps) {
  if (!isOpen || !sourceCafe) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close similar vibes panel"
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl animate-in slide-in-from-bottom-5 duration-300">
        <div className="rounded-t-2xl border border-white/10 bg-card/95 p-6 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Same Vibe As
              </p>
              <h3 className="text-xl font-bold">{sourceCafe.name}</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Results */}
          {similarCafes.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              Không tìm thấy quán tương tự. Hãy thử lại sau!
            </p>
          ) : (
            <div className="space-y-3">
              {similarCafes.map((cafe) => (
                <div
                  key={cafe.id}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-3 transition-all hover:border-white/10 hover:bg-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cafe.image_url}
                    alt={cafe.name}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{cafe.name}</span>
                      <Badge
                        variant="outline"
                        className="text-xs opacity-70"
                      >
                        {cafe.category}
                      </Badge>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {cafe.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
