"use client";

import { useState } from "react";
import HeaderIntro from "@/components/common/header-intro";
import Container from "@/components/common/page-containter";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./table/data-table";
import CreateDialog from "./dialog/create-dialog";
import { columns } from "./table/columns";
import { useRouter } from "next/navigation";

interface InvoicePageProps {
  data: any[];
  breadcrumb: { title: string; url: string }[];
}

export default function InvoicePage({ data, breadcrumb }: InvoicePageProps) {
  // const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <HeaderIntro
        title="List Invoice"
        breadcrumbs={breadcrumb}
        create={{
          title: "Buat Invoice",
          onClick: () => router.push("/invoice/create"),
        }}
      />

      <Container container="fluid">
        <Card>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </Container>

      {/* <CreateDialog open={open} setOpen={setOpen} /> */}
    </>
  );
}
