"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type Payment = {
  id: string;
  total_amount: string;
  status: "pending" | "processing" | "success" | "failed";
  date: string;
  name: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => {
      return new Date(row.original.date).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "total_amount",
    header: "Tagihan",
    cell: ({ row }) => {
      // Mengonversi string ke number
      const totalAmount = parseFloat(row.original.total_amount);

      // Memastikan konversi berhasil
      if (isNaN(totalAmount)) {
        return "Rp. 0";
      }

      // Mengembalikan formatted string dengan thousand separator
      return `Rp. ${totalAmount.toLocaleString("id-ID")}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      async function loadImageAsBase64(url: string) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }

      const handleDownloadInvoice = async () => {
        const doc = new jsPDF();
        const logo = await loadImageAsBase64("/cv-rizky.png");

        // Header
        const marginX = 14; // margin kiri
        const tableWidth = 180; // lebar table, kira-kira 210 A4 - margin kiri-kanan
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("CV. Rizky Fitri Akbar", marginX + tableWidth, 20, {
          align: "right",
        });
        doc.setFontSize(10);
        doc.text(
          "Panorama Jatinangor Blok P.117, Tanjungsari, Sumedang (45362)",
          marginX + tableWidth,
          26,
          { align: "right" }
        );
        doc.text("rizkyfitriakbar@gmail.com", marginX + tableWidth, 30, {
          align: "right",
        });
        doc.text("081322064575", marginX + tableWidth, 35, {
          align: "right",
        });

        // Logo Placeholder (optional)
        doc.addImage(logo, "PNG", 10, 10, 30, 30);

        // Customer Info
        doc.setFontSize(12);
        doc.text(`Yth. ${payment.name}`, 10, 50);

        // Invoice Info
        doc.setFontSize(10);

        // Jadi untuk posisi teks kanan:
        const boxX = 125;
        const boxY = 40;
        const boxWidth = 70;
        const boxHeight = 40;
        doc.setFillColor(240, 240, 240); // light gray
        doc.rect(boxX, boxY, boxWidth, boxHeight, "F");

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(`Invoice #: ${payment.id}`, boxX + 5, boxY + 8);
        doc.setFont("helvetica", "normal");
        doc.text(`Email: m@example.com`, boxX + 5, boxY + 16);
        doc.text(`Terms: Net 30`, boxX + 5, boxY + 24);
        doc.text(`Due Date: 20/04/2025`, boxX + 5, boxY + 32);

        // Nominal besar (di luar kotak)
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(
          `Rp. ${parseFloat(payment.total_amount).toLocaleString("id-ID")}`,
          boxX + 5,
          boxY + boxHeight + 12
        );

        // Table of items
        autoTable(doc, {
          startY: 100,
          head: [
            [
              "NAMA BARANG",
              "QTY",
              "SATUAN",
              "UNIT PRICE (Rp.)",
              "AMOUNT (Rp.)",
            ],
          ],
          body: [
            ["Amplop Coklat Kaca Kiri", "1", "Pack", "105,00", "315.000,00"],
            ["Ban Uang Rp. 100.000", "1", "Ikat", "15.000,00", "15.000,00"],
          ],
          theme: "striped",
        });

        // Summary
        let finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.text(`Subtotal`, 140, finalY, { align: "right" });
        doc.text(`Rp. 330.000,00`, 190, finalY, { align: "right" });

        finalY += 6;
        doc.text(`PPn (12%)`, 140, finalY, { align: "right" });
        doc.text(`Rp. 330.000,00`, 190, finalY, { align: "right" });

        finalY += 6;
        doc.text(`TOTAL`, 140, finalY, { align: "right" });
        doc.text(`Rp. 330.000,00`, 190, finalY, { align: "right" });

        // Payment Detail
        finalY += 20;
        doc.setFontSize(12);
        doc.text("Payment Detail", 10, finalY);

        doc.setFontSize(10);
        doc.text(
          [
            "Bank Name: BTN",
            "Bank Branch: Bandung Timur",
            "Account Name: Rien Sulami",
            "Account Number: 7842830888",
            `Payment Reference: ${payment.id}`,
          ],
          10,
          finalY + 6
        );

        // Save the file
        doc.save(`invoice-${payment.id}.pdf`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownloadInvoice}>
              Download Invoice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
