"use client";

import { useState } from "react";
import HeaderIntro from "@/components/common/header-intro";
import Container from "@/components/common/page-containter";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./table/data-table";
import CreateDialog from "./dialog/create-dialog";
import { userAgent } from "next/server";
import { columns } from "./table/columns";

interface HandOverReportPageProps {
  data: any[];
  breadcrumb: { title: string; url: string }[];
}

export default function HandOverReportPage({
  data,
  breadcrumb,
}: HandOverReportPageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeaderIntro title="List Berita Acara" breadcrumbs={breadcrumb} />

      <Container container="fluid">
        <Card>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </Container>

      <CreateDialog open={open} setOpen={setOpen} />
    </>
  );
}
