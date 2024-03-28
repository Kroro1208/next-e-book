'use client'

import Image from "next/image";

type Props = {
    book: {
        id: number;
        title: string;
        img: string;
        price: number;
        author: {
            id: number;
            name: string;
            description: string;
            profile_icon: string;
        };
        content: string;
        created_at: string;
        updated_at: string;
    };
}

const Book = ({ book }: Props) => {
    console.log(book);
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
                <a className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
                >
                    <Image
                        priority
                        src={book.img}
                        alt={book.title}
                        width={450}
                        height={350}
                        className="rounded-t-md"
                    />
                    <div className="px-4 py-4 bg-slate-100 rounded-b-md">
                        <h2 className="text-lg font-semibold">{book.title}</h2>
                        {/* <p className="mt-2 text-lg text-slate-600">この本は○○...</p> */}
                        <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
                    </div>
                </a>
            </div>
        </>
    );
}

export default Book;