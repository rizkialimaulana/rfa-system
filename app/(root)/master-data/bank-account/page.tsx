import BankAccountPage from "./components/bank-account-page";

const breadcrumb = [
  { title: "Dashboard", url: "/" },
  { title: "Master Data", url: "/master-data/bank-account" },
  { title: "Akun Bank", url: "/master-data/bank-account" },
];

async function getData(): Promise<any[]> {
  return [
    {
      id: "728ed52f",
      name: "Rien Sulami",
      bank_name: "Bank BTN",
      account_number: "1234567890",
      bank_branch: "Sukabumi",
    },
  ];
}

export default async function Invoice() {
  const data = await getData();

  return <BankAccountPage data={data} breadcrumb={breadcrumb} />;
}
