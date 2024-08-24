import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../lib/next-auth/options";
import { BookType, Purchase, User } from "@/types/types";
import icon from '../logo.svg'
import { getAllBooks, getBookDetails } from "../lib/microcms/client";
import DOMPurify from 'isomorphic-dompurify';

// async function getUserPurchases(userId: string) {
//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/purchases/${userId}`,
//         { cache: "no-store" }
//     );
//     const purchases = await response.json();
//     return purchases.map((purchase: Purchase) => purchase.bookId);
// }

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    let purchasesDetailBooks: BookType[] = [];

    if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`, { cache: "no-store" });
        const purchasesData = await response.json();

        // 複数の購入本のデータ取得するのでPromise.all()使用
        purchasesDetailBooks = await Promise.all(
            purchasesData.map(async (book: Purchase) => {
                return await getBookDetails(book.bookId);
            })
        );
    }

    // const { contents: allBooks } = await getAllBooks();
    // const purchasedBookIds = await getUserPurchases(user.id);

    // const purchasedBooks = allBooks.filter((book: BookType) =>
    //     purchasedBookIds.includes(book.id)
    // );

    const sanitizeHTML = (htmlContent: string) => ({
        __html: DOMPurify.sanitize(htmlContent)
    });

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center space-x-6">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-purple-200">
                        <Image
                            src={user.image || icon}
                            alt="user profile icon"
                            fill
                            className="object-cover"
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
    );
}