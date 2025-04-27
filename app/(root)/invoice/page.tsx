import { INVOICE_LIST_API_URL } from "@/constant";
import InvoicePage from "./components/invoice-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Invoice", url: "/invoice" },
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
  let data = [];
  try {
    data = await getData();
  } catch (error) {
    console.error("Error fetching invoice data:", error);
  }

  console.log(data);

  return <InvoicePage data={data} breadcrumb={breadcrumb} />;
}
