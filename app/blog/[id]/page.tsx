
import AdSlot from "../../components/AdSlot";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PostCommentSection from "@/app/components/PostCommentSection";
import PostLikeButton from "@/app/components/PostLikeButton";


type Post = {
  id: number;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  category: string;
};

export default async function PostDetailPage({ params }: any) {
  const postId = Number(params.id);

  if (isNaN(postId)) return notFound();

  // Supabase로 단건 조회
  const { data: post, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", postId)
    .single();

  if (error || !post) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      {/* 카테고리 & 날짜 */}
      <div className="mb-6">
        <span className="inline-block text-xs bg-pink-200 text-pink-700 px-3 py-1 rounded-full font-semibold mb-2">
          #{post.category}
        </span>
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-2">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleString()}
        </p>
      </div>

      {/* 본문 내용 */}
      <div className="prose prose-xl max-w-none text-gray-900 leading-loose tracking-wide font-[pretendard]">
        {post.content}
      </div>

      {/* 좋아요, 댓글 수 */}
      <div className="mt-10 flex items-center gap-6 text-sm text-gray-500 border-t pt-6">
        <PostLikeButton postId={post.id} initialCount={post.like_count} />
        <span>💬 댓글 {post.comment_count}개</span>
      </div>

      {/* 광고 */}
      <AdSlot />

      {/* 댓글 영역 */}
      <PostCommentSection postId={post.id} />
    </div>
  );
}
