import { getBookDetails } from '@/app/lib/microcms/client';
import Image from 'next/image';
import { FiBookOpen, FiDownload, FiShare2 } from 'react-icons/fi';
import DOMPurify from 'isomorphic-dompurify';

// サーバー側で日付をフォーマットする関数
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ja-JP', options);
};

const DetailPage = async ({ params }: { params: { id: string } }) => {
    const book = await getBookDetails(params.id);

    // 価格の表示を決定
    const priceDisplay = typeof book.price === 'number' ? `${book.price}円` : "購入済み";

    // HTMLコンテンツを安全に表示するための関数
    const sanitizeHTML = (htmlContent: string) => ({
        __html: DOMPurify.sanitize(htmlContent)
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">
                <div className="md:flex-shrink-0">
                    <Image
                        className="h-96 w-full object-cover md:w-64"
                        src={book.thumbnail.url}
                        alt={book.title}
                        width={256}
                        height={384}
                        priority
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">E-Book</div>
                    <h1 className="mt-2 text-3xl leading-tight font-bold text-gray-900">{book.title}</h1>
                    <div className="mt-4 text-gray-500 prose" dangerouslySetInnerHTML={sanitizeHTML(book.content)} />
                    <div className="mt-6 flex items-center">
                        <span className="text-2xl font-bold text-gray-900">{priceDisplay}</span>
                    </div>
                    <div className="mt-6 flex space-x-4">
                        <button className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            <FiBookOpen className="mr-2" />
                            本を読む
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            <FiDownload className="mr-2" />
                            ダウンロード
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            <FiShare2 className="mr-2" />
                            共有する
                        </button>
                    </div>
                    <div className="mt-6 text-sm text-gray-500">
                        購入日 {formatDate(book.createdAt)}
                    </div>
                    <div className="mt-6 text-sm text-gray-500">
                        最終更新日 {formatDate(book.updatedAt)}
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
                <ul className="space-y-2 text-gray-600">
                    <li>Chapter 1: Introduction to Modern AI</li>
                    <li>Chapter 2: Machine Learning Fundamentals</li>
                    <li>Chapter 3: Neural Networks and Deep Learning</li>
                    <li>Chapter 4: Natural Language Processing</li>
                    <li>Chapter 5: Computer Vision and Image Recognition</li>
                </ul>
            </div>
        </div>
    )
}

export default DetailPage;