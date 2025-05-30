import {NextResponse} from "next/server";
import {supabase} from "@/lib/supabase";

export async function GET(req: Request, {params}: {params:{id:string}}) {
    const postId = Number(params.id);

    const {data:post, error} = await supabase
        .from("post")
        .select("id,title,content,created_at,like_count,comment_count,category")
        .eq("id",postId)
        .single();

        if(error || !post) {
            return NextResponse.json({}, {status:404});
        }
        return NextResponse.json(post);
}