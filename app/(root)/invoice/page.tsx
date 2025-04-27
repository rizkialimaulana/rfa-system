import InvoicePage from "./components/invoice-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Invoice", url: "/invoice" },
];

async function getData(): Promise<any[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: "27 April 2025",
      name: "Bank BTN KC. Sukabumi",
    },
  ];
}

export default async function Invoice() {
  const data = await getData();

  return <InvoicePage data={data} breadcrumb={breadcrumb} />;
}
