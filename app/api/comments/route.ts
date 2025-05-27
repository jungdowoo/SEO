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
  const body = await req.json();
  const { post_id, content, author } = body;

  if (!post_id || !content || !author) {
    return NextResponse.json({ error: 'post_id, content, author 모두 필요합니다' }, { status: 400 });
  }

  const { error } = await supabase
    .from('comment')
    .insert([{ post_id, content, author }]);

  if (error) {
    console.error('[COMMENT POST ERROR]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
