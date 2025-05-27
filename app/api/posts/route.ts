import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase
    .from('post') // <- 정확한 테이블명
    .select('*');

  if (error) {
    console.error('[SUPABASE ERROR]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!Array.isArray(data)) {
    return NextResponse.json({ error: '예상치 못한 응답 형식' }, { status: 500 });
  }
  
  return NextResponse.json(data);
}
