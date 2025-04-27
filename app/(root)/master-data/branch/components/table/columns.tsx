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
  bank: string;
  branch: string;
  address: string;
  phone_number: number;
  npwp: string;
  idtku: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "bank",
    header: "Bank",
  },
  {
    accessorKey: "branch",
    header: "Cabang Bank",
  },
  {
    accessorKey: "address",
    header: "Alamat",
  },
  {
    accessorKey: "phone_number",
    header: "Nomor Telepon",
  },
  {
    accessorKey: "npwp",
    header: "NPWP",
  },
  {
    accessorKey: "idtku",
    header: "IDTKU",
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
