import { Metadata } from "next";

type Params = { params: { id: string } };

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/metadata/${params.id}`, {
    next: { revalidate: 60 },
  });

  const post = await res.json();

  if (!post?.title) {
    return {
      title: "글을 찾을 수 없습니다",
      description: "존재하지 않는 게시글입니다.",
    };
  }

  const description = post.description || post.content?.slice(0, 100) + "...";
  const keywords = post.keywords || ""; 

  return {
    title: `${post.title} | 썰레발`,
    description,
    keywords,
    openGraph: {
      title: `${post.title} | 썰레발`,
      description,
    },
    twitter: {
      title: `${post.title} | 썰레발`,
      description,
    },
  };
};
