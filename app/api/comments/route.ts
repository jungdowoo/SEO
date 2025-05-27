import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const postId = url.searchParams.get('postId');

  const { data, error } = await supabase
    .from('comment')
    .select('*')
    .eq('post_id', postId)
    .order('id', { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { post_id, content, author } = body;

  const { data, error } = await supabase.from('comment').insert([{ post_id, content, author }]);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data, { status: 201 });
}
