"use client";

import {useEffect, useState} from "react";

type Post = {
    id:number;
    title:string;
    content: string;
    like_count: number;
    comment_count: number;
    created_at: string;
};

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(()=>{
        fetch("/api/posts")
        .then((res)=> res.json())
        .then(setPosts);
    },[]);
    
    return(
        <ul className="space-y-4">
            {posts.map((post)=>(
                <li key={post.id} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-600">{post.created_at}</p>
                    <p className="mt-2">{post.content}</p>
                    <div className="text-sm text-gray-500 mt-2">
                        ❤️ {post.like_count} · 💬 {post.comment_count}
                    </div>
                </li>
            ))}
        </ul>
    )
}
