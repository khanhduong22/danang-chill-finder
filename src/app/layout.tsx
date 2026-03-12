import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Da Nang Chill Finder — Tìm quán chill nhất Đà Nẵng",
  description:
    "Khám phá quán cà phê chill nhất Đà Nẵng — cho dân học bài, hẹn hò, hay chỉ muốn chill. Gợi ý bằng AI với pgvector.",
  keywords: [
    "Da Nang",
    "cafe",
    "chill",
    "recommendation",
    "AI",
    "pgvector",
    "Đà Nẵng",
  ],
  openGraph: {
    title: "Da Nang Chill Finder",
    description: "Tìm quán cà phê chill nhất Đà Nẵng — gợi ý bằng AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
