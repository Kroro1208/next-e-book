import { BookType } from "@/types/types";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/next-auth/options";

export default async function Home() {
  const { contents } = await getAllBooks();
  // useSession()はclientコンポーネント仕様なので、ここではgetServerSession()を選択
  const session = await getServerSession(authOptions);
  const user: any = session?.user;
  let purchaseBookIds: string[] = [];

  if (user) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`);
    const purchasesData = await response.json();

    purchaseBookIds = purchasesData.map((purchasesBook: any) => purchasesBook.bookId)
  }

  return (
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Next E-BOOK
      </h2>
      {contents.map((book: BookType) => (
        <Book key={book.id} book={book} isPurchased={purchaseBookIds.includes(String(book.id))} />
      ))}
    </main>
  );
}
