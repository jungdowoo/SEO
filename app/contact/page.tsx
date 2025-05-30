// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">문의하기</h1>
      <p className="text-gray-600 mb-8">
        광고/썰 제보 및 문의 사항은 아래 이메일 주소로 문의주세요.
      </p>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <p className="text-lg">
          ✉️ 이메일: <a href="mailto:ssulrebal@gmail.com" className="text-blue-600 underline">ssulrebal@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
