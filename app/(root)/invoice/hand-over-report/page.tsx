import { INVOICE_LIST_API_URL } from "@/constant";
import HandOverReportPage from "./components/hand-over-report-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Invoice", url: "/invoice" },
  { title: "Berita Acara", url: "/invoice/hand-over-report" },
];

async function getData(): Promise<any[]> {
  const response = await fetch(INVOICE_LIST_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  const data = await response.json();
  return data;
}

export default async function Invoice() {
  const data = await getData();

  return <HandOverReportPage data={data} breadcrumb={breadcrumb} />;
}
