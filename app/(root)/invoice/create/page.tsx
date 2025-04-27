import CreateInvoice from "./components/create-invoice-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Invoice", url: "/invoice" },
  { title: "Buat Invoice", url: "/invoice/create" },
];

export default async function Invoice() {
  return <CreateInvoice breadcrumb={breadcrumb} />;
}
