import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../lib/next-auth/options";
import { BookType, User } from "@/types/types";
import icon from '../logo.svg'
import { getAllBooks } from "../lib/microcms/client";
import DOMPurify from 'isomorphic-dompurify';

async function getUserPurchases(userId: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/purchases/${userId}`,
        { cache: "no-store" }
    );
    const purchases = await response.json();
    return purchases.map((purchase: any) => purchase.bookId);
}

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    const { contents: allBooks } = await getAllBooks();
    const purchasedBookIds = await getUserPurchases(user.id);

    const purchasedBooks = allBooks.filter((book: BookType) =>
        purchasedBookIds.includes(book.id)
    );

    const sanitizeHTML = (htmlContent: string) => ({
        __html: DOMPurify.sanitize(htmlContent)
    });

    return (
        <div className="container mx-auto p-6 bg-gradient-to-r from-purple-50 to-pink-50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">プロフィール</h1>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center space-x-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-purple-200">
                                <Image
                                    src={user.image || icon}
                                    alt="user profile_icon"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                                <p className="text-gray-600 mt-1">{user.email}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">自己紹介</h3>
                            <p className="text-gray-600">
                                ここにユーザーの自己紹介文が入ります。趣味や興味のある分野、目標などを書くことができます。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">購入した記事</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {purchasedBooks.map((book: BookType) => (
                            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                                <Image
                                    src={book.thumbnail.url}
                                    alt={book.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 max-h-36">
                                    <h4 className="font-semibold text-lg mb-2">{book.title}</h4>
                                    <div className="text-gray-600 text-sm truncate prose line-clamp-2" dangerouslySetInnerHTML={sanitizeHTML(book.content)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}