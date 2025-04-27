import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { date, name, received_bank, items, total_amount } = body;

    const form = await prisma.invoice.create({
      data: {
        date: new Date(date),
        name,
        received_bank,
        total_amount,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json(form);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
