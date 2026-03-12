"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Cafe } from "@/lib/mockData";
import { BookOpen, Coffee, Heart, Sparkles } from "lucide-react";

const categoryStyles: Record<
  string,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  "Học bài": {
    color: "text-violet-300",
    bg: "bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/20",
    icon: <BookOpen className="h-3 w-3" />,
  },
  "Hẹn hò": {
    color: "text-pink-300",
    bg: "bg-pink-500/10 border-pink-500/20 text-pink-300 hover:bg-pink-500/20",
    icon: <Heart className="h-3 w-3" />,
  },
  Chill: {
    color: "text-amber-300",
    bg: "bg-amber-500/10 border-amber-500/20 text-amber-300 hover:bg-amber-500/20",
    icon: <Coffee className="h-3 w-3" />,
  },
};

interface CafeCardProps {
  cafe: Cafe;
  onFindSimilar: (cafeId: string) => void;
  isLoading?: boolean;
}

export function CafeCard({ cafe, onFindSimilar, isLoading }: CafeCardProps) {
  const style = categoryStyles[cafe.category] ?? categoryStyles["Chill"];

  return (
    <Card className="group relative overflow-hidden border-white/5 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-xl hover:shadow-primary/5">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-pink-600/30" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cafe.image_url}
          alt={cafe.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{cafe.name}</CardTitle>
          <Badge
            variant="outline"
            className={`shrink-0 gap-1 ${style.bg}`}
          >
            {style.icon}
            {cafe.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {cafe.description}
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 rounded-full border-white/10 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
          onClick={() => onFindSimilar(cafe.id)}
          disabled={isLoading}
        >
          <Sparkles className="h-4 w-4" />
          {isLoading ? "Đang tìm..." : "Find Similar Vibe"}
        </Button>
      </CardFooter>
    </Card>
  );
}
