import {db} from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT id, title, content, like_count, comment_count, created_at, category
      FROM post
      ORDER BY created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("DB 쿼리 실패:", err);
    return NextResponse.json({ error: "DB 오류 발생" }, { status: 500 });
  }
}
