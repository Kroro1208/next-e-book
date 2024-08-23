"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

// ③　②の処理をuseSWRで呼び出し
// カスタムフェッチャー関数
const fetcher = async (url: string, sessionId: string) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId })
    });

    if (!res.ok) {
        throw new Error('サーバーエラーが発生しました');
    }

    return res.json();
};

const CheckoutSuccessPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const { data, error } = useSWR(
        sessionId ? [`${process.env.NEXT_PUBLIC_API_URL}/checkout/success`, sessionId] : null,
        ([url, sessionId]) => fetcher(url, sessionId)
    );

    const bookUrl = data?.purchase?.bookId;

    const status = error ? 'error' : !data ? 'loading' : 'success';
    const message = error ? (error.message || 'エラーが発生しました') :
        data ? (data.message || '購入が正常に処理されました') : '';

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
                            <Link href={`/book/${bookUrl}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
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