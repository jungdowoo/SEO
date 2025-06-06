"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdSlot from "../components/AdSlot";
import Head from "next/head";

const categories = ["전체", "베스트썰", "18세썰", "사이다썰", "연애썰", "치정썰", "감동썰", "직장썰", "소름썰", "가족썰"];
const POSTS_PER_PAGE = 9;

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
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === "전체") return matchesSearch;
    if (selectedCategory === "베스트썰") return post.like_count >= 10 && matchesSearch;
    return post.category === selectedCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Head>
        <title>썰레발 - 인기 썰 모음</title>
      </Head>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      {paginatedPosts.map((post) => (
        <div key={post.id} className="mb-6 border-b pb-4">
          <Link href={`/blog/${post.id}`} className="text-lg font-bold hover:underline">
            {post.title}
          </Link>
          <p className="text-sm text-gray-600">
            {post.created_at.split("T")[0]} · 💬 {post.comment_count} · ❤️ {post.like_count}
          </p>
        </div>
      ))}

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`px-3 py-1 rounded ${
              pageNum === currentPage ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <AdSlot />
      </div>
    </div>
  );
}
