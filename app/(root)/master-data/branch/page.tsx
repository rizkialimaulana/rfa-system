import BankAccountPage from "./components/branch-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Master Data", url: "/master-data/branch" },
  { title: "Cabang", url: "/master-data/branch" },
];

async function getData(): Promise<any[]> {
  return [
    {
      id: "728ed52f",
      bank: "BTN",
      branch: "Cabang Bandung",
      address: "Jl. Jawa",
      phone_number: 81214840237,
      npwp: "1234567890",
      idtku: "1234567890",
    },
  ];
}

export default async function Invoice() {
  const data = await getData();

  return <BankAccountPage data={data} breadcrumb={breadcrumb} />;
}
