"use client"

import Book from "./components/Book";

const booksData = [
  {
    id: 1,
    title: "Book1",
    img: "/sns.png",
    price: 5960,
    author: {
      id: 1,
      name: 'Author1',
      description: '作成者はAuthor1です',
      profile_icon: 'https://source.unsplash.com/random/2'
    },
    content: 'Content1',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 2,
    title: "Book2",
    img: "/web-design-3411373_1280.jpg",
    price: 3960,
    author: {
      id: 2,
      name: 'Author2',
      description: '作成者はAuthor2です',
      profile_icon: 'https://source.unsplash.com/random/2'
    },
    content: 'Content2',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 3,
    title: "Book3",
    img: "/hero.jpg",
    price: 3960,
    author: {
      id: 2,
      name: 'Author3',
      description: '作成者はAuthor3です',
      profile_icon: 'https://source.unsplash.com/random/2'
    },
    content: 'Content3',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
];


export default function Home() {
  return (
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Next E-BOOK
      </h2>
      {booksData.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </main>
  );
}
