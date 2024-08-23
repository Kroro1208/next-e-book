import { BookType } from "@/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "fittech",
  });

  return allBooks;
};

export const getBookDetails = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "fittech",
    contentId,
  });

  return detailBook;
};
