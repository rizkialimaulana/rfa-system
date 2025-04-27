"use client";

import { useState } from "react";
import HeaderIntro from "@/components/common/header-intro";
import Container from "@/components/common/page-containter";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./table/data-table";
import CreateDialog from "./dialog/create-dialog";
import { columns } from "./table/columns";

interface ReceiptPageProps {
  data: any[];
  breadcrumb: { title: string; url: string }[];
}

export default function ReceiptPage({ data, breadcrumb }: ReceiptPageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeaderIntro title="List Kwitansi" breadcrumbs={breadcrumb} />

      <Container container="fluid">
        <Card>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
