"use client";

import { useState } from "react";

type Props = {
  postId: number;
  onCommentAdded?: () => void;
};

export default function CommentForm({ postId, onCommentAdded }: Props) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/comments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    post_id: postId,   // ✅ key 이름 변경!
    author,
    content,
  }),
});

    setAuthor("");
    setContent("");
    setLoading(false);
    onCommentAdded?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <input
        type="text"
        placeholder="닉네임"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      {/* ✅ 누락됐던 textarea 추가 */}
      <textarea
      
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full border p-2 rounded h-24"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        {loading ? "등록중..." : "댓글 등록"}
      </button>
    </form>
  );
}
