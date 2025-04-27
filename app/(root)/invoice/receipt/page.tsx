import ReceiptPage from "./components/receipt-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Invoice", url: "/invoice" },
  { title: "Kwitansi", url: "/invoice/receipt" },
];

async function getData(): Promise<any[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: "m@example.com",
      name: "Bank BTN KC. Sukabumi",
    },
  ];
}

export default async function Invoice() {
  const data = await getData();

  return <ReceiptPage data={data} breadcrumb={breadcrumb} />;
}
