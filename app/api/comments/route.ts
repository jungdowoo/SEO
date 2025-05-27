// app/api/comments/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'postId 누락됨' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('comment')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[COMMENT GET ERROR]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[COMMENT POST 요청]", body);

    const { post_id, content, author } = body;

    if (!post_id || !content || !author) {
      console.warn("[VALIDATION ERROR]", { post_id, content, author });
      return NextResponse.json(
        { error: 'post_id, content, author 모두 필요합니다' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('comment')
      .insert([{ post_id, content, author }]);

    if (error) {
      console.error("[SUPABASE INSERT ERROR]", error);
      return NextResponse.json(
        { error: error.message, details: error.details || null },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[UNEXPECTED ERROR]", err);
    return NextResponse.json({ error: "서버 내부 오류 발생", detail: `${err}` }, { status: 500 });
  }
}
