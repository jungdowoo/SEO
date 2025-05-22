
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-gray-900 hover:text-blue-600">
            썰레발
          </span>
        </Link>
        <nav className="space-x-4 hidden md:block">
          <Link href="/" className="text-gray-700 hover:text-blue-600">홈</Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600">블로그</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">소개</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">문의</Link>
        </nav>
      </div>
    </header>
  );
}
