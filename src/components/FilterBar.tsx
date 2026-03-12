"use client";

import { Button } from "@/components/ui/button";
import { CATEGORIES, type Category } from "@/lib/mockData";
import { BookOpen, Coffee, Heart, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";

const categoryIcons: Record<Category, ReactNode> = {
  All: <LayoutGrid className="h-4 w-4" />,
  "Học bài": <BookOpen className="h-4 w-4" />,
  "Hẹn hò": <Heart className="h-4 w-4" />,
  Chill: <Coffee className="h-4 w-4" />,
};

const categoryColors: Record<Category, string> = {
  All: "",
  "Học bài": "text-violet-400",
  "Hẹn hò": "text-pink-400",
  Chill: "text-amber-400",
};

interface FilterBarProps {
  activeCategory: Category;
  onFilterChange: (category: Category) => void;
}

export function FilterBar({ activeCategory, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-6">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <Button
            key={cat}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={`gap-2 rounded-full px-5 transition-all duration-200 ${
              isActive
                ? "shadow-lg shadow-primary/20"
                : `hover:bg-accent/50 ${categoryColors[cat]}`
            }`}
            onClick={() => onFilterChange(cat)}
          >
            {categoryIcons[cat]}
            {cat}
          </Button>
        );
      })}
    </div>
  );
}
