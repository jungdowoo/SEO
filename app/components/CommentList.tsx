"use client";
import { useEffect, useState } from "react";

type Comment = {
  id: number;
  author: string;
  content: string;
  created_at: string;
};

export default function CommentList({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-10 space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="border p-3 rounded">
          <p className="text-sm text-gray-600">
            {c.author} · {new Date(c.created_at).toLocaleString()}
          </p>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  );
}
