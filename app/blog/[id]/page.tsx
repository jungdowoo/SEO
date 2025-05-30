import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "../../components/AdSlot";
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


export async function generateMetadata(props: { params: { id: string } }): Promise<Metadata> {
  const postId = Number(props.params.id);

  const { data: post } = await supabase
    .from("post")
    .select("title, content")
    .eq("id", postId)
    .single();

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
      description: "존재하지 않는 게시글입니다.",
    };
  }

  const title = `${post.title} | 썰레발`;
  const description = post.content.slice(0, 100) + "...";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const postId = Number(params.id);

  if (isNaN(postId)) return notFound();

  const { data: post, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", postId)
    .single();

  if (error || !post) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="mb-6">
        <span className="inline-block text-xs bg-pink-200 text-pink-700 px-3 py-1 rounded-full font-semibold mb-2">
          #{post.category}
        </span>
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
      </div>

      <div className="prose prose-xl max-w-none text-gray-900 leading-loose tracking-wide font-[pretendard]">
        {post.content}
      </div>

      <div className="mt-10 flex items-center gap-6 text-sm text-gray-500 border-t pt-6">
        <PostLikeButton postId={post.id} initialCount={post.like_count} />
        <span>💬 댓글 {post.comment_count}개</span>
      </div>

      <AdSlot />

      <PostCommentSection postId={post.id} />
    </div>
  );
}
