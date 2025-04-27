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
    accessorKey: "amount",
    header: "Jumlah",
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
            <DropdownMenuItem>View Detail</DropdownMenuItem>
            <DropdownMenuItem>Download Kwitansi</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
