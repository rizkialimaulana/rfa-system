import { Home, NotebookText, Settings } from "lucide-react";

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
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
];
