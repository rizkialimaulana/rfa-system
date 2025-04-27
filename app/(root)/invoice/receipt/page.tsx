import { INVOICE_LIST_API_URL } from "@/constant";
import ReceiptPage from "./components/receipt-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Invoice", url: "/invoice" },
  { title: "Kwitansi", url: "/invoice/receipt" },
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

  return <ReceiptPage data={data} breadcrumb={breadcrumb} />;
}
