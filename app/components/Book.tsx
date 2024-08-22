'use client'

import { BookType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    book: BookType;
}

const Book = ({ book }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const user: any = session?.user;
    const router = useRouter();

    // ①購入ボタン押してからの決済処理
    const startCheckout = async () => {
        try {
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
            router.push('/login');
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
        <>
            <style jsx global>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: scale(0.9);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .modal {
                        animation: fadeIn 0.3s ease-out forwards;
                    }
                `}
            </style>

            <div className="flex flex-col items-center m-4">
                <a
                    onClick={handlePurchase}
                    className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
                >
                    <Image
                        priority
                        src={book.thumbnail.url}
                        alt={book.title}
                        width={550}
                        height={550}
                        className="rounded-xl h-80"
                    />
                    <div className="px-4 py-4 bg-slate-100 rounded-b-md">
                        <h2 className="text-lg font-semibold">{book.title}</h2>
                        <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
                    </div>
                </a>
                {/* modal */}
                {
                    showModal &&
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
                        <div className="bg-white p-8 rounded-lg">
                            <h3 className="text-xl mb-4 text-center">購入しますか？</h3>
                            <button
                                onClick={handlePurchaseConfirm}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md mr-4">
                                購入する
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md">
                                キャンセル
                            </button>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Book;