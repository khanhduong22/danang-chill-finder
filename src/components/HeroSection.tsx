"use client";

import { MapPin, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 text-center md:py-28">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-sm">
          <MapPin className="h-4 w-4 text-pink-400" />
          <span className="text-muted-foreground">Đà Nẵng, Việt Nam</span>
        </div>

        <h1 className="mb-4 bg-gradient-to-r from-pink-400 via-violet-400 to-amber-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
          Da Nang
          <br />
          Chill Finder
        </h1>

        <p className="mx-auto max-w-xl text-lg text-muted-foreground md:text-xl">
          Khám phá quán cà phê chill nhất Đà Nẵng — cho dân{" "}
          <span className="font-semibold text-violet-400">học bài</span>,{" "}
          <span className="font-semibold text-pink-400">hẹn hò</span>, hay chỉ
          muốn{" "}
          <span className="font-semibold text-amber-400">chill</span>.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Gợi ý bằng AI — tìm quán đúng vibe của bạn</span>
        </div>
      </div>
    </section>
  );
}
