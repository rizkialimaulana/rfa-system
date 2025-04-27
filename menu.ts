import { Home, NotebookText, Settings, Database } from "lucide-react";

export const dummyMenu = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Invoice",
    url: "/invoice",
    icon: NotebookText,
    has_page: false,
    sub_menu: [
      {
        title: "List Invoice",
        url: "/invoice",
      },
      {
        title: "Berita Acara",
        url: "/invoice/hand-over-report",
      },
      {
        title: "Kwitansi",
        url: "/invoice/receipt",
      },
    ],
  },
  {
    title: "Master Data",
    url: "/master-data",
    icon: Database,
    has_page: false,
    sub_menu: [
      {
        title: "Akun Bank",
        url: "/master-data/bank-account",
      },
      {
        title: "Cabang",
        url: "/master-data/branch",
      },
    ],
  },
  {
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
];
