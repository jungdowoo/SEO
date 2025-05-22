// components/PostCommentSection.tsx
"use client";

import {useState} from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function PostCommentSection({ postId }: { postId: number }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">💬 댓글</h2>
      <CommentForm postId={postId} onCommentAdded={refresh} />
      <CommentList key={refreshKey} postId={postId} />
    </div>
  );
}
