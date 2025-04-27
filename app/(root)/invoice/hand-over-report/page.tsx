import HandOverReportPage from "./components/hand-over-report-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Invoice", url: "/invoice" },
  { title: "Berita Acara", url: "/invoice/hand-over-report" },
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

  return <HandOverReportPage data={data} breadcrumb={breadcrumb} />;
}
