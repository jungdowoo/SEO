import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('post')
      .select('id, title, content, like_count, comment_t, created_at, category')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'DB 오류 발생' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('API 오류:', err);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
