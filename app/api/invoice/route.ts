import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ message: "Hello from Forms API" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Data dari POST:", body);

    return NextResponse.json({ message: "Data berhasil diterima", data: body });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { date, name, received_bank, items } = body;

//     const form = await prisma.form.create({
//       data: {
//         date: new Date(date),
//         name,
//         received_bank,
//         items: {
//           create: items.map((item: any) => ({
//             name: item.name,
//             quantity: item.quantity,
//             unit: item.unit,
//             price: item.price,
//           })),
//         },
//       },
//     });

//     return NextResponse.json(form);
//   } catch (error) {
//     console.error(error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
