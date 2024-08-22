import Link from 'next/link';

const CheckoutSuccessPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
                    購入ありがとうございます
                </h1>
                <p className="text-gray-700 text-center mb-8">
                    ご購入いただいた内容の詳細は登録されたメールアドレスに送信されます
                </p>
                <div className="flex justify-center">
                    <Link href="/purchased-article" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                        購入した記事を読む
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;