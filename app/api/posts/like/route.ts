import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const body = await req.json();
  const { post_id } = body;

  // 현재 like_count 가져오기
  const { data: current, error: fetchError } = await supabase
    .from('post')
    .select('like_count')
    .eq('id', post_id)
    .single();

  if (fetchError) return Response.json({ error: fetchError.message }, { status: 500 });

  const newCount = (current?.like_count || 0) + 1;

  const { error: updateError } = await supabase
    .from('post')
    .update({ like_count: newCount })
    .eq('id', post_id);

  if (updateError) return Response.json({ error: updateError.message }, { status: 500 });

  return Response.json({ like_count: newCount });
}
