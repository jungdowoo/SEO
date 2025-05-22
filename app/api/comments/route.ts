import {db} from "@/lib/db";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {postId, author, content} = await req.json();

    if(!postId || !author || !content) {
        return NextResponse.json({error: "모든 필드를 입력하세요."}, {status:400});
    }
    await db.query(
        'INSERT INTO comment (post_id, author, content) VALUES(?,?,?)',
        [postId,author,content]
    );
    return NextResponse.json({message:"댓글이 등록되었습니다."});
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) return NextResponse.json([], { status: 200 });

  const [rows] = await db.query(`SELECT * FROM comment WHERE post_id = ? ORDER BY created_at DESC`, [postId]);
  return NextResponse.json(rows);
}