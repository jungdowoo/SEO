// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-800">
      <main className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 text-pink-600">썰레발</h1>
        <p className="text-lg mb-6">
          모두가 공감할 수 있는, 웃기고 짜릿한 <strong>썰 모음집</strong>!
          <br />
          재밌는 이야기를 읽고, 제보하고, 공유하세요.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            href="/blog"
            className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
          >
            🔍 썰 구경하기
          </Link>
          <Link
            href="/submit"
            className="px-6 py-3 rounded-full bg-white border border-pink-400 text-pink-600 font-semibold hover:bg-pink-50 transition"
          >
            ✍️ 썰 제보하기
          </Link>
        </div>
      </main>

      <footer className="mt-16 text-sm text-gray-500">
        © 2025 썰레발 — 세상에서 가장 웃긴 썰 저장소
      </footer>
    </div>
  );
}
