import {db} from "@/lib/db";
import {NextResponse} from "next/server";

export async function POST(req: Request){
    const {postId} = await req.json();

    if(!postId) {
        return NextResponse.json({error:"postId누락"}, {status:400});
    }
    await db.query(`UPDATE post SET like_count = like_count +1 WHERE id = ?`, [postId]);

    return NextResponse.json({success:true});
}