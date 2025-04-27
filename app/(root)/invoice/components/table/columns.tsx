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
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  date: string;
  name: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "amount",
    header: "Amount",
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

        // Logo Placeholder (optional)
        doc.addImage(logo, "PNG", 10, 10, 30, 30);

        // Customer Info
        doc.setFontSize(12);
        doc.text(`Yth. ${payment.name}`, 10, 50);

        // Invoice Info
        doc.setFontSize(10);

        // Jadi untuk posisi teks kanan:
        doc.text(`Invoice #: ${payment.id}`, marginX + tableWidth, 50, {
          align: "right",
        });
        doc.text(`Email: m@example.com`, marginX + tableWidth, 56, {
          align: "right",
        });
        doc.text(`Terms: Net 30`, marginX + tableWidth, 62, { align: "right" });
        doc.text(`Due Date: 20/04/2025`, marginX + tableWidth, 68, {
          align: "right",
        });

        doc.setFontSize(14);
        doc.text(
          `Rp. ${payment.amount.toLocaleString("id-ID")}`,
          marginX + tableWidth,
          80,
          {
            align: "right",
          }
        );

        // Table of items
        autoTable(doc, {
          startY: 90,
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
            [
              "3000 - druk",
              "Cetak SM52 60 s/d 260gsm - KOP SURAT BTN SYARIAH (HVS 44*33)",
              "0.0%",
              "105,00",
              "315.000,00",
            ],
            [
              "1 - lbr",
              "Custom Potong - POTONG CETAKAN BAGI 2",
              "0.0%",
              "15.000,00",
              "15.000,00",
            ],
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
            "Bank Name: BCA",
            "Bank Branch: Astana Anyar",
            "Account Name: Felix Yohanes Wijaya",
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
