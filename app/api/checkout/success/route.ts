import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.client_reference_id || !session.metadata?.bookId) {
      return NextResponse.json(
        { error: "Invalid session data" },
        { status: 400 }
      );
    }

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id,
        bookId: session.metadata.bookId,
      },
    });

    if (!existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id,
          bookId: session.metadata.bookId,
        },
      });

      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({ message: "既に購入済みです" });
    }
  } catch (error) {
    console.error("Error processing purchase:", error);
    return NextResponse.json(
      { error: "購入処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
