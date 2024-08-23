import Image from 'next/image';
import { FiBookOpen, FiDownload, FiShare2 } from 'react-icons/fi';

const DetailPage = () => {
    // この部分は実際のデータフェッチロジックに置き換えてください
    const book = {
        title: "The Future of AI: Emerging Trends and Technologies",
        Image: "/placeholder-book-cover.jpg",
        description: "Explore the cutting-edge developments in artificial intelligence and their potential impact on various industries. Dr. Chen provides insights into machine learning, neural networks, and the ethical considerations surrounding AI adoption.",
        price: "15000円",
        pages: 320,
        publishDate: "2024-05-15",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">
                <div className="md:flex-shrink-0">
                    <Image
                        className="h-96 w-full object-cover md:w-64"
                        src={book.Image}
                        alt={book.title}
                        width={256}
                        height={384}
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">E-Book</div>
                    <h1 className="mt-2 text-3xl leading-tight font-bold text-gray-900">{book.title}</h1>
                    <p className="mt-4 text-gray-500">{book.description}</p>
                    <div className="mt-6 flex items-center">
                        <span className="text-2xl font-bold text-gray-900">{book.price}</span>
                        <span className="ml-2 text-sm text-gray-600">({book.pages} pages)</span>
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
                        購入日 {new Date(book.publishDate).toLocaleDateString()}
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
                    {/* Add more chapters as needed */}
                </ul>
            </div>
        </div>
    )
}

export default DetailPage;