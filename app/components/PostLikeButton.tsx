"use client";
import {useState,useEffect} from "react";

export default function PostLikeButton({postId, initialCount} : {postId:number; initialCount:number}) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(initialCount);

    useEffect(()=> {
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
        setLiked(likedPosts.includes(postId));
    },[postId]);

    const handleLike = async () => {
        if(liked) return;

        const res = await fetch("/api/posts/like", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({postId}),
        });

        if(res.ok) {
            setCount((prev) => prev +1);
            setLiked(true);
            const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
            likedPosts.push(postId);
            localStorage.setItem("likedPosts",JSON.stringify(likedPosts));
        }
    };

    return (
    <button
        onClick={handleLike}
        disabled={liked}
        className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium border transition
        ${liked
            ? "bg-pink-500 text-white border-pink-500 cursor-not-allowed"
            : "bg-white text-pink-500 border-pink-500 hover:bg-pink-50"}`}
    >
        ❤️ 좋아요 {count}
    </button>
);



}
