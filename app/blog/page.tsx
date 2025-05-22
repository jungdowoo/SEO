"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdSlot from "@/app/components/AdSlot";


const categories = ["전체", "베스트썰", "18세썰", "사이다썰", "연애썰", "치정썰"];

type Post = {
  id: number;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  category?: string;
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const filteredPosts =
    selectedCategory === "전체"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white px-4 py-12 text-gray-800 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-pink-600 mb-10">
        ✨ 썰 구경하기
      </h1>

      {/* 카테고리 선택 */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-pink-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/**광고영역 */}
        <AdSlot/>
      {/* 썰 리스트 */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`} // 나중에 동적 라우팅 시 사용 가능
            className="block bg-pink-50 hover:bg-pink-100 p-4 rounded-lg shadow transition"
          >
            <span className="text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full inline-block mb-2">
              #{post.category}
            </span>
            <h2 className="text-base font-semibold">{post.title}</h2>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-center col-span-full text-gray-500">해당 카테고리에 썰이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
