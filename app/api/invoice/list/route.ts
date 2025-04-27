import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        items: true, // Mengambil semua data terkait InvoiceItem
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
