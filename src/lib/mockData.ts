export interface Cafe {
  id: string;
  name: string;
  description: string;
  category: "Học bài" | "Hẹn hò" | "Chill";
  image_url: string;
}

export const CATEGORIES = ["All", "Học bài", "Hẹn hò", "Chill"] as const;

export type Category = (typeof CATEGORIES)[number];

export const mockCafes: Cafe[] = [
  // ─── Học bài (Study) ───
  {
    id: "cafe-001",
    name: "The Cups Coffee",
    description:
      "Không gian yên tĩnh, WiFi cực mạnh, và cà phê đậm vị. Lý tưởng cho dân dev cày code hay sinh viên ôn thi cuối kỳ. Có ổ điện ở mọi bàn.",
    category: "Học bài",
    image_url:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop",
  },
  {
    id: "cafe-002",
    name: "Cộng Cà Phê - Bạch Đằng",
    description:
      "Decor vintage truyền thống Việt Nam, view sông Hàn siêu chill. Tầng 2 vắng vẻ, phù hợp để tập trung làm bài hoặc đọc sách hàng giờ.",
    category: "Học bài",
    image_url:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop",
  },

  // ─── Hẹn hò (Dating) ───
  {
    id: "cafe-003",
    name: "La Maison 1888",
    description:
      "Quán view biển Mỹ Khê lãng mạn, ánh nến lung linh buổi tối. Menu đa dạng từ cà phê đến cocktail. Spot hoàn hảo cho date night đáng nhớ.",
    category: "Hẹn hò",
    image_url:
      "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop",
  },
  {
    id: "cafe-004",
    name: "Sky36 Lounge",
    description:
      "Rooftop bar tầng 36 Novotel, nhìn toàn cảnh Đà Nẵng về đêm. Atmosphere siêu sang, live music cuối tuần. Date đẳng cấp 5 sao!",
    category: "Hẹn hò",
    image_url:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
  },

  // ─── Chill ───
  {
    id: "cafe-005",
    name: "Bơ Coffee",
    description:
      "Hidden gem ở An Thượng, đồ uống bơ blend signature ngon tuyệt. Nhạc lo-fi, ghế bean bag, và vibe thoải mái nhất Đà Nẵng. Đến rồi không muốn về.",
    category: "Chill",
    image_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
  },
  {
    id: "cafe-006",
    name: "The Espresso Station",
    description:
      "Industrial style giữa lòng Hải Châu, specialty coffee chuẩn barista. Sân vườn mát mẻ, pet-friendly. Chỗ lý tưởng để ngắm phố, nhâm nhi latte art.",
    category: "Chill",
    image_url:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
  },
];
