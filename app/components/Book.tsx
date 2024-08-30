'use client'

import { BookType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    book: BookType;
    isPurchased: boolean;
}

const Book = ({ book, isPurchased }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const user: any = session?.user;
    const router = useRouter();

    // ①購入ボタン押してからの決済処理
    const startCheckout = async () => {
        try {
            if (isPurchased) {
                alert('この商品は購入済みです');
                setShowModal(false);
                return;
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: book.title,
                    price: book.price,
                    userId: user?.id,
                    bookId: book.id
                })
            });
            const responseData = await response.json();
            if (responseData) {
                router.push(responseData.checkout_url);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePurchaseConfirm = () => {
        if (!user) {
            setShowModal(false);
            router.push('/api/auth/signin');
        } else {
            startCheckout();
        }

    }

    const handlePurchase = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
    }
    return (
        <div className="flex flex-col items-center m-4">
            <a
                onClick={handlePurchase}
                className="cursor-pointer shadow-2xl transition duration-300 hover:translate-y-1 hover:shadow-none max-w-sm w-full"
            >
                <div className="flex flex-col h-[380px] bg-slate-100 rounded-xl overflow-hidden">
                    <div className="relative w-full h-48">
                        <Image
                            priority
                            src={book.thumbnail.url}
                            alt={book.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex flex-col flex-grow p-4">
                        <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">{book.title}</h2>
                        <p className="mt-auto text-lg sm:text-md text-slate-700">値段：{book.price}円</p>
                    </div>
                </div>
            </a>

            {/* モーダルの部分 */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 sm:p-8 rounded-lg max-w-xs sm:max-w-sm w-full mx-4">
                        <h3 className="text-lg sm:text-xl mb-4 text-center">購入しますか？</h3>
                        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={handlePurchaseConfirm}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                購入する
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Book;