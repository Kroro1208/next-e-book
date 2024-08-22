"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CheckoutSuccessPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (sessionId) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/success`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ sessionId })
                    });

                    if (!res.ok) {
                        throw new Error('サーバーエラーが発生しました');
                    }

                    const data = await res.json();
                    setStatus('success');
                    setMessage(data.message || '購入が正常に処理されました');
                } catch (error: any) {
                    console.error('エラーが発生しました:', error);
                    setStatus('error');
                    setMessage(error.message || 'エラーが発生しました');
                }
            } else {
                setStatus('error');
                setMessage('セッションIDが見つかりません');
            }
        };
        fetchData();
    }, [sessionId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                {status === 'loading' && <p className="text-center">処理中...</p>}
                {status === 'success' && (
                    <>
                        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
                            購入ありがとうございます
                        </h1>
                        <p className="text-gray-700 text-center mb-8">
                            {message}
                        </p>
                        <p className="text-gray-700 text-center mb-8">
                            ご購入いただいた内容の詳細は登録されたメールアドレスに送信されます
                        </p>
                        <div className="flex justify-center">
                            <Link href="/purchased-article" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                購入した記事を読む
                            </Link>
                        </div>
                    </>
                )}
                {status === 'error' && (
                    <p className="text-red-500 text-center">{message}</p>
                )}
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;