// app/api/posts/like/route.ts

import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { postId } = await req.json();

  if (!postId) {
    return NextResponse.json({ error: 'postId 누락됨' }, { status: 400 });
  }

  // 현재 like_count 가져오기
  const { data: currentPost, error: fetchError } = await supabase
    .from('post')
    .select('like_count')
    .eq('id', postId)
    .single();

  if (fetchError) {
    console.error('Fetch Error:', fetchError);
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const newCount = (currentPost?.like_count || 0) + 1;

  // 좋아요 업데이트
  const { error: updateError } = await supabase
    .from('post')
    .update({ like_count: newCount })
    .eq('id', postId);

  if (updateError) {
    console.error('Update Error:', updateError);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, like_count: newCount });
}
